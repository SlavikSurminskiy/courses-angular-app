import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CoursesService } from '../../services/courses/courses.service';
import { CourseUpdate, ICourse } from '../../shared/models/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  course: ICourse = {
    id: '',
    name: '',
    duration: 0,
    topRated: false,
    description: '',
    creationDate: '',
  };

  constructor(
    private _router: Router,
    private _coursesService: CoursesService,
  ) {}

  onSaveCourse(course: CourseUpdate): void {
    this._coursesService.addCourse({...course, id: Date.now().toString()});
    this._router.navigate(['../']);
  }
}
