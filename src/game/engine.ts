import { Admirer, Clue, ClueCategory, CallResult, FriendCall } from './types';
import {
  ADMIRERS,
  ALL_LOCATIONS,
  ALL_ACTIVITIES,
  ALL_FOODS,
  ALL_CLOTHING,
  PRONOUNS,
  findAdmirerByPhone,
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

function verb(base: string): string {
  if (!PRONOUNS.thirdPerson) return base;
  if (base.endsWith('s') || base.endsWith('sh') || base.endsWith('ch') || base.endsWith('x') || base.endsWith('z'))
    return base + 'es';
  return base + 's';
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildCluePool(crush: Admirer): Clue[] {
  const pool: Clue[] = [];
  const p = PRONOUNS;

  const locationLoud = `I know where ${p.subject} ${verb('hang')} out!`;
  const locationQuiet = `${cap(p.contraction)} not at`;
  const activityLoud = `I know what ${p.subject} ${verb('like')} to do!`;
  const activityQuiet = `${cap(p.contraction)} not into`;
  const foodLoud = `${cap(p.subject)} ${verb('love')} to eat!`;
  const foodQuiet = `${cap(p.dontDoesnt)} like`;
  const clothingLoud = `${cap(p.subject)} always ${verb('look')} amazing!`;
  const clothingQuiet = `${cap(p.dontDoesnt)} wear`;

  for (const loc of ALL_LOCATIONS) {
    if (loc !== crush.location) {
      pool.push(buildNegativeClue('location', loc, locationLoud, locationQuiet));
    }
  }

  if (crush.activity !== null) {
    for (const activity of ALL_ACTIVITIES) {
      if (activity !== crush.activity) {
        pool.push(buildNegativeClue('activity', activity, activityLoud, activityQuiet));
      }
    }
    for (const food of ALL_FOODS) {
      pool.push(buildNegativeClue('food', food, foodLoud, foodQuiet));
    }
  } else {
    for (const activity of ALL_ACTIVITIES) {
      pool.push(buildNegativeClue('activity', activity, activityLoud, activityQuiet));
    }
    for (const food of ALL_FOODS) {
      if (food !== crush.food) {
        pool.push(buildNegativeClue('food', food, foodLoud, foodQuiet));
      }
    }
  }

  for (const cloth of ALL_CLOTHING) {
    if (cloth !== crush.clothing) {
      pool.push(buildNegativeClue('clothing', cloth, clothingLoud, clothingQuiet));
    }
  }

  return pool;
}

const FRIEND_CALL_SCHEDULE = [4, 10, 18, 28];

export class DreamPhonyEngine {
  private crush: Admirer | null = null;
  private clueMap = new Map<string, Clue | null>();
  private calledAdmirers = new Set<string>();
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

  newGame(): Admirer {
    const crushIndex = Math.floor(Math.random() * ADMIRERS.length);
    this.crush = ADMIRERS[crushIndex];

    const cluePool = shuffleArray(buildCluePool(this.crush));
    const others = shuffleArray(
      ADMIRERS.filter((a) => a.id !== this.crush!.id)
    );

    this.clueMap.clear();
    this.calledAdmirers.clear();
    this._lastCall = null;
    this.turnCount = 0;
    this.nextFriendCallIndex = 0;
    this.friendCallQueue = shuffleArray(
      others.map((a) => a.name)
    );

    for (let i = 0; i < others.length; i++) {
      this.clueMap.set(
        others[i].phoneNumber,
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

    const admirer = findAdmirerByPhone(phoneNumber);
    if (!admirer) {
      return { type: 'wrong_number' };
    }

    const clue = this.clueMap.get(phoneNumber) ?? null;
    const firstCall = !this.calledAdmirers.has(phoneNumber);
    this.calledAdmirers.add(phoneNumber);

    const result: CallResult = clue
      ? { type: 'clue', admirer, clue }
      : { type: 'no_clue', admirer };

    this._lastCall = result;

    return result;
  }

  isFirstCall(phoneNumber: string): boolean {
    return !this.calledAdmirers.has(phoneNumber);
  }

  guess(phoneNumber: string): CallResult {
    if (!this.crush) {
      return { type: 'no_game' };
    }

    const admirer = findAdmirerByPhone(phoneNumber);
    if (!admirer) {
      return { type: 'wrong_number' };
    }

    return admirer.id === this.crush.id
      ? { type: 'correct_guess', admirer }
      : { type: 'wrong_guess', admirer };
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

  getCrush(): Admirer | null {
    return this.crush;
  }
}
