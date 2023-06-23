import { Component, Input } from '@angular/core';
import { BuildService } from '../../service/build.service';
import { MatDialog } from '@angular/material/dialog';
import { BuildComponent } from '../build/build.component';

@Component({
  selector: 'app-build-card',
  templateUrl: './build-card.component.html',
  styleUrls: ['./build-card.component.css']
})
export class BuildCardComponent {
  edit: boolean = false;
  dex: string = '1';
  @Input() builds: any;
  public pokemonList: { [index: string]: string } = this.buildServic.pokemonList;

  constructor(private buildServic: BuildService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dex = this.pokemonList[this.builds.pokemonName]
  }

  view(): void {
    this.edit = true;
    const dialogRef = this.dialog.open(BuildComponent, {
      data: this.builds,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });

  }

}
