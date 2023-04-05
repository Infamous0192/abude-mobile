export type GeneralResponse = {
  message: string;
};

export type ErrorResponse = {
  message: string;
  errors?: { [key: string]: string };
};
