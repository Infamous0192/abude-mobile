export type Answer = {
  text: string;
  value: boolean;
};

export type Question = {
  text: string;
  image?: string;
  answers: Answer[];
};

export type Challenge = {
  image: string;
  answer: string;
};
