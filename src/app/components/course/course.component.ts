import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursesService } from '../../services/courses/courses.service';
import { ICourse } from '../../shared/models/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
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

    this._coursesService.getCourse(courseId)
      .subscribe((course) => {
        this.course = course;
      }, () => {
        this._router.navigate(['../']);
      });
  }
}
