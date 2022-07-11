import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileImage:any;
  userData: any;

  public name! : string;
  public email! : string;
  public type! : string;
  public dob! : string;
  public address! :string;
  public phone! :string;
  public profile! : string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.params['id'];

    const payload = {};
    this.userService.findUser(payload, id).then((dist) => {
      this.userData = dist.data;
      console.log(dist.data);
      if (this.userData) {
        this.name = this.userData.name;
        this.email = this.userData.email;
        this.phone = this.userData.phone;
        this.address = this.userData.address;
        this.type = this.userData.type;
        this.dob = this.userData.dob;
        this.profileImage = 'http://localhost:5000/' + this.userData.profile;
      }
    })
  }

  /**
   * edit profile.
   */
  public editProfile = () => {
    const userID = localStorage.getItem('userId');
    this.router.navigate(["profile-edit/", userID]);
  }
}
