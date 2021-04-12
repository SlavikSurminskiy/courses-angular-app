import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses/courses.service';
import { CourseUpdate, ICourse } from '../../shared/models/course.model';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  course: ICourse = {
    id: '',
    name: '',
    duration: 0,
    topRated: false,
    description: '',
    creationDate: '',
  };

  private _courseId = '';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _coursesService: CoursesService,
  ) {}

  ngOnInit(): void {
    this._courseId = this._route.snapshot.params.courseId;

    this._coursesService.getCourse(this._courseId)
      .subscribe((course) => {
        this.course = course;
      }, () => {
        this._router.navigate(['../']);
      });
  }

  onSaveCourse(course: CourseUpdate): void {
    this._coursesService.updateCourse(this._courseId, course).subscribe(() => {
      this._router.navigate(['../']);
    });
  }
}
