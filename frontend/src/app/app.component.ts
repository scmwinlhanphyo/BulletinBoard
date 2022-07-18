import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  public showHeaderFooter = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/' || this.router.url === '/login' || this.router.url === '/signup' ||
        this.router.url === '/forget-password' || this.router.url === '/forget-password-update' || this.router.url === '/forget-password') {
          this.showHeaderFooter = false;
        } else {
          this.showHeaderFooter = true;
        }
        if(this.router.url === '/') {
          this.router.navigate(['post-list']);
        }
      }
    });
  }
}
