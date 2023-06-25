import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/models/User';
import { BuildComponent } from '../build/build.component';
import { MatDialog } from '@angular/material/dialog';
import { BuildService } from '../../service/build.service';
import { TeamComponent } from '../team/team.component';
import { take } from 'rxjs';
import { TeamService } from '../../service/team.service';
import { SignatureComponent } from '../signature/signature.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!: User;
  builds: any[] = [];
  teams: any[] = [];
  constructor(private userService: UserService, private buildService: BuildService, private teamService: TeamService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.getUser();
    this.getBuilds();
    this.getTeams();

  }
  getUser() {
    this.userService.getUser().pipe(take(1)).subscribe({
      next: res => {
        this.user = res;
      },
      error: error => {
        console.log("failed")
      }
    });
  }

  getBuilds() {
    this.buildService.getBuilds().pipe(take(1)).subscribe({
      next: res => {
        this.builds = res;
      },
      error: error => {
        console.log("failed")
      }
    })
  }

  getTeams() {
    this.teamService.getTeams().pipe(take(1)).subscribe({
      next: res => {
        this.teams = res;
      },
      error: error => {
        console.log("failed")
      }
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
      this.getTeams();
    });
  }

  editSignature() {
    const dialogRef = this.dialog.open(SignatureComponent, {
      data: this.user.signature,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUser();
    });
  }


}
