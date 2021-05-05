import { ICourse } from '../../shared/models/course.model';

export interface CoursesState {
  courses: ICourse[];
  loading: boolean;
}

export const initialState: CoursesState = {
  courses: [],
  loading: false,
};
