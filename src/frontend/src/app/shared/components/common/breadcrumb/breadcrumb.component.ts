import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from '@app/service/breadcrumb.service';
import { filter } from 'rxjs/operators';
import { environment } from '@env';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  static ROUTE_DATA_BREADCRUMB: any;
  public breadcrumbItems: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      console.clear();

      this.breadcrumbItems = this.breadcrumbService.createBreadcrumbs(this.activatedRoute.root, this.router.url);
      let currentPage: any = null;

      if (this.breadcrumbItems){
        currentPage = this.breadcrumbItems[this.breadcrumbItems.length - 1];
      }

      console.log('--------',JSON.stringify(this.breadcrumbItems));

      //this.titleService.setTitle(`${currentPage ? currentPage.title + ' | ' : ''}${environment.appName}`);
    });
  }

  ngOnInit(): void {}
}
