export interface IUnsortedVacation {
  user: {
    _id: string;
    name: string;
  };
  _id: string;
  usedDays: number;
  status: string;
  startDate: string;
  endDate: string;
}

export interface ISortedVacation {
  userId: string;
  name: string;
  weekendDates: { startDate: string; endDate: string }[];
}
