import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import * as CoursesActions from './courses.actions';

import { CoursesService } from '../../services/courses/courses.service';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(CoursesActions.loadCourses),
      switchMap(({ start, count }) => this._coursesService.getCourses({ start, count })),
      map((courses) => CoursesActions.loadCoursesSuccess({ courses })),
    );
  });

  searchCourses$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(CoursesActions.searchCourses),
      switchMap((action) => this._coursesService.searchCourses(action.search)),
      map((courses) => CoursesActions.loadCoursesSuccess({ courses })),
    );
  });

  deleteCourse$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      switchMap((action) => {
        this._coursesService.deleteCourse(action.courseId);

        return of(action.courseId);
      }),
      map((courseId) => CoursesActions.deleteCourseSuccess({ courseId })),
    );
  });

  constructor(
    private _actions$: Actions,
    private _coursesService: CoursesService,
  ) {}
}
