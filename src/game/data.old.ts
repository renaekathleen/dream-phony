import { Admirer, Pronouns } from './types';

export const PRONOUNS: Pronouns = {
  subject: 'he',
  object: 'him',
  possessive: 'his',
  contraction: "he's",
  dontDoesnt: "he doesn't",
  thirdPerson: true,
};

export const ALL_LOCATIONS = [
  'Crosstown Mall',
  'E.A.T.S. Snack Shop',
  'Reel Movies',
  'Woodland Park',
  'High Tide Beach',
  "Jim's Gym",
] as const;

export const ALL_ACTIVITIES = [
  'Baseball',
  'Skateboarding',
  'Volleyball',
  'Surfing',
  'Basketball',
  'Tennis',
] as const;

export const ALL_FOODS = [
  'Cookies',
  'Ice Cream',
  'Hot Dogs',
  'Pizza',
  'Candy',
  'Popcorn',
] as const;

export const ALL_CLOTHING = [
  'Blue Jeans',
  'Tie',
  'Jacket',
  'Glasses',
  'Hat',
  'Anything Yellow',
] as const;

const L = ALL_LOCATIONS;
const A = ALL_ACTIVITIES;
const F = ALL_FOODS;
const C = ALL_CLOTHING;

export const ADMIRERS: Admirer[] = [
  // --- Crosstown Mall (food characters) ---
  { id: 0,  name: 'Dave',    phoneNumber: '5551111', location: L[0], activity: null, food: F[0], clothing: C[0] },
  { id: 1,  name: 'George',  phoneNumber: '5551233', location: L[0], activity: null, food: F[1], clothing: C[1] },
  { id: 2,  name: 'Dale',    phoneNumber: '5554566', location: L[0], activity: null, food: F[1], clothing: C[2] },
  { id: 3,  name: 'Alan',    phoneNumber: '5557899', location: L[0], activity: null, food: F[0], clothing: C[1] },
  // --- E.A.T.S. Snack Shop (food characters) ---
  { id: 4,  name: 'James',   phoneNumber: '5552588', location: L[1], activity: null, food: F[2], clothing: C[2] },
  { id: 5,  name: 'Phil',    phoneNumber: '5553333', location: L[1], activity: null, food: F[3], clothing: C[3] },
  { id: 6,  name: 'Bruce',   phoneNumber: '5553699', location: L[1], activity: null, food: F[3], clothing: C[1] },
  { id: 7,  name: 'Tyler',   phoneNumber: '5551477', location: L[1], activity: null, food: F[2], clothing: C[0] },
  // --- Reel Movies (food characters) ---
  { id: 8,  name: 'Jamal',   phoneNumber: '5559877', location: L[2], activity: null, food: F[4], clothing: C[1] },
  { id: 9,  name: 'Gary',    phoneNumber: '5553211', location: L[2], activity: null, food: F[5], clothing: C[0] },
  { id: 10, name: 'Dan',     phoneNumber: '5557777', location: L[2], activity: null, food: F[4], clothing: C[0] },
  { id: 11, name: 'Spencer', phoneNumber: '5556544', location: L[2], activity: null, food: F[5], clothing: C[2] },
  // --- Woodland Park (activity characters) ---
  { id: 12, name: 'Mark',    phoneNumber: '5558522', location: L[3], activity: A[0], food: null, clothing: C[4] },
  { id: 13, name: 'Jason',   phoneNumber: '5557411', location: L[3], activity: A[0], food: null, clothing: C[3] },
  { id: 14, name: 'Steve',   phoneNumber: '5559999', location: L[3], activity: A[1], food: null, clothing: C[2] },
  { id: 15, name: 'John',    phoneNumber: '5559633', location: L[3], activity: A[1], food: null, clothing: C[5] },
  // --- High Tide Beach (activity characters) ---
  { id: 16, name: 'Paul',    phoneNumber: '5555515', location: L[4], activity: A[2], food: null, clothing: C[5] },
  { id: 17, name: 'Tony',    phoneNumber: '5552442', location: L[4], activity: A[2], food: null, clothing: C[4] },
  { id: 18, name: 'Wayne',   phoneNumber: '5553535', location: L[4], activity: A[3], food: null, clothing: C[5] },
  { id: 19, name: 'Mike',    phoneNumber: '5552226', location: L[4], activity: A[3], food: null, clothing: C[4] },
  // --- Jim's Gym (activity characters) ---
  { id: 20, name: 'Scott',   phoneNumber: '5555599', location: L[5], activity: A[4], food: null, clothing: C[5] },
  { id: 21, name: 'Bob',     phoneNumber: '5554884', location: L[5], activity: A[4], food: null, clothing: C[3] },
  { id: 22, name: 'Carlos',  phoneNumber: '5556668', location: L[5], activity: A[5], food: null, clothing: C[4] },
  { id: 23, name: 'Matt',    phoneNumber: '5557557', location: L[5], activity: A[5], food: null, clothing: C[3] },
];

export function formatPhoneNumber(digits: string): string {
  if (digits.length <= 3) return digits;
  return digits.slice(0, 3) + '-' + digits.slice(3);
}

export function findAdmirerByPhone(phoneNumber: string): Admirer | undefined {
  return ADMIRERS.find((a) => a.phoneNumber === phoneNumber);
}
