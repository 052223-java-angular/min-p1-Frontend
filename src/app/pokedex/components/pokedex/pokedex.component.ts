import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../../services/poke-api.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { PopupComponent } from 'src/app/utility/component/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
  providers: [PokeAPIService]
})
export class PokedexComponent implements OnInit {
  constructor(private pokeAPIservice: PokeAPIService, private router: Router, private dialog: MatDialog) { };

  pokemonList: any;
  getPokemonList(): void {
    this.pokeAPIservice.getPokemonSpecies().pipe(take(1)).subscribe({
      next: data => {
        this.pokemonList = data
      },
      error: error => {
        console.log("failed");
        const dialogRef = this.dialog.open(PopupComponent, {
          data: error.error.message,
        });;
      }
    });
  }

  ngOnInit() {
    this.getPokemonList();
  }

};

