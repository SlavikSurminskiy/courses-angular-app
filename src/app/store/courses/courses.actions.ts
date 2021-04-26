import { createAction, props } from '@ngrx/store';

export const loadCourses = createAction('[COURSES] LOAD');
export const loadCoursesComplete = createAction('[COURSES] LOAD_SUCCESS', props<any>());

export const searchCourses = createAction('[COURSES] SEARCH', props<any>());
export const searchCoursesComplete = createAction('[COURSES] SEARCH_SUCCESS', props<any>());
