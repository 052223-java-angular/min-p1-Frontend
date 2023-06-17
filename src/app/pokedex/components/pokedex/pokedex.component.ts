import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../../services/poke-api.service';
import { Router } from '@angular/router';

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
    this.pokeAPIservice.getPokemonSpecies().subscribe(data => this.pokemonList = data);
  }

  ngOnInit() {
    if (!sessionStorage.getItem('username')) {
      this.router.navigate(['/login'])
    }
    this.getPokemonList();
  }

};

