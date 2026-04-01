import { createAudioPlayer, AudioPlayer } from 'expo-audio';
import { File, Paths } from 'expo-file-system/next';

const DTMF_FREQS: Record<string, [number, number]> = {
  '1': [697, 1209],
  '2': [697, 1336],
  '3': [697, 1477],
  '4': [770, 1209],
  '5': [770, 1336],
  '6': [770, 1477],
  '7': [852, 1209],
  '8': [852, 1336],
  '9': [852, 1477],
  '*': [941, 1209],
  '0': [941, 1336],
  '#': [941, 1477],
};

const SAMPLE_RATE = 16000;

interface CachedSound {
  player: AudioPlayer;
  uri: string;
}

const playerCache = new Map<string, CachedSound>();
let outgoingRing: CachedSound | null = null;
let incomingRing: CachedSound | null = null;
let initialized = false;

function writeWavHeader(view: DataView, numSamples: number): void {
  const dataSize = numSamples * 2;
  const fileSize = 44 + dataSize;

  const hdr = 'RIFF';
  for (let i = 0; i < 4; i++) view.setUint8(i, hdr.charCodeAt(i));
  view.setUint32(4, fileSize - 8, true);
  const wav = 'WAVE';
  for (let i = 0; i < 4; i++) view.setUint8(8 + i, wav.charCodeAt(i));
  const fmt = 'fmt ';
  for (let i = 0; i < 4; i++) view.setUint8(12 + i, fmt.charCodeAt(i));
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, SAMPLE_RATE, true);
  view.setUint32(28, SAMPLE_RATE * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  const data = 'data';
  for (let i = 0; i < 4; i++) view.setUint8(36 + i, data.charCodeAt(i));
  view.setUint32(40, dataSize, true);
}

function generateWav(
  durationSec: number,
  sampleFn: (t: number) => number
): Uint8Array {
  const numSamples = Math.floor(SAMPLE_RATE * durationSec);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  writeWavHeader(view, numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const sample = Math.max(-1, Math.min(1, sampleFn(t)));
    view.setInt16(44 + i * 2, Math.floor(sample * 32767), true);
  }

  return new Uint8Array(buffer);
}

function dtmfSample(f1: number, f2: number): (t: number) => number {
  return (t) => 0.25 * (Math.sin(2 * Math.PI * f1 * t) + Math.sin(2 * Math.PI * f2 * t));
}

/**
 * US ringback tone: 440 + 480 Hz
 * Pattern: 2s on, 3s off, 2s on (total ~7s)
 */
function outgoingRingSample(t: number): number {
  const cycle = t % 5;
  if (cycle > 2) return 0;
  const amp = 0.2;
  const fadeIn = Math.min(cycle / 0.02, 1);
  const fadeOut = Math.min((2 - cycle) / 0.02, 1);
  const envelope = fadeIn * fadeOut;
  return amp * envelope * (
    Math.sin(2 * Math.PI * 440 * t) +
    Math.sin(2 * Math.PI * 480 * t)
  );
}

/**
 * Classic incoming phone ring: ~1000 Hz + ~1400 Hz modulated by 20 Hz
 * Pattern: 0.4s ring, 0.2s silence, 0.4s ring, 1.5s silence (repeats)
 */
function incomingRingSample(t: number): number {
  const cycle = t % 2.5;
  const isRinging = cycle < 0.4 || (cycle >= 0.6 && cycle < 1.0);
  if (!isRinging) return 0;
  const amp = 0.3;
  const modulator = 0.5 + 0.5 * Math.sin(2 * Math.PI * 20 * t);
  return amp * modulator * (
    Math.sin(2 * Math.PI * 1000 * t) +
    0.7 * Math.sin(2 * Math.PI * 1400 * t)
  );
}

function safeFileName(digit: string): string {
  if (digit === '*') return 'star';
  if (digit === '#') return 'hash';
  return digit;
}

function createCachedSound(name: string, bytes: Uint8Array): CachedSound | null {
  try {
    const file = new File(Paths.cache, `${name}.wav`);
    file.write(bytes);
    const uri = file.uri;
    return { player: createAudioPlayer({ uri }), uri };
  } catch {
    return null;
  }
}

export async function initDTMF(): Promise<void> {
  if (initialized) return;

  for (const [digit, [f1, f2]] of Object.entries(DTMF_FREQS)) {
    const bytes = generateWav(0.15, dtmfSample(f1, f2));
    const sound = createCachedSound(`dtmf_${safeFileName(digit)}`, bytes);
    if (sound) playerCache.set(digit, sound);
  }

  outgoingRing = createCachedSound(
    'ring_outgoing',
    generateWav(7, outgoingRingSample)
  );

  incomingRing = createCachedSound(
    'ring_incoming',
    generateWav(5, incomingRingSample)
  );

  initialized = true;
}

export function playTone(digit: string): void {
  const sound = playerCache.get(digit);
  if (!sound) return;
  try {
    sound.player.play();
  } catch {}
  setTimeout(() => {
    sound.player.seekTo(0).catch(() => {});
  }, 180);
}

function playRing(sound: CachedSound | null): void {
  if (!sound) return;
  try {
    sound.player.seekTo(0).then(() => sound.player.play()).catch(() => {});
  } catch {}
}

function stopRing(sound: CachedSound | null): void {
  if (!sound) return;
  try { sound.player.pause(); } catch {}
}

export function playOutgoingRing(): void {
  playRing(outgoingRing);
}

export function stopOutgoingRing(): void {
  stopRing(outgoingRing);
}

export function playIncomingRing(): void {
  playRing(incomingRing);
}

export function stopIncomingRing(): void {
  stopRing(incomingRing);
}
