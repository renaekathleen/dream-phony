import { Boy, Clue, ClueCategory, CallResult, FriendCall } from './types';
import {
  BOYS,
  ALL_LOCATIONS,
  ALL_SPORTS,
  ALL_FOODS,
  ALL_CLOTHING,
  findBoyByPhone,
} from './data';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function buildNegativeClue(
  category: ClueCategory,
  value: string,
  loudMessage: string,
  quietPrefix: string
): Clue {
  return {
    category,
    value,
    loudMessage,
    quietMessage: `${quietPrefix} ${value}.`,
  };
}

function buildCluePool(crush: Boy): Clue[] {
  const pool: Clue[] = [];

  for (const loc of ALL_LOCATIONS) {
    if (loc !== crush.location) {
      pool.push(
        buildNegativeClue(
          'location',
          loc,
          'I know where they hang out!',
          "They're not at"
        )
      );
    }
  }

  if (crush.sport !== null) {
    for (const sport of ALL_SPORTS) {
      if (sport !== crush.sport) {
        pool.push(
          buildNegativeClue(
            'sport',
            sport,
            'I know what they like to do!',
            "They're not into"
          )
        );
      }
    }
    for (const food of ALL_FOODS) {
      pool.push(
        buildNegativeClue(
          'food',
          food,
          'They love to eat!',
          "They don't like"
        )
      );
    }
  } else {
    for (const sport of ALL_SPORTS) {
      pool.push(
        buildNegativeClue(
          'sport',
          sport,
          'I know what they like to do!',
          "They're not into"
        )
      );
    }
    for (const food of ALL_FOODS) {
      if (food !== crush.food) {
        pool.push(
          buildNegativeClue(
            'food',
            food,
            'They love to eat!',
            "They don't like"
          )
        );
      }
    }
  }

  for (const cloth of ALL_CLOTHING) {
    if (cloth !== crush.clothing) {
      pool.push(
        buildNegativeClue(
          'clothing',
          cloth,
          'They always look amazing!',
          "They don't wear"
        )
      );
    }
  }

  return pool;
}

const FRIEND_CALL_SCHEDULE = [4, 10, 18, 28];

export class DreamPhoneEngine {
  private crush: Boy | null = null;
  private clueMap = new Map<string, Clue | null>();
  private calledBoys = new Set<string>();
  private _lastCall: CallResult | null = null;
  private turnCount = 0;
  private friendCallQueue: string[] = [];
  private nextFriendCallIndex = 0;

  get gameActive(): boolean {
    return this.crush !== null;
  }

  get lastCall(): CallResult | null {
    return this._lastCall;
  }

  newGame(): Boy {
    const crushIndex = Math.floor(Math.random() * BOYS.length);
    this.crush = BOYS[crushIndex];

    const cluePool = shuffleArray(buildCluePool(this.crush));
    const nonCrushBoys = shuffleArray(
      BOYS.filter((b) => b.id !== this.crush!.id)
    );

    this.clueMap.clear();
    this.calledBoys.clear();
    this._lastCall = null;
    this.turnCount = 0;
    this.nextFriendCallIndex = 0;
    this.friendCallQueue = shuffleArray(
      nonCrushBoys.map((b) => b.name)
    );

    for (let i = 0; i < nonCrushBoys.length; i++) {
      this.clueMap.set(
        nonCrushBoys[i].phoneNumber,
        i < cluePool.length ? cluePool[i] : null
      );
    }

    this.clueMap.set(this.crush.phoneNumber, null);

    return this.crush;
  }

  dial(phoneNumber: string): CallResult {
    if (!this.crush) {
      return { type: 'no_game' };
    }

    const boy = findBoyByPhone(phoneNumber);
    if (!boy) {
      return { type: 'wrong_number' };
    }

    const clue = this.clueMap.get(phoneNumber) ?? null;
    const firstCall = !this.calledBoys.has(phoneNumber);
    this.calledBoys.add(phoneNumber);

    const result: CallResult = clue
      ? { type: 'clue', boy, clue }
      : { type: 'no_clue', boy };

    if (firstCall) {
      this._lastCall = result;
    } else {
      this._lastCall = result;
    }

    return result;
  }

  isFirstCall(phoneNumber: string): boolean {
    return !this.calledBoys.has(phoneNumber);
  }

  guess(phoneNumber: string): CallResult {
    if (!this.crush) {
      return { type: 'no_game' };
    }

    const boy = findBoyByPhone(phoneNumber);
    if (!boy) {
      return { type: 'wrong_number' };
    }

    return boy.id === this.crush.id
      ? { type: 'correct_guess', boy }
      : { type: 'wrong_guess', boy };
  }

  recordTurn(): void {
    this.turnCount++;
  }

  checkFriendCall(): FriendCall | null {
    if (this.nextFriendCallIndex >= FRIEND_CALL_SCHEDULE.length) return null;
    if (this.turnCount < FRIEND_CALL_SCHEDULE[this.nextFriendCallIndex]) return null;
    if (this.nextFriendCallIndex >= this.friendCallQueue.length) return null;

    const name = this.friendCallQueue[this.nextFriendCallIndex];
    this.nextFriendCallIndex++;
    return { eliminatedName: name };
  }

  redial(): CallResult | null {
    return this._lastCall;
  }

  getCrush(): Boy | null {
    return this.crush;
  }
}
