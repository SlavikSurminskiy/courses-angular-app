import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CoursesService } from '../../services/courses/courses.service';
import { LoadingService } from '../../services/loading/loading.service';
import { CourseUpdate, ICourse } from '../../shared/models/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnDestroy {
  course: ICourse = {
    id: '',
    name: '',
    duration: 0,
    topRated: false,
    description: '',
    date: '',
  };

  private _subscriptions: Subscription[] = [];

  constructor(
    private _router: Router,
    private _coursesService: CoursesService,
    private _loadingServise: LoadingService,
  ) {}

  onSaveCourse(course: CourseUpdate): void {
    this._loadingServise.showLoader$.next(true);

    const subscription = this._coursesService.addCourse({...course, id: Date.now().toString()})
      .subscribe(() => {
        this._loadingServise.showLoader$.next(false);

        this._router.navigate(['../']);
      });

    this._subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
