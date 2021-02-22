import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ICourse } from '../shared/models/course.model';
import { CoursesService } from '../services/courses/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoursesComponent implements OnInit {
  searchQuery = '';
  courses: ICourse[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.courses = this.coursesService.getCourses();
  }

  onSearch(): void {
    console.log(this.searchQuery);
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
