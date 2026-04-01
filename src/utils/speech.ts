import * as Speech from 'expo-speech';

const VOICE_RATE = 0.95;
const VOICE_PITCH = 1.05;

export function speak(text: string): Promise<void> {
  return new Promise((resolve) => {
    try {
      Speech.speak(text, {
        rate: VOICE_RATE,
        pitch: VOICE_PITCH,
        onDone: resolve,
        onError: () => resolve(),
        onStopped: () => resolve(),
      });
    } catch {
      resolve();
    }
  });
}

export function stopSpeaking(): void {
  try {
    Speech.stop();
  } catch {
    // ignore
  }
}

export async function speakSequence(lines: string[], delayMs = 400): Promise<void> {
  for (const line of lines) {
    await speak(line);
    await new Promise((r) => setTimeout(r, delayMs));
  }
}

export async function speakClue(
  loudPart: string,
  quietPart: string,
  _isSpeakerphone: boolean
): Promise<void> {
  await speak(loudPart);
  await new Promise((r) => setTimeout(r, 300));
  await speak(quietPart);
}
