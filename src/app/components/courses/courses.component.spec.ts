import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { CoursesService } from '../../services/courses/courses.service';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from '../course-card/course-card.component';

import { ICourse } from '../../shared/models/course.model';

const CoursesServiceStub = {
  getCourses(): ICourse[] {
    return [
      {
        id: '01',
        title: 'Video Course 1. Name tag',
        creationDate: '21/02/2020',
        duration: 65,
        description: 'Lorem Ipsum',
      },
      {
        id: '02',
        title: 'Video Course 2. Name tag',
        creationDate: '22/02/2020',
        duration: 65,
        description: 'Lorem Ipsum',
      }
    ];
  }
};

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesComponent, CourseCardComponent],
      providers: [{provide: CoursesService, useValue: CoursesServiceStub}],
      imports: [FormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger courses loading on ngOnInit', () => {
    const coursesService = TestBed.get(CoursesService);
    spyOn(coursesService, 'getCourses');

    component.ngOnInit();

    expect(coursesService.getCourses).toHaveBeenCalled();
  });

  it('should save courses to component state', () => {
    const coursesService = TestBed.get(CoursesService);
    expect(component.courses).toEqual(coursesService.getCourses());
  });

  it('should bind search course input text value to component property',  async () => {
    const [searchInput] = await loader.getAllHarnesses<MatInputHarness>(MatInputHarness.with({
      placeholder: 'Search',
    }));
    await searchInput.setValue('Video Course');

    expect(component.searchQuery).toBe('Video Course');
  });

  it('onSearch should be called when submit form', () => {
    spyOn(component, 'onSearch');

    const form: HTMLFormElement = fixture.debugElement.nativeElement.querySelector('.courses__search form');
    form.dispatchEvent(new Event('submit'));

    expect(component.onSearch).toHaveBeenCalled();
  });

  it('should log search query', () => {
    const spy = spyOn(console, 'log');

    component.searchQuery = 'test_search';
    component.onSearch();

    expect(spy.calls.argsFor(0)[0]).toEqual('test_search');
  });

  it('should subscribe on edit event from children component', () => {
    const spy = spyOn(console, 'log');

    const child = fixture.debugElement.query(By.directive(CourseCardComponent)).componentInstance;
    child.edit.emit('cours_id_for_edit');

    expect(spy.calls.argsFor(0)[0]).toEqual('cours_id_for_edit');
  });

  it('should subscribe on delete event from children component', () => {
    const spy = spyOn(console, 'log');

    const child = fixture.debugElement.query(By.directive(CourseCardComponent)).componentInstance;
    child.delete.emit('cours_id_for_delete');

    expect(spy.calls.argsFor(0)[0]).toEqual('cours_id_for_delete');
  });

  it('onLoadMore should be called when click on button', () => {
    spyOn(component, 'onLoadMore');

    const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('.courses__load-more button');
    button.click();

    expect(component.onLoadMore).toHaveBeenCalled();
  });

  it('onLoadMore should works', () => {
    spyOn(console, 'log');
    component.onLoadMore();

    expect(console.log).toHaveBeenCalled();
  });
});
