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

export const PRESETS: Record<string, DataSet> = {
  inclusive: PRESET_INCLUSIVE,
};

export function getBlankTemplate(): string {
  const admirers = Array.from({ length: 24 }, (_, i) => {
    const locIdx = Math.floor(i / 4);
    const isFood = locIdx < 3;
    const traitIdx = Math.floor((i % 4) / 2);
    return {
      id: i,
      name: `Name ${i + 1}`,
      phoneNumber: `555${String(1000 + i).slice(-4)}`,
      location: locIdx,
      activity: isFood ? null : traitIdx + (locIdx - 3) * 2,
      food: isFood ? traitIdx + locIdx * 2 : null,
      clothing: i % 6,
    };
  });

  return JSON.stringify({
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
    admirers,
  }, null, 2);
}
