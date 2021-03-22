import {
  Injectable
} from '@angular/core';
import {
  ActivatedRoute,
} from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/common/breadcrumb/breadcrumb.component';

export interface IBreadCrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  public createBreadcrumbs(route: ActivatedRoute, currentRoute: any = null, url: string = '', breadcrumbs: any[] = []) {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    console.log(children);
    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const isActive = url === currentRoute;

      if (child.snapshot.data && child.snapshot.data.breadcrumb){
        const title = child.snapshot.data.breadcrumb.title;

        console.log(title);
        if (title !== undefined && title && !breadcrumbs.some(crumb => crumb.title === title)) {
          breadcrumbs.push({title, url, isActive});
        }
      }

      return this.createBreadcrumbs(child, currentRoute, url, breadcrumbs);
    }
  }
}
