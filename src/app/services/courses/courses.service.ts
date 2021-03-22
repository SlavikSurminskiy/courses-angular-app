import { Injectable } from '@angular/core';

import { COURSES } from './mock-courses';
import { ICourse, CourseUpdate } from '../../shared/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private _courses = COURSES;

  getCourses(): ICourse[] {
    return this._courses;
  }

  addCourse(course: ICourse): ICourse[] {
    this._courses.push(course);

    return this._courses;
  }

  getCourse(id: string): ICourse | undefined {
    return this._courses.find((course) => course.id === id);
  }

  updateCourse(id: string, data: CourseUpdate): ICourse[] {
    const target = this._courses.find((course) => course.id === id);
    Object.assign(target, data);

    return this._courses;
  }

  deteteCourse(id: string): ICourse[] {
    this._courses = this._courses.filter((course) => course.id !== id);

    return this._courses;
  }
}
