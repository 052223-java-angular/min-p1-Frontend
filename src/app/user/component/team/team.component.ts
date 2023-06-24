import { Component, Inject } from '@angular/core';
import { BuildService } from '../../service/build.service';
import { TeamService } from '../../service/team.service';
import { take } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BuildCardComponent } from '../build-card/build-card.component';
import { TeamPayload } from 'src/app/models/TeamPayload';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  buildList: any = {};
  picList: string[] = ['', '', '', '', '', '']
  buildListNames: string[] = Object.keys(this.buildList);
  pokemonList = this.buildService.pokemonList;

  payload: TeamPayload = {
    userId: sessionStorage.getItem('id') || '',
    teamId: '',
    name: '',
    description: '',
    builds: ['', '', '', '', '', '']
  }

  constructor(private buildService: BuildService, private teamService: TeamService, public dialogRef: MatDialogRef<BuildCardComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.buildService.getBuilds().pipe(take(1)).subscribe(res => {
      res.forEach(build => this.buildList[build.name] = build);
      this.buildListNames = Object.keys(this.buildList);
    })
  }

  updateTeam(name: string, idx: number) {
    this.picList[idx] = this.pokemonList[this.buildList[name].pokemon];
    this.payload.builds[idx] = this.buildList[name].id;
  }

  newTeam() {
    this.teamService.newTeam(this.payload).pipe(take(1)).subscribe({
      next: comment => {
        console.log("success");
        this.dialogRef.close();
        // Handle the sucsess response
        // TODO: Add code for handling success response
      },
      error: error => {
        console.log("failed");
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })
  }

  editTeam() {
    this.teamService.modifyTeam(this.payload).pipe(take(1)).subscribe({
      next: comment => {
        console.log("success");
        this.dialogRef.close();
        // Handle the sucsess response
        // TODO: Add code for handling success response
      },
      error: error => {
        console.log("failed");
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })
  }
}
