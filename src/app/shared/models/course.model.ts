export interface ICourse {
  id: string;
  name: string;
  date: string;
  duration: number;
  topRated: boolean;
  description: string;
  authors?: Author[];
}

export interface Author {
  name: string;
}

export type CourseUpdate = Omit<ICourse, 'id'>;
