export interface Boy {
  id: number;
  name: string;
  phoneNumber: string;
  location: string;
  sport: string | null;
  food: string | null;
  clothing: string;
}

export type ClueCategory = 'location' | 'sport' | 'food' | 'clothing';

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
  boy?: Boy;
  clue?: Clue;
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
