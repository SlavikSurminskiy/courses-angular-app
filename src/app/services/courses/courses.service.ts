import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICourse, CourseUpdate } from '../../shared/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

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

  addCourse(course: ICourse): Observable<any> {
    return this._http.post('courses', {...course});
  }

  getCourse(id: string): Observable<ICourse> {
    return this._http.get<ICourse>(`courses/${id}`);
  }

  updateCourse(id: string, data: CourseUpdate): Observable<ICourse> {
    return this._http.patch<ICourse>(`courses/${id}`, {...data });
  }

  deleteCourse(id: string): Observable<any> {
    return this._http.delete(`courses/${id}`);
  }
}
