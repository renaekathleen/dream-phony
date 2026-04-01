import type { DataSet } from './types';

export const PRESET_INCLUSIVE: DataSet = {
  title: 'Dream Phony',
  pronouns: {
    subject: 'they',
    object: 'them',
    possessive: 'their',
    contraction: "they're",
    dontDoesnt: "they don't",
    thirdPerson: false,
  },
  locations: [
    'Send Noods', 'The Sunny Side', 'The Broken Spoke',
    'Fern Creek Trail', "The Comrade's Table", 'The Back Room',
  ],
  activities: ['birding', 'camping', 'sewing', 'direct action', 'karaoke', 'tabletop RPGs'],
  foods: ['ramen', 'phở', 'tofu scramble', 'bloody marys', 'tacos', 'sour beers'],
  clothing: ['boots', 'a hoodie', 'a denim jacket', 'glasses', 'a beanie', 'a flannel'],
  admirers: [
    { id: 0, name: 'Riley', phoneNumber: '5551234', location: 'Send Noods', activity: null, food: 'ramen', clothing: 'boots' },
    { id: 1, name: 'Jordan', phoneNumber: '5552345', location: 'Send Noods', activity: null, food: 'ramen', clothing: 'a hoodie' },
    { id: 2, name: 'Fox', phoneNumber: '5553456', location: 'Send Noods', activity: null, food: 'phở', clothing: 'a denim jacket' },
    { id: 3, name: 'Kai', phoneNumber: '5554567', location: 'Send Noods', activity: null, food: 'phở', clothing: 'glasses' },
    { id: 4, name: 'Jules', phoneNumber: '5555678', location: 'The Sunny Side', activity: null, food: 'tofu scramble', clothing: 'a beanie' },
    { id: 5, name: 'Rowan', phoneNumber: '5556789', location: 'The Sunny Side', activity: null, food: 'tofu scramble', clothing: 'a flannel' },
    { id: 6, name: 'Avery', phoneNumber: '5557891', location: 'The Sunny Side', activity: null, food: 'bloody marys', clothing: 'boots' },
    { id: 7, name: 'Nova', phoneNumber: '5558912', location: 'The Sunny Side', activity: null, food: 'bloody marys', clothing: 'a beanie' },
    { id: 8, name: 'Ellis', phoneNumber: '5559123', location: 'The Broken Spoke', activity: null, food: 'tacos', clothing: 'a hoodie' },
    { id: 9, name: 'Finn', phoneNumber: '5551357', location: 'The Broken Spoke', activity: null, food: 'tacos', clothing: 'a denim jacket' },
    { id: 10, name: 'Luna', phoneNumber: '5552468', location: 'The Broken Spoke', activity: null, food: 'sour beers', clothing: 'a flannel' },
    { id: 11, name: 'Milo', phoneNumber: '5553579', location: 'The Broken Spoke', activity: null, food: 'sour beers', clothing: 'glasses' },
    { id: 12, name: 'Harper', phoneNumber: '5554681', location: 'Fern Creek Trail', activity: 'birding', food: null, clothing: 'glasses' },
    { id: 13, name: 'Ezra', phoneNumber: '5555792', location: 'Fern Creek Trail', activity: 'birding', food: null, clothing: 'a flannel' },
    { id: 14, name: 'Wren', phoneNumber: '5556813', location: 'Fern Creek Trail', activity: 'camping', food: null, clothing: 'a hoodie' },
    { id: 15, name: 'Soren', phoneNumber: '5557924', location: 'Fern Creek Trail', activity: 'camping', food: null, clothing: 'a beanie' },
    { id: 16, name: 'Aria', phoneNumber: '5558135', location: "The Comrade's Table", activity: 'sewing', food: null, clothing: 'a denim jacket' },
    { id: 17, name: 'Jade', phoneNumber: '5559246', location: "The Comrade's Table", activity: 'sewing', food: null, clothing: 'boots' },
    { id: 18, name: 'Nico', phoneNumber: '5551478', location: "The Comrade's Table", activity: 'direct action', food: null, clothing: 'boots' },
    { id: 19, name: 'Ivy', phoneNumber: '5552589', location: "The Comrade's Table", activity: 'direct action', food: null, clothing: 'a hoodie' },
    { id: 20, name: 'River', phoneNumber: '5553691', location: 'The Back Room', activity: 'karaoke', food: null, clothing: 'a beanie' },
    { id: 21, name: 'Skyler', phoneNumber: '5554712', location: 'The Back Room', activity: 'karaoke', food: null, clothing: 'a flannel' },
    { id: 22, name: 'Ash', phoneNumber: '5555823', location: 'The Back Room', activity: 'tabletop RPGs', food: null, clothing: 'a denim jacket' },
    { id: 23, name: 'Zara', phoneNumber: '5556934', location: 'The Back Room', activity: 'tabletop RPGs', food: null, clothing: 'glasses' },
  ],
};

export const PRESET_CLASSIC: DataSet = {
  title: 'Dream Phony Classic',
  pronouns: {
    subject: 'he',
    object: 'him',
    possessive: 'his',
    contraction: "he's",
    dontDoesnt: "he doesn't",
    thirdPerson: true,
  },
  locations: [
    'Crosstown Mall', 'E.A.T.S. Snack Shop', 'Reel Movies',
    'Woodland Park', 'High Tide Beach', "Jim's Gym",
  ],
  activities: ['Baseball', 'Skateboarding', 'Volleyball', 'Surfing', 'Basketball', 'Tennis'],
  foods: ['Cookies', 'Ice Cream', 'Hot Dogs', 'Pizza', 'Candy', 'Popcorn'],
  clothing: ['Blue Jeans', 'Tie', 'Jacket', 'Glasses', 'Hat', 'Anything Yellow'],
  admirers: [
    { id: 0, name: 'Dave', phoneNumber: '5551111', location: 'Crosstown Mall', activity: null, food: 'Cookies', clothing: 'Blue Jeans' },
    { id: 1, name: 'George', phoneNumber: '5551233', location: 'Crosstown Mall', activity: null, food: 'Ice Cream', clothing: 'Tie' },
    { id: 2, name: 'Dale', phoneNumber: '5554566', location: 'Crosstown Mall', activity: null, food: 'Ice Cream', clothing: 'Jacket' },
    { id: 3, name: 'Alan', phoneNumber: '5557899', location: 'Crosstown Mall', activity: null, food: 'Cookies', clothing: 'Tie' },
    { id: 4, name: 'James', phoneNumber: '5552588', location: 'E.A.T.S. Snack Shop', activity: null, food: 'Hot Dogs', clothing: 'Jacket' },
    { id: 5, name: 'Phil', phoneNumber: '5553333', location: 'E.A.T.S. Snack Shop', activity: null, food: 'Pizza', clothing: 'Glasses' },
    { id: 6, name: 'Bruce', phoneNumber: '5553699', location: 'E.A.T.S. Snack Shop', activity: null, food: 'Pizza', clothing: 'Tie' },
    { id: 7, name: 'Tyler', phoneNumber: '5551477', location: 'E.A.T.S. Snack Shop', activity: null, food: 'Hot Dogs', clothing: 'Blue Jeans' },
    { id: 8, name: 'Jamal', phoneNumber: '5559877', location: 'Reel Movies', activity: null, food: 'Candy', clothing: 'Tie' },
    { id: 9, name: 'Gary', phoneNumber: '5553211', location: 'Reel Movies', activity: null, food: 'Popcorn', clothing: 'Blue Jeans' },
    { id: 10, name: 'Dan', phoneNumber: '5557777', location: 'Reel Movies', activity: null, food: 'Candy', clothing: 'Blue Jeans' },
    { id: 11, name: 'Spencer', phoneNumber: '5556544', location: 'Reel Movies', activity: null, food: 'Popcorn', clothing: 'Jacket' },
    { id: 12, name: 'Mark', phoneNumber: '5558522', location: 'Woodland Park', activity: 'Baseball', food: null, clothing: 'Hat' },
    { id: 13, name: 'Jason', phoneNumber: '5557411', location: 'Woodland Park', activity: 'Baseball', food: null, clothing: 'Glasses' },
    { id: 14, name: 'Steve', phoneNumber: '5559999', location: 'Woodland Park', activity: 'Skateboarding', food: null, clothing: 'Jacket' },
    { id: 15, name: 'John', phoneNumber: '5559633', location: 'Woodland Park', activity: 'Skateboarding', food: null, clothing: 'Anything Yellow' },
    { id: 16, name: 'Paul', phoneNumber: '5555515', location: 'High Tide Beach', activity: 'Volleyball', food: null, clothing: 'Anything Yellow' },
    { id: 17, name: 'Tony', phoneNumber: '5552442', location: 'High Tide Beach', activity: 'Volleyball', food: null, clothing: 'Hat' },
    { id: 18, name: 'Wayne', phoneNumber: '5553535', location: 'High Tide Beach', activity: 'Surfing', food: null, clothing: 'Anything Yellow' },
    { id: 19, name: 'Mike', phoneNumber: '5552226', location: 'High Tide Beach', activity: 'Surfing', food: null, clothing: 'Hat' },
    { id: 20, name: 'Scott', phoneNumber: '5555599', location: "Jim's Gym", activity: 'Basketball', food: null, clothing: 'Anything Yellow' },
    { id: 21, name: 'Bob', phoneNumber: '5554884', location: "Jim's Gym", activity: 'Basketball', food: null, clothing: 'Glasses' },
    { id: 22, name: 'Carlos', phoneNumber: '5556668', location: "Jim's Gym", activity: 'Tennis', food: null, clothing: 'Hat' },
    { id: 23, name: 'Matt', phoneNumber: '5557557', location: "Jim's Gym", activity: 'Tennis', food: null, clothing: 'Glasses' },
  ],
};

export const PRESETS: Record<string, DataSet> = {
  inclusive: PRESET_INCLUSIVE,
  classic: PRESET_CLASSIC,
};

const TEMPLATE: DataSet = {
  title: 'My Custom Game',
  pronouns: {
    subject: 'they',
    object: 'them',
    possessive: 'their',
    contraction: "they're",
    dontDoesnt: "they don't",
    thirdPerson: false,
  },
  locations: ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', 'Location 6'],
  activities: ['Activity 1', 'Activity 2', 'Activity 3', 'Activity 4', 'Activity 5', 'Activity 6'],
  foods: ['Food 1', 'Food 2', 'Food 3', 'Food 4', 'Food 5', 'Food 6'],
  clothing: ['Clothing 1', 'Clothing 2', 'Clothing 3', 'Clothing 4', 'Clothing 5', 'Clothing 6'],
  admirers: Array.from({ length: 24 }, (_, i) => {
    const locIdx = Math.floor(i / 4);
    const isFood = locIdx < 3;
    const traitIdx = Math.floor((i % 4) / 2);
    return {
      id: i,
      name: `Name ${i + 1}`,
      phoneNumber: `555${String(1000 + i).slice(-4)}`,
      location: `Location ${locIdx + 1}`,
      activity: isFood ? null : `Activity ${traitIdx + 1 + (locIdx - 3) * 2}`,
      food: isFood ? `Food ${traitIdx + 1 + locIdx * 2}` : null,
      clothing: `Clothing ${(i % 6) + 1}`,
    };
  }),
};

export function getBlankTemplate(): string {
  return JSON.stringify(TEMPLATE, null, 2);
}
