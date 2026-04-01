export interface Pronouns {
  subject: string;
  object: string;
  possessive: string;
  contraction: string;
  dontDoesnt: string;
  thirdPerson: boolean;
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

export interface DataSet {
  title: string;
  pronouns: Pronouns;
  locations: string[];
  activities: string[];
  foods: string[];
  clothing: string[];
  admirers: Admirer[];
}
