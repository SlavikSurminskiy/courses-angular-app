import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ICourse } from '../../shared/models/course.model';
import { CoursesService } from '../../services/courses/courses.service';
import { CoursesFilterPipe } from '../../pipes/courses-filter/courses-filter.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CoursesFilterPipe],
})
export class CoursesComponent implements OnInit {
  searchQuery = '';
  courses: ICourse[] = [];

  constructor(
    private coursesService: CoursesService,
    private _courseFilter: CoursesFilterPipe,
  ) {}

  ngOnInit(): void {
    this.courses = this.coursesService.getCourses();
  }

  onSearch(): void {
    const courses = this.coursesService.getCourses();
    this.courses = this._courseFilter.transform(courses, this.searchQuery);
  }

  onEdit(courseId: string): void {
    console.log(courseId);
  }

  onDelete(courseId: string): void {
    console.log(courseId);
  }

  onLoadMore(): void {
    console.log('call load more');
  }
}
