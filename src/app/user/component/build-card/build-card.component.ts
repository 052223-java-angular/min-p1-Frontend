import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BuildService } from '../../service/build.service';
import { MatDialog } from '@angular/material/dialog';
import { BuildComponent } from '../build/build.component';
import { DeleteBuildPayLoad } from 'src/app/models/DeleteBuildPayload';
import { take } from 'rxjs';

@Component({
  selector: 'app-build-card',
  templateUrl: './build-card.component.html',
  styleUrls: ['./build-card.component.css']
})
export class BuildCardComponent {
  dex: string = '1';

  @Input() builds: any;
  @Output("getBuilds") geBuilds: EventEmitter<any> = new EventEmitter();
  public pokemonList: { [index: string]: string } = this.buildServic.pokemonList;

  constructor(private buildServic: BuildService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dex = this.pokemonList[this.builds.pokemon]
  }

  view(): void {
    const dialogRef = this.dialog.open(BuildComponent, {
      data: this.builds,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.geBuilds.emit();
      console.log('The dialog was closed');

    });

  }

  deleteBuild() {
    const payload: DeleteBuildPayLoad = {
      userId: sessionStorage.getItem('id') || '',
      buildId: this.builds.id
    };

    this.buildServic.deleteBuild(payload).pipe(take(1)).subscribe({
      next: comment => {
        this.geBuilds.emit();
        console.log("success");
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
