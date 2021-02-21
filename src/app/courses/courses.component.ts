import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoursesComponent implements OnInit {
  searchQuery = '';

  constructor() {}

  ngOnInit(): void {}

  onSearch(): void {
    console.log(this.searchQuery);
  }
}
