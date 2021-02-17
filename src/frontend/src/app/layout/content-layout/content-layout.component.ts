import {
  Component,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit,
  OnInit
} from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit {
  // top loading bar state
  public loading = false;

  constructor(
    private router: Router,
  ) {
    // navigation subscriber
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  // /**
  //  * Get routed page
  //  */
  // public getRouteAnimation(outlet: RouterOutlet) {
  //   const res =
  //     outlet.activatedRouteData.num === undefined ?
  //     -1 :
  //     outlet.activatedRouteData.num;

  //   return res;
  // }

  ngAfterViewInit() {

  }

  ngOnInit() {
  }
}
