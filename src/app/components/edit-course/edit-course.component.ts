import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CoursesService } from '../../services/courses/courses.service';
import { LoadingService } from '../../services/loading/loading.service';
import { CourseUpdate, ICourse } from '../../shared/models/course.model';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit, OnDestroy {
  course: ICourse = {
    id: '',
    name: '',
    duration: 0,
    topRated: false,
    description: '',
    date: '',
  };

  private _courseId = '';
  private _subscriptions: Subscription[] = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _coursesService: CoursesService,
    private _loadingServise: LoadingService,
  ) {}

  ngOnInit(): void {
    this._courseId = this._route.snapshot.params.courseId;

    const subscription = this._coursesService.getCourse(this._courseId)
      .subscribe((course) => {
        this.course = course;
      }, () => {
        this._router.navigate(['../']);
      });

    this._subscriptions.push(subscription);
  }

  onSaveCourse(course: CourseUpdate): void {
    this._loadingServise.showLoader$.next(true);

    this._coursesService.updateCourse(this._courseId, course).subscribe(() => {
      this._loadingServise.showLoader$.next(false);

      this._router.navigate(['../']);
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
