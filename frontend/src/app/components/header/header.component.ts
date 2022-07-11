import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const userID = localStorage.getItem('userId');
    const payload = {};
    this.userService.findUser(payload, userID).then((dist) => {
      // console.log(dist.data.name);
      this.name = dist.data.name;
    })
  }

  public profile() {
    const userID = localStorage.getItem('userId');
    // const userID = userId._id;
    console.log(userID);
    this.router.navigate(['/profile/' + userID]);
  }

  public logout() {
    this.authService.logout().then((dist: any) => {
      localStorage.removeItem('userId');
      this.authService.isLoggedIn();
      this.router.navigateByUrl('/login');
    });
  }

}
