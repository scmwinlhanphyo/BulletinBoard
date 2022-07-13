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
  public userInfo: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const userLoginData: any = localStorage.getItem('userLoginData') || "";
    const data = JSON.parse(userLoginData);
    this.userInfo = data._id;
    this.name = data.name;
    const payload = {};
    this.userService.findUser(payload, this.userInfo).then((dist) => {
      this.name = dist.data.name;
    })
  }

  public profile() {
    const data: any = localStorage.getItem('userLoginData') || "";
    this.userInfo = JSON.parse(data)._id;
    this.router.navigate(['/profile/' + this.userInfo]);
  }

  public logout() {
    this.authService.logout().then((dist: any) => {
      localStorage.removeItem('userId');
      localStorage.clear();
      this.authService.isLoggedIn();
      this.router.navigateByUrl('/login');
    });
  }

}
