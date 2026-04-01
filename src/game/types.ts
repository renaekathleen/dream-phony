export interface Pronouns {
  subject: string;       // they / he / she
  object: string;        // them / him / her
  possessive: string;    // their / his / her
  contraction: string;   // they're / he's / she's
  dontDoesnt: string;    // they don't / he doesn't / she doesn't
  thirdPerson: boolean;  // false for they (plural verb), true for he/she (adds -s)
}

export interface Admirer {
  id: number;
  name: string;
  phoneNumber: string;
  location: string;
  activity: string | null;
  food: string | null;
  clothing: string;
}

export type ClueCategory = 'location' | 'activity' | 'food' | 'clothing';

export interface Clue {
  category: ClueCategory;
  value: string;
  loudMessage: string;
  quietMessage: string;
}

export type CallResultType =
  | 'clue'
  | 'no_clue'
  | 'wrong_number'
  | 'correct_guess'
  | 'wrong_guess'
  | 'no_game';

export interface CallResult {
  type: CallResultType;
  admirer?: Admirer;
  clue?: Clue;
}

export interface FriendCall {
  eliminatedName: string;
}

export interface GameState {
  gameActive: boolean;
  guessMode: boolean;
  speakerphone: boolean;
  showText: boolean;
  dialedDigits: string;
  lastCall: CallResult | null;
  displayLines: string[];
  isCalling: boolean;
}
