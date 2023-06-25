import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../../services/poke-api.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
  providers: [PokeAPIService]
})
export class PokedexComponent implements OnInit {
  constructor(private pokeAPIservice: PokeAPIService, private router: Router) { };

  pokemonList: any;
  getPokemonList(): void {
    this.pokeAPIservice.getPokemonSpecies().pipe(take(1)).subscribe(data => this.pokemonList = data);
  }

  ngOnInit() {
    this.getPokemonList();
  }

};

