export type Company = {
  id: number;
  name: string;
  region: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CompanyRequest = {
  name: string;
  region: string;
};

export type CompanyQuery = {
  page?: number;
  limit?: number;
  keyword?: string;
};
