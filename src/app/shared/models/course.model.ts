export interface ICourse {
  id: string;
  name: string;
  creationDate: string;
  duration: number;
  topRated: boolean;
  description: string;
}

export type CourseUpdate = Omit<ICourse, 'id'>;
