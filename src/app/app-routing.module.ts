import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'courses',
    canActivate: [AuthGuard],
    data: { breadcrumb: 'BREADCRUMBS.COURSES' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CoursesComponent,
      },
      {
        path: 'new',
        component: AddCourseComponent,
        data: { breadcrumb: 'BREADCRUMBS.NEW' },
      },
      {
        path: ':courseId',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: CourseComponent,
          },
          {
            path: 'edit',
            component: EditCourseComponent,
            data: { breadcrumb: 'BREADCRUMBS.EDIT' },
          }
        ]
      },
    ]
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
