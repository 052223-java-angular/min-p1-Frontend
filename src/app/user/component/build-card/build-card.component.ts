import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BuildService } from '../../service/build.service';
import { MatDialog } from '@angular/material/dialog';
import { BuildComponent } from '../build/build.component';
import { DeleteBuildPayLoad } from 'src/app/models/DeleteBuildPayload';
import { take } from 'rxjs';
import { PopupComponent } from 'src/app/utility/component/popup/popup.component';

@Component({
  selector: 'app-build-card',
  templateUrl: './build-card.component.html',
  styleUrls: ['./build-card.component.css']
})
export class BuildCardComponent {
  dex: string = '1';

  @Input() builds: any;
  @Output("getBuilds") getBuilds: EventEmitter<any> = new EventEmitter();
  public pokemonList: { [index: string]: string } = this.buildService.pokemonList;

  constructor(private buildService: BuildService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dex = this.pokemonList[this.builds.pokemon]
  }

  view(): void {
    const dialogRef = this.dialog.open(BuildComponent, {
      data: this.builds,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBuilds.emit();
      console.log('The dialog was closed');

    });

  }

  deleteBuild() {
    const payload: DeleteBuildPayLoad = {
      userId: sessionStorage.getItem('id') || '',
      buildId: this.builds.id
    };

    this.buildService.deleteBuild(payload).pipe(take(1)).subscribe({
      next: comment => {
        this.getBuilds.emit();
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
