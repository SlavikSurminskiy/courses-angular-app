import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICourse } from '../shared/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() course: ICourse = {
    id: '',
    title: '',
    creationDate: '',
    duration: 0,
    description: '',
  };

  @Output() edit: EventEmitter<string> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

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
