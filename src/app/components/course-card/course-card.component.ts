import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { ICourse } from '../../shared/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  @Input() course: ICourse = {
    id: '',
    name: '',
    date: '',
    duration: 0,
    topRated: false,
    description: '',
  };

  @Output() edit: EventEmitter<string> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();

  onEditClick(): void {
    this.edit.emit(this.course.id);
  }

  onDeleteClick(): void {
    this.delete.emit(this.course.id);
  }
}
