export type Employee = {
  id: number;
  name: string;
  phonenumber: string;
  address: string;
};

export type Attendance = {
  id: number;
  employee: Employee;
  status: 'present' | 'absent' | 'pending' | 'working';
  checkIn: Date | null;
  checkOut: Date | null;
  createdAt: Date;
};
