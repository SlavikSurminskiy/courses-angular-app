import { Action, createReducer, on } from '@ngrx/store';

import * as CoursesActions from './courses.actions';

import { CoursesState, initialState } from './courses.constants';

const coursesReducerCreator = createReducer(
  initialState,
  on(CoursesActions.loadCourses, (state) => {
    return { ...state, loading: true };
  }),
  on(CoursesActions.loadCoursesComplete, (state, action) => {
    return { ...state, courses: action.courses, loading: false };
  }),
  on(CoursesActions.searchCoursesComplete, (state, action) => {
    return { ...state, courses: action.courses };
  }),
);

export function CoursesReducer(state: CoursesState | undefined, action: Action): CoursesState {
  return coursesReducerCreator(state, action);
}
