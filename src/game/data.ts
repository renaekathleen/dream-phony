import { Boy } from './types';

export const BOYS: Boy[] = [
  // --- Moonlight Café (food characters) ---
  { id: 0, name: 'Riley', phoneNumber: '5551234', location: 'Moonlight Café', sport: null, food: 'Boba Tea', clothing: 'Doc Martens' },
  { id: 1, name: 'Jordan', phoneNumber: '5552345', location: 'Moonlight Café', sport: null, food: 'Boba Tea', clothing: 'Hoodies' },
  { id: 2, name: 'Quinn', phoneNumber: '5553456', location: 'Moonlight Café', sport: null, food: 'Ramen', clothing: 'Denim Jackets' },
  { id: 3, name: 'Kai', phoneNumber: '5554567', location: 'Moonlight Café', sport: null, food: 'Ramen', clothing: 'Glasses' },
  // --- Pixel Arcade (food characters) ---
  { id: 4, name: 'Sage', phoneNumber: '5555678', location: 'Pixel Arcade', sport: null, food: 'Tacos', clothing: 'Beanies' },
  { id: 5, name: 'Rowan', phoneNumber: '5556789', location: 'Pixel Arcade', sport: null, food: 'Tacos', clothing: 'Flannel Shirts' },
  { id: 6, name: 'Avery', phoneNumber: '5557891', location: 'Pixel Arcade', sport: null, food: 'Matcha', clothing: 'Doc Martens' },
  { id: 7, name: 'Nova', phoneNumber: '5558912', location: 'Pixel Arcade', sport: null, food: 'Matcha', clothing: 'Beanies' },
  // --- Vinyl Village (food characters) ---
  { id: 8, name: 'Ellis', phoneNumber: '5559123', location: 'Vinyl Village', sport: null, food: 'Phở', clothing: 'Hoodies' },
  { id: 9, name: 'Finn', phoneNumber: '5551357', location: 'Vinyl Village', sport: null, food: 'Phở', clothing: 'Denim Jackets' },
  { id: 10, name: 'Luna', phoneNumber: '5552468', location: 'Vinyl Village', sport: null, food: 'Tofu', clothing: 'Flannel Shirts' },
  { id: 11, name: 'Milo', phoneNumber: '5553579', location: 'Vinyl Village', sport: null, food: 'Tofu', clothing: 'Glasses' },
  // --- Sunset Skatepark (hobby characters) ---
  { id: 12, name: 'Harper', phoneNumber: '5554681', location: 'Sunset Skatepark', sport: 'Photography', food: null, clothing: 'Glasses' },
  { id: 13, name: 'Ezra', phoneNumber: '5555792', location: 'Sunset Skatepark', sport: 'Photography', food: null, clothing: 'Flannel Shirts' },
  { id: 14, name: 'Wren', phoneNumber: '5556813', location: 'Sunset Skatepark', sport: 'Rock Climbing', food: null, clothing: 'Hoodies' },
  { id: 15, name: 'Soren', phoneNumber: '5557924', location: 'Sunset Skatepark', sport: 'Rock Climbing', food: null, clothing: 'Beanies' },
  // --- Lakeside Pier (hobby characters) ---
  { id: 16, name: 'Aria', phoneNumber: '5558135', location: 'Lakeside Pier', sport: 'Skateboarding', food: null, clothing: 'Denim Jackets' },
  { id: 17, name: 'Jade', phoneNumber: '5559246', location: 'Lakeside Pier', sport: 'Skateboarding', food: null, clothing: 'Doc Martens' },
  { id: 18, name: 'Nico', phoneNumber: '5551478', location: 'Lakeside Pier', sport: 'Painting', food: null, clothing: 'Doc Martens' },
  { id: 19, name: 'Ivy', phoneNumber: '5552589', location: 'Lakeside Pier', sport: 'Painting', food: null, clothing: 'Hoodies' },
  // --- The Art Loft (hobby characters) ---
  { id: 20, name: 'River', phoneNumber: '5553691', location: 'The Art Loft', sport: 'Dancing', food: null, clothing: 'Beanies' },
  { id: 21, name: 'Skyler', phoneNumber: '5554712', location: 'The Art Loft', sport: 'Dancing', food: null, clothing: 'Flannel Shirts' },
  { id: 22, name: 'Ash', phoneNumber: '5555823', location: 'The Art Loft', sport: 'Guitar', food: null, clothing: 'Denim Jackets' },
  { id: 23, name: 'Zara', phoneNumber: '5556934', location: 'The Art Loft', sport: 'Guitar', food: null, clothing: 'Glasses' },
];

export const ALL_LOCATIONS = [
  'Moonlight Café',
  'Pixel Arcade',
  'Vinyl Village',
  'Sunset Skatepark',
  'Lakeside Pier',
  'The Art Loft',
];

export const ALL_SPORTS = [
  'Photography',
  'Rock Climbing',
  'Skateboarding',
  'Painting',
  'Dancing',
  'Guitar',
];

export const ALL_FOODS = [
  'Boba Tea',
  'Ramen',
  'Tacos',
  'Matcha',
  'Phở',
  'Tofu',
];

export const ALL_CLOTHING = [
  'Doc Martens',
  'Hoodies',
  'Denim Jackets',
  'Glasses',
  'Beanies',
  'Flannel Shirts',
];

export function formatPhoneNumber(digits: string): string {
  if (digits.length <= 3) return digits;
  return digits.slice(0, 3) + '-' + digits.slice(3);
}

export function findBoyByPhone(phoneNumber: string): Boy | undefined {
  return BOYS.find((b) => b.phoneNumber === phoneNumber);
}
