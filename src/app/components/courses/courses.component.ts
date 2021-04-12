import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ICourse } from '../../shared/models/course.model';
import { CoursesService } from '../../services/courses/courses.service';

import { DeleteCourseDialogComponent } from '../delete-course-dialog/delete-course-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoursesComponent implements OnInit {
  searchQuery = '';
  courses: ICourse[] = [];

  private COURSES_PER_PAGE = 10;
  private currentPage = 1;

  constructor(
    private _dialog: MatDialog,
    private _coursesService: CoursesService,
  ) {}

  ngOnInit(): void {
    this._coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  onSearch(): void {
    this._coursesService.searchCourses(this.searchQuery)
      .subscribe((courses) => {
        this.courses = courses;
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
    this.currentPage++;
    const count = (this.currentPage * this.COURSES_PER_PAGE).toString();

    this._coursesService.getCourses({start: '0', count})
      .subscribe((courses) => {
        this.courses = courses;
      });
  }
}
