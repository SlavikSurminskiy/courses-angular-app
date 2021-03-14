import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import * as moment from 'moment';

@Directive({
  selector: '[appCourseCardCreationDate]'
})
export class CourseCardCreationDateDirective implements OnInit {
  @Input() appCourseCardCreationDate = '';

  constructor(
    private _elemRef: ElementRef,
    private _renderer: Renderer2,
  ) {}

  private COURSE_COLORS: any = {
    FRESH: {
      color: '#0f0',
      range: [-14, -1],
    },
    UPCOMING: {
      color: '#00f',
      range: [1, Infinity],
    },
    DEFAULT: {
      color: 'transparent',
      range: [-Infinity, Infinity],
    },
  };

  ngOnInit(): void {
    const borderColor = this.getCourseBorderColor();

    this._renderer.setStyle(
      this._elemRef.nativeElement,
      'border', `2px solid ${borderColor}`
    );
  }

  private getCourseBorderColor(): string {
    const diff = this.getDiffInDays();

    for (const color in this.COURSE_COLORS) {
      if (this.COURSE_COLORS.hasOwnProperty(color)) {
        const [start, end] = this.COURSE_COLORS[color].range;

        if (diff >= start && diff <= end) {
          return this.COURSE_COLORS[color].color;
        }
      }
    }

    return this.COURSE_COLORS.DEFAULT.color;
  }

  private getDiffInDays(): number {
    return moment(this.appCourseCardCreationDate).diff(moment(), 'days');
  }
}
