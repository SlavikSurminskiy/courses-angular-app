import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { CoursesService } from '../../services/courses/courses.service';
import { IBreadCrumb } from './breadcrumbs.models';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: IBreadCrumb[];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _coursesService: CoursesService,
  ) {
    this.breadcrumbs = this.buildBreadCrumb(this._activatedRoute.root);
  }

  ngOnInit(): void {
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this._activatedRoute.root);
    });
  }

  private buildBreadCrumb(route: ActivatedRoute, url = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {
    let label = route.routeConfig?.data?.breadcrumb || '';
    let path = route.routeConfig?.path || '';

    const lastRoutePart = path.split('/').pop() || '';
    const isDynamicRoute = lastRoutePart.startsWith(':');

    if (isDynamicRoute) {
      const paramName = lastRoutePart.split(':')[1];
      const courseId = route.snapshot.params[paramName];

      path = path.replace(lastRoutePart, courseId);
      label = this._coursesService.getCourse(courseId)?.name;
    }

    const nextUrl = path ? `${url}/${path}` : url;
    const breadcrumb: IBreadCrumb = { label, url: nextUrl };
    const newBreadcrumbs = breadcrumb.label ? [ ...breadcrumbs, breadcrumb ] : [ ...breadcrumbs];

    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }
}
