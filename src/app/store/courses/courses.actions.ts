import { createAction, props } from '@ngrx/store';

import { ICourse } from '../../shared/models/course.model';

export const loadCourses = createAction(
  '[COURSES] LOAD COURSES',
  props<{ start: string; count: string }>(),
);

export const loadCoursesSuccess = createAction(
  '[COURSES] LOAD COURSES SUCCESS',
  props<{ courses: ICourse[] }>(),
);

export const searchCourses = createAction(
  '[COURSES] SEARCH COURSES',
  props<{ search: string }>(),
);

export const searchCoursesSuccess = createAction(
  '[COURSES] SEARCH COURSES SUCCESS',
  props<{ courses: ICourse[] }>(),
);

export const deleteCourse = createAction(
  '[COURSES] DELETE COURSE',
  props<{ courseId: string }>(),
);

export const deleteCourseSuccess = createAction(
  '[COURSES] DELETE COURSE SUCCESS',
  props<{ courseId: string }>(),
);
