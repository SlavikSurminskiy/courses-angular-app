import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { APIInterceptor } from './api/api.interceptor';

import { LogoComponent } from './components/logo/logo.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DeleteCourseDialogComponent } from './components/delete-course-dialog/delete-course-dialog.component';

// directives
import { CourseCardCreationDateDirective } from './directives/course-card/course-card-creation-date.directive';

// pipes
import { CoursesFilterPipe } from './pipes/courses-filter/courses-filter.pipe';
import { CourseDurationPipe } from './pipes/course-duration/course-duration.pipe';
import { CourseDateSortPipe } from './pipes/course-date-sort/course-date-sort.pipe';

// material
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    CourseComponent,
    CoursesComponent,
    AddCourseComponent,
    CourseCardComponent,
    CourseFormComponent,
    EditCourseComponent,
    BreadcrumbsComponent,
    PageNotFoundComponent,
    DeleteCourseDialogComponent,
    CourseCardCreationDateDirective,
    CourseDurationPipe,
    CourseDateSortPipe,
    CoursesFilterPipe,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
