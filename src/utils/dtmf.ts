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

const DURATION = 0.15;
const SAMPLE_RATE = 8000;
const AMPLITUDE = 0.25;
const playerCache = new Map<string, AudioPlayer>();
let initialized = false;

function writeString(view: DataView, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

function generateWavBytes(freq1: number, freq2: number): Uint8Array {
  const numSamples = Math.floor(SAMPLE_RATE * DURATION);
  const dataSize = numSamples * 2;
  const fileSize = 44 + dataSize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, fileSize - 8, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, SAMPLE_RATE, true);
  view.setUint32(28, SAMPLE_RATE * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const sample =
      Math.sin(2 * Math.PI * freq1 * t) +
      Math.sin(2 * Math.PI * freq2 * t);
    view.setInt16(44 + i * 2, Math.floor(sample * AMPLITUDE * 32767), true);
  }

  return new Uint8Array(buffer);
}

function safeFileName(digit: string): string {
  if (digit === '*') return 'star';
  if (digit === '#') return 'hash';
  return digit;
}

export async function initDTMF(): Promise<void> {
  if (initialized) return;

  for (const [digit, [f1, f2]] of Object.entries(DTMF_FREQS)) {
    try {
      const bytes = generateWavBytes(f1, f2);
      const file = new File(Paths.cache, `dtmf_${safeFileName(digit)}.wav`);
      file.write(bytes);

      const player = createAudioPlayer({ uri: file.uri });
      playerCache.set(digit, player);
    } catch {
      // skip this tone
    }
  }

  initialized = true;
}

export function playTone(digit: string): void {
  const player = playerCache.get(digit);
  if (!player) return;
  player.seekTo(0).then(() => player.play()).catch(() => {});
}
