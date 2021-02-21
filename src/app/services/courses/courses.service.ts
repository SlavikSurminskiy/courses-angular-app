import { Injectable } from '@angular/core';

import { COURSES } from './mock-courses';
import { ICourse } from '../../shared/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCourses(): ICourse[] {
    return COURSES;
  }
}
