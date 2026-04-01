import type { DataSet, Admirer, Pronouns } from './types';

const MAX_STRING_LENGTH = 100;
const MAX_TITLE_LENGTH = 60;
const PHONE_PATTERN = /^\d{7}$/;
const REQUIRED_ADMIRERS = 24;
const REQUIRED_ARRAY_LENGTH = 6;
const ADMIRERS_PER_LOCATION = 4;
const FOOD_ADMIRERS = 12;
const ACTIVITY_ADMIRERS = 12;

function sanitize(input: string, maxLen: number): string {
  return String(input)
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'`]/g, '')
    .trim()
    .slice(0, maxLen);
}

function isNonEmptyString(val: unknown): val is string {
  return typeof val === 'string' && val.trim().length > 0;
}

function isValidIndex(val: unknown, arrayLen: number): val is number {
  return typeof val === 'number' && Number.isInteger(val) && val >= 0 && val < arrayLen;
}

export interface ValidationError {
  field: string;
  message: string;
}

function validatePronouns(p: unknown): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!p || typeof p !== 'object') {
    errors.push({ field: 'pronouns', message: 'Pronouns object is required.' });
    return errors;
  }
  const obj = p as Record<string, unknown>;
  for (const key of ['subject', 'object', 'possessive', 'contraction', 'dontDoesnt'] as const) {
    if (!isNonEmptyString(obj[key])) {
      errors.push({ field: `pronouns.${key}`, message: `"${key}" must be a non-empty string.` });
    }
  }
  if (typeof obj.thirdPerson !== 'boolean') {
    errors.push({ field: 'pronouns.thirdPerson', message: '"thirdPerson" must be a boolean.' });
  }
  return errors;
}

function validateStringArray(
  arr: unknown,
  field: string,
  requiredLength: number,
): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!Array.isArray(arr)) {
    errors.push({ field, message: `"${field}" must be an array.` });
    return errors;
  }
  if (arr.length !== requiredLength) {
    errors.push({
      field,
      message: `"${field}" must have exactly ${requiredLength} items, got ${arr.length}.`,
    });
  }
  const seen = new Set<string>();
  for (let i = 0; i < arr.length; i++) {
    if (!isNonEmptyString(arr[i])) {
      errors.push({ field: `${field}[${i}]`, message: `Item ${i} must be a non-empty string.` });
    } else if (String(arr[i]).length > MAX_STRING_LENGTH) {
      errors.push({
        field: `${field}[${i}]`,
        message: `Item ${i} exceeds max length of ${MAX_STRING_LENGTH}.`,
      });
    } else {
      const normalized = String(arr[i]).trim().toLowerCase();
      if (seen.has(normalized)) {
        errors.push({ field: `${field}[${i}]`, message: `Duplicate value "${arr[i]}".` });
      }
      seen.add(normalized);
    }
  }
  return errors;
}

function validateAdmirers(
  admirers: unknown,
  locations: string[],
  activities: string[],
  foods: string[],
  clothing: string[],
): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!Array.isArray(admirers)) {
    errors.push({ field: 'admirers', message: '"admirers" must be an array.' });
    return errors;
  }
  if (admirers.length !== REQUIRED_ADMIRERS) {
    errors.push({
      field: 'admirers',
      message: `Must have exactly ${REQUIRED_ADMIRERS} admirers, got ${admirers.length}.`,
    });
  }

  const phonesSeen = new Set<string>();
  const namesSeen = new Set<string>();
  const locationCounts = new Map<number, number>();
  let foodCount = 0;
  let activityCount = 0;

  for (let i = 0; i < admirers.length; i++) {
    const a = admirers[i] as Record<string, unknown>;
    const prefix = `admirers[${i}]`;

    if (!a || typeof a !== 'object') {
      errors.push({ field: prefix, message: 'Must be an object.' });
      continue;
    }

    if (typeof a.id !== 'number' || a.id !== i) {
      errors.push({ field: `${prefix}.id`, message: `id must be ${i}.` });
    }

    if (!isNonEmptyString(a.name)) {
      errors.push({ field: `${prefix}.name`, message: 'Name is required.' });
    } else if (String(a.name).length > MAX_STRING_LENGTH) {
      errors.push({ field: `${prefix}.name`, message: `Name exceeds max length of ${MAX_STRING_LENGTH}.` });
    } else {
      const normalized = String(a.name).trim().toLowerCase();
      if (namesSeen.has(normalized)) {
        errors.push({ field: `${prefix}.name`, message: `Duplicate name "${a.name}".` });
      }
      namesSeen.add(normalized);
    }

    if (!isNonEmptyString(a.phoneNumber) || !PHONE_PATTERN.test(String(a.phoneNumber))) {
      errors.push({ field: `${prefix}.phoneNumber`, message: 'Phone number must be exactly 7 digits.' });
    } else {
      if (phonesSeen.has(String(a.phoneNumber))) {
        errors.push({ field: `${prefix}.phoneNumber`, message: `Duplicate phone number "${a.phoneNumber}".` });
      }
      phonesSeen.add(String(a.phoneNumber));
    }

    if (!isValidIndex(a.location, locations.length)) {
      errors.push({ field: `${prefix}.location`, message: `location must be an index 0–${locations.length - 1}.` });
    } else {
      locationCounts.set(a.location, (locationCounts.get(a.location) ?? 0) + 1);
    }

    if (!isValidIndex(a.clothing, clothing.length)) {
      errors.push({ field: `${prefix}.clothing`, message: `clothing must be an index 0–${clothing.length - 1}.` });
    }

    const hasActivity = a.activity !== null;
    const hasFood = a.food !== null;

    if (hasActivity && hasFood) {
      errors.push({ field: prefix, message: 'An admirer must have either activity OR food, not both.' });
    } else if (!hasActivity && !hasFood) {
      errors.push({ field: prefix, message: 'An admirer must have either an activity or a food.' });
    }

    if (hasActivity) {
      activityCount++;
      if (!isValidIndex(a.activity, activities.length)) {
        errors.push({ field: `${prefix}.activity`, message: `activity must be an index 0–${activities.length - 1}.` });
      }
    }

    if (hasFood) {
      foodCount++;
      if (!isValidIndex(a.food, foods.length)) {
        errors.push({ field: `${prefix}.food`, message: `food must be an index 0–${foods.length - 1}.` });
      }
    }
  }

  for (let li = 0; li < locations.length; li++) {
    const count = locationCounts.get(li) ?? 0;
    if (count !== ADMIRERS_PER_LOCATION) {
      errors.push({
        field: 'admirers',
        message: `Location "${locations[li]}" (index ${li}) must have exactly ${ADMIRERS_PER_LOCATION} admirers, got ${count}.`,
      });
    }
  }

  if (foodCount !== FOOD_ADMIRERS) {
    errors.push({
      field: 'admirers',
      message: `Exactly ${FOOD_ADMIRERS} admirers must have foods, got ${foodCount}.`,
    });
  }
  if (activityCount !== ACTIVITY_ADMIRERS) {
    errors.push({
      field: 'admirers',
      message: `Exactly ${ACTIVITY_ADMIRERS} admirers must have activities, got ${activityCount}.`,
    });
  }

  return errors;
}

export function validateDataSet(raw: unknown): { data: DataSet | null; errors: ValidationError[] } {
  if (!raw || typeof raw !== 'object') {
    return { data: null, errors: [{ field: 'root', message: 'Input must be a JSON object.' }] };
  }

  const obj = raw as Record<string, unknown>;
  const errors: ValidationError[] = [];

  if (!isNonEmptyString(obj.title)) {
    errors.push({ field: 'title', message: '"title" is required and must be a non-empty string.' });
  } else if (String(obj.title).length > MAX_TITLE_LENGTH) {
    errors.push({ field: 'title', message: `"title" exceeds max length of ${MAX_TITLE_LENGTH}.` });
  }

  errors.push(...validatePronouns(obj.pronouns));
  errors.push(...validateStringArray(obj.locations, 'locations', REQUIRED_ARRAY_LENGTH));
  errors.push(...validateStringArray(obj.activities, 'activities', REQUIRED_ARRAY_LENGTH));
  errors.push(...validateStringArray(obj.foods, 'foods', REQUIRED_ARRAY_LENGTH));
  errors.push(...validateStringArray(obj.clothing, 'clothing', REQUIRED_ARRAY_LENGTH));

  const locations = Array.isArray(obj.locations) ? obj.locations.filter(isNonEmptyString) : [];
  const activities = Array.isArray(obj.activities) ? obj.activities.filter(isNonEmptyString) : [];
  const foods = Array.isArray(obj.foods) ? obj.foods.filter(isNonEmptyString) : [];
  const clothingArr = Array.isArray(obj.clothing) ? obj.clothing.filter(isNonEmptyString) : [];

  errors.push(...validateAdmirers(obj.admirers, locations, activities, foods, clothingArr));

  if (errors.length > 0) {
    return { data: null, errors };
  }

  const rawAdmirers = obj.admirers as Record<string, unknown>[];
  const sanitizedAdmirers: Admirer[] = rawAdmirers.map((a, i) => ({
    id: i,
    name: sanitize(String(a.name), MAX_STRING_LENGTH),
    phoneNumber: String(a.phoneNumber).replace(/\D/g, '').slice(0, 7),
    location: sanitize(locations[a.location as number], MAX_STRING_LENGTH),
    activity: a.activity === null ? null : sanitize(activities[a.activity as number], MAX_STRING_LENGTH),
    food: a.food === null ? null : sanitize(foods[a.food as number], MAX_STRING_LENGTH),
    clothing: sanitize(clothingArr[a.clothing as number], MAX_STRING_LENGTH),
  }));

  const p = obj.pronouns as Record<string, unknown>;
  const sanitizedPronouns: Pronouns = {
    subject: sanitize(String(p.subject), MAX_STRING_LENGTH),
    object: sanitize(String(p.object), MAX_STRING_LENGTH),
    possessive: sanitize(String(p.possessive), MAX_STRING_LENGTH),
    contraction: sanitize(String(p.contraction), MAX_STRING_LENGTH),
    dontDoesnt: sanitize(String(p.dontDoesnt), MAX_STRING_LENGTH),
    thirdPerson: Boolean(p.thirdPerson),
  };

  return {
    data: {
      title: sanitize(String(obj.title), MAX_TITLE_LENGTH),
      pronouns: sanitizedPronouns,
      locations: locations.map((s) => sanitize(s, MAX_STRING_LENGTH)),
      activities: activities.map((s) => sanitize(s, MAX_STRING_LENGTH)),
      foods: foods.map((s) => sanitize(s, MAX_STRING_LENGTH)),
      clothing: clothingArr.map((s) => sanitize(s, MAX_STRING_LENGTH)),
      admirers: sanitizedAdmirers,
    },
    errors: [],
  };
}

export function dataSetToJson(ds: DataSet): string {
  return JSON.stringify({
    title: ds.title,
    pronouns: ds.pronouns,
    locations: ds.locations,
    activities: ds.activities,
    foods: ds.foods,
    clothing: ds.clothing,
    admirers: ds.admirers.map((a) => ({
      id: a.id,
      name: a.name,
      phoneNumber: a.phoneNumber,
      location: ds.locations.indexOf(a.location),
      activity: a.activity === null ? null : ds.activities.indexOf(a.activity),
      food: a.food === null ? null : ds.foods.indexOf(a.food),
      clothing: ds.clothing.indexOf(a.clothing),
    })),
  }, null, 2);
}

export function formatPhone(digits: string): string {
  if (digits.length <= 3) return digits;
  return digits.slice(0, 3) + '-' + digits.slice(3);
}
