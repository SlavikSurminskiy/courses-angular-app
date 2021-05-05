import { AuthState } from './auth/auth.constants';
import { CoursesState } from './courses/courses.constants';

export interface StoreState {
  auth: AuthState;
  courses: CoursesState;
}
