import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Author, CourseUpdate } from '../../shared/models/course.model';
import { noAuthorsValidator } from '../authors-chips/authors-chips.validators';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  @Input() headline = 'New course';
  @Input() title = '';
  @Input() description = '';
  @Input() duration = 0;
  @Input() authors: Author[] | undefined = [];

  @Output() saveCourse = new EventEmitter<CourseUpdate>();

  courseForm: FormGroup | undefined;

  _creationDate = '';

  @Input() set creationDate(value: string) {
    // 2017-09-28T04:39:24+00:00
    this._creationDate = value.split('T')[0];
  }

  get creationDate(): string {
    return this._creationDate;
  }

  ngOnInit(): void {
    this.courseForm = new FormGroup({
      title: new FormControl(this.title, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl(this.description, [
        Validators.required,
        Validators.maxLength(500),
      ]),
      creationDate: new FormControl(this.creationDate, [
        Validators.required,
      ]),
      duration: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      authors: new FormControl(this.authors, noAuthorsValidator()),
    });
  }

  onSubmit(): void {
    const {
      title,
      description,
      creationDate,
      duration,
      authors,
    } = this.courseForm?.getRawValue();

    this.saveCourse.emit({
      name: title,
      duration,
      description,
      date: creationDate,
      topRated: false,
      authors,
    });
  }
}
