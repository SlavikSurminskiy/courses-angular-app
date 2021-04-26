import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import * as CoursesActions from './courses.actions';
import { CoursesService } from '../../services/courses/courses.service';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(CoursesActions.loadCourses),
      mergeMap(() => {
        return this._coursesService.getCourses()
          .pipe(
            map((courses) => {
              return CoursesActions.loadCoursesComplete({courses});
            }),
            catchError(() => EMPTY)
          );
      })
    );
  });

  // searchCourses$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(CoursesActions.searchCourses),
  //     mergeMap((search) => {
  //       return this._coursesService.searchCourses(search)
  //         .pipe(
  //           map((courses) => {
  //             return CoursesActions.searchCoursesComplete({courses});
  //           }),
  //           catchError(() => EMPTY)
  //         );
  //     })
  //   );
  // });

  constructor(
    private _actions$: Actions,
    private _coursesService: CoursesService,
  ) {}
}
