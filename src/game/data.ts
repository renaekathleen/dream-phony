import { Admirer, Pronouns } from './types';

export const PRONOUNS: Pronouns = {
  subject: 'they',
  object: 'them',
  possessive: 'their',
  contraction: "they're",
  dontDoesnt: "they don't",
  thirdPerson: false,
};

export const ALL_LOCATIONS = [
  'Send Noods',
  'The Sunny Side',
  'The Broken Spoke',
  'Fern Creek Trail',
  "The Comrade's Table",
  'The Back Room',
] as const;

export const ALL_ACTIVITIES = [
  'birding',
  'camping',
  'sewing',
  'direct action',
  'karaoke',
  'tabletop RPGs',
] as const;

export const ALL_FOODS = [
  'ramen',
  'phở',
  'tofu scramble',
  'bloody marys',
  'tacos',
  'sour beers',
] as const;

export const ALL_CLOTHING = [
  'boots',
  'a hoodie',
  'a denim jacket',
  'glasses',
  'a beanie',
  'a flannel',
] as const;

const L = ALL_LOCATIONS;
const A = ALL_ACTIVITIES;
const F = ALL_FOODS;
const C = ALL_CLOTHING;

export const ADMIRERS: Admirer[] = [
  // --- Send Noods (food characters) ---
  { id: 0, name: 'Riley', phoneNumber: '5551234', location: L[0], activity: null, food: F[0], clothing: C[0] },
  { id: 1, name: 'Jordan', phoneNumber: '5552345', location: L[0], activity: null, food: F[0], clothing: C[1] },
  { id: 2, name: 'Fox', phoneNumber: '5553456', location: L[0], activity: null, food: F[1], clothing: C[2] },
  { id: 3, name: 'Kai', phoneNumber: '5554567', location: L[0], activity: null, food: F[1], clothing: C[3] },
  // --- The Sunny Side (food characters) ---
  { id: 4, name: 'Jules', phoneNumber: '5555678', location: L[1], activity: null, food: F[2], clothing: C[4] },
  { id: 5, name: 'Rowan', phoneNumber: '5556789', location: L[1], activity: null, food: F[2], clothing: C[5] },
  { id: 6, name: 'Avery', phoneNumber: '5557891', location: L[1], activity: null, food: F[3], clothing: C[0] },
  { id: 7, name: 'Nova', phoneNumber: '5558912', location: L[1], activity: null, food: F[3], clothing: C[4] },
  // --- The Broken Spoke (food characters) ---
  { id: 8, name: 'Ellis', phoneNumber: '5559123', location: L[2], activity: null, food: F[4], clothing: C[1] },
  { id: 9, name: 'Finn', phoneNumber: '5551357', location: L[2], activity: null, food: F[4], clothing: C[2] },
  { id: 10, name: 'Luna', phoneNumber: '5552468', location: L[2], activity: null, food: F[5], clothing: C[5] },
  { id: 11, name: 'Milo', phoneNumber: '5553579', location: L[2], activity: null, food: F[5], clothing: C[3] },
  // --- Fern Creek Trail (activity characters) ---
  { id: 12, name: 'Harper', phoneNumber: '5554681', location: L[3], activity: A[0], food: null, clothing: C[3] },
  { id: 13, name: 'Ezra', phoneNumber: '5555792', location: L[3], activity: A[0], food: null, clothing: C[5] },
  { id: 14, name: 'Wren', phoneNumber: '5556813', location: L[3], activity: A[1], food: null, clothing: C[1] },
  { id: 15, name: 'Soren', phoneNumber: '5557924', location: L[3], activity: A[1], food: null, clothing: C[4] },
  // --- The Comrade's Table (activity characters) ---
  { id: 16, name: 'Aria', phoneNumber: '5558135', location: L[4], activity: A[2], food: null, clothing: C[2] },
  { id: 17, name: 'Jade', phoneNumber: '5559246', location: L[4], activity: A[2], food: null, clothing: C[0] },
  { id: 18, name: 'Nico', phoneNumber: '5551478', location: L[4], activity: A[3], food: null, clothing: C[0] },
  { id: 19, name: 'Ivy', phoneNumber: '5552589', location: L[4], activity: A[3], food: null, clothing: C[1] },
  // --- The Back Room (activity characters) ---
  { id: 20, name: 'River', phoneNumber: '5553691', location: L[5], activity: A[4], food: null, clothing: C[4] },
  { id: 21, name: 'Skyler', phoneNumber: '5554712', location: L[5], activity: A[4], food: null, clothing: C[5] },
  { id: 22, name: 'Ash', phoneNumber: '5555823', location: L[5], activity: A[5], food: null, clothing: C[2] },
  { id: 23, name: 'Zara', phoneNumber: '5556934', location: L[5], activity: A[5], food: null, clothing: C[3] },
];

export function formatPhoneNumber(digits: string): string {
  if (digits.length <= 3) return digits;
  return digits.slice(0, 3) + '-' + digits.slice(3);
}

export function findAdmirerByPhone(phoneNumber: string): Admirer | undefined {
  return ADMIRERS.find((a) => a.phoneNumber === phoneNumber);
}
