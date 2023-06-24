import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/models/User';
import { BuildComponent } from '../build/build.component';
import { MatDialog } from '@angular/material/dialog';
import { BuildService } from '../../service/build.service';
import { TeamComponent } from '../team/team.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!: User;
  builds: any[] = [];
  constructor(private userService: UserService, private buildService: BuildService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.userService.getUser().pipe(take(1)).subscribe(res => {
      this.user = res;

    });
    this.getBuilds();

  }

  getBuilds() {
    this.buildService.getBuilds().pipe(take(1)).subscribe(res => {
      this.builds = res;
    })
  }

  newBuild() {
    const dialogRef = this.dialog.open(BuildComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBuilds();
    });
  }

  newTeam() {
    const dialogRef = this.dialog.open(TeamComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');

    });
  }
}
