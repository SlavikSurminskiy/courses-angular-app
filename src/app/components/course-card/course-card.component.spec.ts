import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardComponent } from './course-card.component';

import { CourseDurationPipe } from '../../pipes/course-duration/course-duration.pipe';

import { ICourse } from '../../shared/models/course.model';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CourseCardComponent,
        CourseDurationPipe,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onEditClick should be called when click on button', () => {
    spyOn(component, 'onEditClick');

    const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelectorAll('.actions button')[0];
    button.click();

    expect(component.onEditClick).toHaveBeenCalled();
  });

  it('onDeleteClick should be called when click on button', () => {
    spyOn(component, 'onDeleteClick');

    const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelectorAll('.actions button')[1];
    button.click();

    expect(component.onDeleteClick).toHaveBeenCalled();
  });

  it('should emit course id when click on edit button', () => {
    const comp = new CourseCardComponent();

    const course: ICourse = {
      id: '1',
      name: '',
      creationDate: '',
      duration: 0,
      topRated: false,
      description: '',
    };

    comp.course = course;

    comp.edit.subscribe((id: string) => expect(id).toBe(course.id));
    comp.onEditClick();
  });

  it('should emit course id when click on delete button', () => {
    const comp = new CourseCardComponent();

    const course: ICourse = {
      id: '1',
      name: '',
      creationDate: '',
      duration: 0,
      topRated: false,
      description: '',
    };

    comp.course = course;

    comp.delete.subscribe((id: string) => expect(id).toBe(course.id));
    comp.onDeleteClick();
  });
});
