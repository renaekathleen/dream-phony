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
  const locationCounts = new Map<string, number>();
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

    if (!isNonEmptyString(a.location) || !locations.includes(String(a.location))) {
      errors.push({ field: `${prefix}.location`, message: `Location must be one of the defined locations.` });
    } else {
      const loc = String(a.location);
      locationCounts.set(loc, (locationCounts.get(loc) ?? 0) + 1);
    }

    if (!isNonEmptyString(a.clothing) || !clothing.includes(String(a.clothing))) {
      errors.push({ field: `${prefix}.clothing`, message: `Clothing must be one of the defined clothing items.` });
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
      if (!isNonEmptyString(a.activity) || !activities.includes(String(a.activity))) {
        errors.push({ field: `${prefix}.activity`, message: 'Activity must be one of the defined activities.' });
      }
    }

    if (hasFood) {
      foodCount++;
      if (!isNonEmptyString(a.food) || !foods.includes(String(a.food))) {
        errors.push({ field: `${prefix}.food`, message: 'Food must be one of the defined foods.' });
      }
    }
  }

  for (const loc of locations) {
    const count = locationCounts.get(loc) ?? 0;
    if (count !== ADMIRERS_PER_LOCATION) {
      errors.push({
        field: 'admirers',
        message: `Location "${loc}" must have exactly ${ADMIRERS_PER_LOCATION} admirers, got ${count}.`,
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

  const sanitizedAdmirers: Admirer[] = (obj.admirers as Record<string, unknown>[]).map(
    (a, i) => ({
      id: i,
      name: sanitize(String(a.name), MAX_STRING_LENGTH),
      phoneNumber: String(a.phoneNumber).replace(/\D/g, '').slice(0, 7),
      location: sanitize(String(a.location), MAX_STRING_LENGTH),
      activity: a.activity === null ? null : sanitize(String(a.activity), MAX_STRING_LENGTH),
      food: a.food === null ? null : sanitize(String(a.food), MAX_STRING_LENGTH),
      clothing: sanitize(String(a.clothing), MAX_STRING_LENGTH),
    }),
  );

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
      locations: (obj.locations as string[]).map((s) => sanitize(s, MAX_STRING_LENGTH)),
      activities: (obj.activities as string[]).map((s) => sanitize(s, MAX_STRING_LENGTH)),
      foods: (obj.foods as string[]).map((s) => sanitize(s, MAX_STRING_LENGTH)),
      clothing: (obj.clothing as string[]).map((s) => sanitize(s, MAX_STRING_LENGTH)),
      admirers: sanitizedAdmirers,
    },
    errors: [],
  };
}

export function formatPhone(digits: string): string {
  if (digits.length <= 3) return digits;
  return digits.slice(0, 3) + '-' + digits.slice(3);
}
