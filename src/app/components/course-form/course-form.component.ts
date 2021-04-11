import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CourseUpdate } from '../../shared/models/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  @Input() headline = 'New course';
  @Input() title = '';
  @Input() description = '';
  @Input() duration = 0;
  @Input() creationDate = '';

  @Output() saveCourse = new EventEmitter<CourseUpdate>();

  onSubmit(): void {
    this.saveCourse.emit({
      name: this.title,
      duration: this.duration,
      description: this.description,
      creationDate: this.creationDate,
      topRated: false,
    });
  }
}
