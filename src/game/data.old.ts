import { Boy } from './types';

export const BOYS: Boy[] = [
  { id: 0,  name: 'Dave',    phoneNumber: '5551111', location: 'Crosstown Mall',      sport: null,            food: 'Cookies',   clothing: 'Blue Jeans' },
  { id: 1,  name: 'George',  phoneNumber: '5551233', location: 'Crosstown Mall',      sport: null,            food: 'Ice Cream',  clothing: 'Tie' },
  { id: 2,  name: 'Dale',    phoneNumber: '5554566', location: 'Crosstown Mall',      sport: null,            food: 'Ice Cream',  clothing: 'Jacket' },
  { id: 3,  name: 'Alan',    phoneNumber: '5557899', location: 'Crosstown Mall',      sport: null,            food: 'Cookies',   clothing: 'Tie' },
  { id: 4,  name: 'James',   phoneNumber: '5552588', location: 'E.A.T.S. Snack Shop', sport: null,            food: 'Hot Dogs',  clothing: 'Jacket' },
  { id: 5,  name: 'Phil',    phoneNumber: '5553333', location: 'E.A.T.S. Snack Shop', sport: null,            food: 'Pizza',     clothing: 'Glasses' },
  { id: 6,  name: 'Bruce',   phoneNumber: '5553699', location: 'E.A.T.S. Snack Shop', sport: null,            food: 'Pizza',     clothing: 'Tie' },
  { id: 7,  name: 'Tyler',   phoneNumber: '5551477', location: 'E.A.T.S. Snack Shop', sport: null,            food: 'Hot Dogs',  clothing: 'Blue Jeans' },
  { id: 8,  name: 'Jamal',   phoneNumber: '5559877', location: 'Reel Movies',         sport: null,            food: 'Candy',     clothing: 'Tie' },
  { id: 9,  name: 'Gary',    phoneNumber: '5553211', location: 'Reel Movies',         sport: null,            food: 'Popcorn',   clothing: 'Blue Jeans' },
  { id: 10, name: 'Dan',     phoneNumber: '5557777', location: 'Reel Movies',         sport: null,            food: 'Candy',     clothing: 'Blue Jeans' },
  { id: 11, name: 'Spencer', phoneNumber: '5556544', location: 'Reel Movies',         sport: null,            food: 'Popcorn',   clothing: 'Jacket' },
  { id: 12, name: 'Mark',    phoneNumber: '5558522', location: 'Woodland Park',       sport: 'Baseball',      food: null,        clothing: 'Hat' },
  { id: 13, name: 'Jason',   phoneNumber: '5557411', location: 'Woodland Park',       sport: 'Baseball',      food: null,        clothing: 'Glasses' },
  { id: 14, name: 'Steve',   phoneNumber: '5559999', location: 'Woodland Park',       sport: 'Skateboarding', food: null,        clothing: 'Jacket' },
  { id: 15, name: 'John',    phoneNumber: '5559633', location: 'Woodland Park',       sport: 'Skateboarding', food: null,        clothing: 'Anything Yellow' },
  { id: 16, name: 'Paul',    phoneNumber: '5555515', location: 'High Tide Beach',     sport: 'Volleyball',    food: null,        clothing: 'Anything Yellow' },
  { id: 17, name: 'Tony',    phoneNumber: '5552442', location: 'High Tide Beach',     sport: 'Volleyball',    food: null,        clothing: 'Hat' },
  { id: 18, name: 'Wayne',   phoneNumber: '5553535', location: 'High Tide Beach',     sport: 'Surfing',       food: null,        clothing: 'Anything Yellow' },
  { id: 19, name: 'Mike',    phoneNumber: '5552226', location: 'High Tide Beach',     sport: 'Surfing',       food: null,        clothing: 'Hat' },
  { id: 20, name: 'Scott',   phoneNumber: '5555599', location: "Jim's Gym",           sport: 'Basketball',    food: null,        clothing: 'Anything Yellow' },
  { id: 21, name: 'Bob',     phoneNumber: '5554884', location: "Jim's Gym",           sport: 'Basketball',    food: null,        clothing: 'Glasses' },
  { id: 22, name: 'Carlos',  phoneNumber: '5556668', location: "Jim's Gym",           sport: 'Tennis',        food: null,        clothing: 'Hat' },
  { id: 23, name: 'Matt',    phoneNumber: '5557557', location: "Jim's Gym",           sport: 'Tennis',        food: null,        clothing: 'Glasses' },
];

export const ALL_LOCATIONS = [
  'Crosstown Mall',
  'E.A.T.S. Snack Shop',
  'Reel Movies',
  'Woodland Park',
  'High Tide Beach',
  "Jim's Gym",
];

export const ALL_SPORTS = [
  'Baseball',
  'Skateboarding',
  'Volleyball',
  'Surfing',
  'Basketball',
  'Tennis',
];

export const ALL_FOODS = [
  'Cookies',
  'Ice Cream',
  'Hot Dogs',
  'Pizza',
  'Candy',
  'Popcorn',
];

export const ALL_CLOTHING = [
  'Blue Jeans',
  'Tie',
  'Jacket',
  'Glasses',
  'Hat',
  'Anything Yellow',
];

export function formatPhoneNumber(digits: string): string {
  if (digits.length <= 3) return digits;
  return digits.slice(0, 3) + '-' + digits.slice(3);
}

export function findBoyByPhone(phoneNumber: string): Boy | undefined {
  return BOYS.find((b) => b.phoneNumber === phoneNumber);
}
