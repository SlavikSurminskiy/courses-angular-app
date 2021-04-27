import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';
import {
  tap,
  filter,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

import { loadCourses, searchCourses, deleteCourse } from '../../store/courses/courses.actions';

import { ICourse } from '../../shared/models/course.model';
import { StoreState } from '../../store/store.models';

import { CoursesService } from '../../services/courses/courses.service';

import { DeleteCourseDialogComponent } from '../delete-course-dialog/delete-course-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoursesComponent implements OnInit, OnDestroy {
  searchQuery = '';
  searchQuery$ = new Subject<string>();
  courses$: Observable<ICourse[]>;

  private COURSES_PER_PAGE = 10;
  private currentPage = 1;
  private _subscriptions: Subscription[] = [];

  constructor(
    private _dialog: MatDialog,
    private _coursesService: CoursesService,
    private store: Store<StoreState>,
  ) {
    this.courses$ = this.store.select((state) => state.courses.courses);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourses({
      start: '0',
      count: '10',
    }));

    const subscription = this.searchQuery$.pipe(
      filter((v) => v.length > 2 || v === ''),
      debounceTime(250),
      distinctUntilChanged(),
      tap((search) => this.store.dispatch(searchCourses({ search })))
    ).subscribe();

    this._subscriptions.push(subscription);
  }

  onSearch(event: KeyboardEvent): void {
    const { value } = event.target as HTMLInputElement;

    this.searchQuery = value;
    this.searchQuery$.next(value);
  }

  onEdit(courseId: string): void {
    console.log(courseId);
  }

  onDelete(courseId: string): void {
    const course = this._coursesService.getCourse(courseId);

    this._dialog.open(DeleteCourseDialogComponent, {
      minWidth: 500,
      data: {...course},
    }).afterClosed().pipe(
      filter(value => value),
      tap(() => this.store.dispatch(deleteCourse({ courseId }))),
    ).subscribe();
  }

  onLoadMore(): void {
    this.currentPage++;
    const count = (this.currentPage * this.COURSES_PER_PAGE).toString();

    this.store.dispatch(loadCourses({ start: '0', count }));
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
