import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  public logout() {
    this.authService.logout().then((dist: any) => {
      localStorage.removeItem('userId');
      this.authService.isLoggedIn();
      this.router.navigateByUrl('/login');
    });
  }

}
