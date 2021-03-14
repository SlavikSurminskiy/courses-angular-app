import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICourse } from '../../shared/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() course: ICourse = {
    id: '',
    title: '',
    creationDate: '',
    duration: 0,
    topRated: false,
    description: '',
  };

  @Output() edit: EventEmitter<string> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();

  get courseDuration(): string {
    const { duration } = this.course;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}h ${minutes}min`;
  }

  onEditClick(): void {
    this.edit.emit(this.course.id);
  }

  onDeleteClick(): void {
    this.delete.emit(this.course.id);
  }
}
