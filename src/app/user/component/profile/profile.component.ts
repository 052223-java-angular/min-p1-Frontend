import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/models/User';
import { BuildComponent } from '../build/build.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!: User;

  constructor(private userService: UserService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      this.user = res;
    });

  }

  newBuild() {
    const dialogRef = this.dialog.open(BuildComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
