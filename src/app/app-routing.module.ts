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
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'courses/new', component: AddCourseComponent, canActivate: [AuthGuard] },
  { path: 'courses/:courseId', component: CourseComponent, canActivate: [AuthGuard] },
  { path: 'courses/:courseId/edit', component: EditCourseComponent, canActivate: [AuthGuard] },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
