import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../../shared/models/course.model';

@Pipe({
  name: 'coursesFilter'
})
export class CoursesFilterPipe implements PipeTransform {

  transform(courses: ICourse[], search: string): ICourse[] {
    if (search.trim() === '') {
      return courses;
    }

    return courses.filter((course) => {
      return course.title.toLowerCase().includes(search.toLowerCase());
    });
  }
}
