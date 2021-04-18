import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CoursesService } from '../../services/courses/courses.service';
import { ICourse } from '../../shared/models/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _coursesService: CoursesService,
  ) {}

  course: ICourse = {
    id: '',
    name: '',
    duration: 0,
    topRated: false,
    description: '',
    date: '',
  };

  ngOnInit(): void {
    const { courseId } = this._route.snapshot.params;

    const subscription = this._coursesService.getCourse(courseId)
      .subscribe((course) => {
        this.course = course;
      }, () => {
        this._router.navigate(['../']);
      });

    this._subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
