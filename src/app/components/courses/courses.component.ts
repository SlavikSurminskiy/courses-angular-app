import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ICourse } from '../../shared/models/course.model';
import { CoursesService } from '../../services/courses/courses.service';
import { CoursesFilterPipe } from '../../pipes/courses-filter/courses-filter.pipe';

import { DeleteCourseDialogComponent } from '../delete-course-dialog/delete-course-dialog.component';

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
    private _dialog: MatDialog,
    private _coursesService: CoursesService,
    private _courseFilter: CoursesFilterPipe,
  ) {}

  ngOnInit(): void {
    this._coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  onSearch(): void {
    this._coursesService.getCourses().subscribe((courses) => {
      this.courses = this._courseFilter.transform(courses, this.searchQuery);
    });
  }

  onEdit(courseId: string): void {
    console.log(courseId);
  }

  onDelete(courseId: string): void {
    const course = this._coursesService.getCourse(courseId);

    this._dialog.open(DeleteCourseDialogComponent, {
      minWidth: 500,
      data: {...course},
    }).afterClosed().subscribe((deleteCourse: boolean) => {
      if (deleteCourse) {
        this._coursesService.deleteCourse(courseId);
        this._coursesService.getCourses().subscribe((courses) => {
          this.courses = courses;
        });
      }
    });
  }

  onLoadMore(): void {
    console.log('call load more');
  }
}
