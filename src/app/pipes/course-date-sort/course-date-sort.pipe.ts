import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

import { ICourse } from '../../shared/models/course.model';

@Pipe({
  name: 'courseDateSort'
})
export class CourseDateSortPipe implements PipeTransform {

  transform(courses: ICourse[], order: 'new' | 'old' = 'new'): ICourse[] {
    const multiplier = order === 'new' ? -1 : 1;

    courses.sort((a, b) => {
      const d1 = moment(a.creationDate);
      const d2 = moment(b.creationDate);

      if (d1 > d2) {
        return 1 * multiplier;
      }
      if (d1 < d2) {
        return -1 * multiplier;
      }
      return 0;
    });

    return courses;
  }
}
