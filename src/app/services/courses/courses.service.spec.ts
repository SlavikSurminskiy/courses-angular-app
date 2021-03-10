import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { COURSES } from './mock-courses';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return courses', () => {
    expect(service.getCourses()).toEqual(COURSES);
  });
});
