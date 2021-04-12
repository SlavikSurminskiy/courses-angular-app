import { Injectable } from '@angular/core';

import { COURSES } from './mock-courses';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICourse, CourseUpdate } from '../../shared/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private _courses = COURSES;

  constructor(private _http: HttpClient) {}

  getCourses({start, count} = {start: '0', count: '10'}): Observable<ICourse[]> {
    return this._http.get<ICourse[]>('courses', {
      params: new HttpParams()
        .set('start', start)
        .set('count', count)
    });
  }

  searchCourses(searchQuery = ''): Observable<ICourse[]> {
    return this._http.get<ICourse[]>('courses', {
      params: new HttpParams().set('textFragment', searchQuery)
    });
  }

  addCourse(course: ICourse): void {
    this._courses.push(course);
  }

  getCourse(id: string): ICourse | undefined {
    return this._courses.find((course) => course.id === id);
  }

  updateCourse(id: string, data: CourseUpdate): void {
    const target = this._courses.find((course) => course.id === id);
    Object.assign(target, data);
  }

  deleteCourse(id: string): Observable<any> {
    return this._http.delete(`courses/${id}`);
  }
}
