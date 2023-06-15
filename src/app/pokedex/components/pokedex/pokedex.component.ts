import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../../services/poke-api.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
  providers: [PokeAPIService]
})
export class PokedexComponent implements OnInit{
  constructor(private pokeAPIservice:PokeAPIService){};

  pokemonList : any;
  getPokemonList(): void {
    this.pokeAPIservice.getPokemonSpecies().subscribe(data => this.pokemonList = data);
  }

  ngOnInit(){
    this.getPokemonList();
  }
  
};

