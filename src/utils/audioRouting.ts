import { setAudioModeAsync } from 'expo-audio';

let speakerOn = false;

export function initAudioRouting(): void {
  // no-op — expo-audio handles routing via setAudioModeAsync per-call
}

export async function setSpeakerphone(on: boolean): Promise<void> {
  speakerOn = on;
  try {
    await setAudioModeAsync({
      shouldRouteThroughEarpiece: !on,
    });
  } catch {
    // ignore if audio mode can't be set
  }
}

export function isSpeakerphone(): boolean {
  return speakerOn;
}

export function stopAudioRouting(): void {
  // no-op
}
