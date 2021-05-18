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

    for (const child of children) {
      console.log(child.snapshot.data);
      console.log(child.url, currentRoute);

      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      if (child.snapshot.data.breadcrumbs){
        breadcrumbs = child.snapshot.data.breadcrumbs.map(function(breadcrumb){
          //console.log(url, currentRoute, child.snapshot.url.join('/'));
          console.log(child.snapshot.url.map(segment => segment.path).join('/'));
          return Object.assign(breadcrumb, {
            isActive: child.snapshot.url.join('/') === currentRoute
          });
        });
      }

      return this.createBreadcrumbs(child, currentRoute, url, breadcrumbs);
    }

      // if (child.snapshot.data){
      //   const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      //   if (routeURL !== '') {
      //     url += `/${routeURL}`;
      //   }

      //   console.log(routeURL.indexOf(`/${child.snapshot.data.rootPath}`));
      //   if (routeURL.indexOf(`/${child.snapshot.data.rootPath}`) !== -1){
      //     url += `/${child.snapshot.data.rootPath}`;
      //   }

      //   const isActive = url === currentRoute;

      //   if (child.snapshot.data.breadcrumb){
      //     const title = child.snapshot.data.breadcrumb.title;

      //     if (!breadcrumbs.some(crumb => crumb.title == title)) {
      //       breadcrumbs.push({title, url, isActive});
      //     }
      //   }

      //   if (child.snapshot.data.rootPath){
      //     const title = child.snapshot.data.rootTitle;

      //     if (!breadcrumbs.some(crumb => crumb.url == url)) {
      //       console.log(url);
      //       breadcrumbs.push({title, url, isActive});
      //     }
      //   }
      // }



    return breadcrumbs;
  }
}
