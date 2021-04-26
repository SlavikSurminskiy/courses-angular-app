import { Action, createReducer, on } from '@ngrx/store';

import * as CoursesActions from './courses.actions';

import { CoursesState, initialState } from './courses.constants';

const coursesReducerCreator = createReducer(
  initialState,
  on(CoursesActions.loadCourses, (state) => {
    return { ...state, loading: true };
  }),
  on(CoursesActions.loadCoursesSuccess, (state, action) => {
    return { ...state, courses: action.courses, loading: false };
  }),
  on(CoursesActions.searchCoursesSuccess, (state, action) => {
    return { ...state, courses: action.courses };
  }),
  on(CoursesActions.deleteCourseSuccess, (state, action) => {
    return { ...state, courses: state.courses.filter((c) => c.id !== action.courseId) };
  }),
);

export function CoursesReducer(state: CoursesState | undefined, action: Action): CoursesState {
  return coursesReducerCreator(state, action);
}
