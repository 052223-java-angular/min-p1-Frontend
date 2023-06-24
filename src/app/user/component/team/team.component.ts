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
  nameMap: any = {};
  picList: string[] = ['', '', '', '', '', '']
  buildListNames: string[] = [];
  pokemonList = this.buildService.pokemonList;

  payload: TeamPayload = {
    userId: sessionStorage.getItem('id') || '',
    teamId: '',
    name: '',
    description: '',
    builds: []
  }

  constructor(private buildService: BuildService, private teamService: TeamService, public dialogRef: MatDialogRef<BuildCardComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.payload.description = data.description;
      this.payload.teamId = data.id;
      this.payload.name = data.name
      for (let i = 0; i < data.builds.length; i++) {
        this.payload.builds[i] = data.builds[i].id
      }


    }

    this.buildService.getBuilds().pipe(take(1)).subscribe(res => {
      res.forEach(build => {
        this.buildList[build.id] = build
        this.nameMap[build.id] = build.name
        this.buildListNames.push(build.id)
      });

      if (data) {
        for (let i = 0; i < data.builds.length; i++) {
          this.picList[i] = this.pokemonList[this.buildList[this.data.builds[i].id].pokemon]
        }
      }
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
    console.log((this.payload))
    this.teamService.modifyTeam(this.payload).pipe(take(1)).subscribe({
      next: comment => {
        console.log("success");
        this.dialogRef.close();

      },
      error: error => {
        console.log("failed");

      }
    })
  }
}
