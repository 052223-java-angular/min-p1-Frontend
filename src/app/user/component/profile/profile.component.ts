import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!: User;

  constructor(private userService: UserService) {
    this.userService.getUser().subscribe(res => {
      this.user = res;
    });
  }

  ngOnInit() {


  }
}
