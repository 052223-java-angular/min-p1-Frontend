import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamService } from '../../service/team.service';
import { MatDialog } from '@angular/material/dialog';
import { TeamComponent } from '../team/team.component';

@Component({
  selector: 'app-team-cards',
  templateUrl: './team-cards.component.html',
  styleUrls: ['./team-cards.component.css']
})
export class TeamCardsComponent {
  @Input() teams: any;
  @Output("getTeams") getTeams: EventEmitter<any> = new EventEmitter();
  constructor(private teamService: TeamService, private dialog: MatDialog) { }

  view(): void {
    const dialogRef = this.dialog.open(TeamComponent, {
      data: this.teams,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTeams.emit();
      console.log('The dialog was closed');

    });

  }
  deleteTeam() {

  }

}
