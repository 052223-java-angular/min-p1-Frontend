import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamService } from '../../service/team.service';
import { MatDialog } from '@angular/material/dialog';
import { TeamComponent } from '../team/team.component';
import { DeleteTeamPayLoad } from 'src/app/models/DeleteTeamPayload';
import { take } from 'rxjs';
import { BuildService } from '../../service/build.service';
import { PopupComponent } from 'src/app/utility/component/popup/popup.component';

@Component({
  selector: 'app-team-cards',
  templateUrl: './team-cards.component.html',
  styleUrls: ['./team-cards.component.css']
})
export class TeamCardsComponent {
  dexes: string[] = [];
  buildList: any = {};
  @Input() team: any;
  @Input() builds: any;
  @Output("getTeams") getTeams: EventEmitter<any> = new EventEmitter();
  public pokemonList: { [index: string]: string } = this.buildService.pokemonList;

  constructor(private teamService: TeamService, private buildService: BuildService, private dialog: MatDialog,) { }
  ngOnInit(): void {
    this.builds.forEach((build: any) => {
      this.buildList[build.id] = build.pokemon;
    })
    this.team.builds.forEach((build: any) => {
      this.dexes.push(this.pokemonList[this.buildList[build.id]])
    })
  }


  view(): void {
    const dialogRef = this.dialog.open(TeamComponent, {
      data: this.team,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTeams.emit();
      console.log('The dialog was closed');

    });

  }
  deleteTeam() {
    const payload: DeleteTeamPayLoad = {
      userId: sessionStorage.getItem('id') || '',
      teamId: this.team.id
    };

    this.teamService.deleteTeam(payload).pipe(take(1)).subscribe({
      next: comment => {
        this.getTeams.emit();
        console.log("success");
        // Handle the sucsess response
        // TODO: Add code for handling success response
      },
      error: error => {
        console.log("failed");
        const dialogRef = this.dialog.open(PopupComponent, {
          data: error.error.message,
        });;
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })
  }

}
