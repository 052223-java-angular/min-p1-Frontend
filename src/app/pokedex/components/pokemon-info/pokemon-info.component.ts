import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeAPIService } from '../../services/poke-api.service';


@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})
export class PokemonInfoComponent {
  public dex: string = "";
  public pokemon: any = {};
  public pokemonSpecie: any = {};
  public evolutionChain: any = {};
  public evolutionFamily: any = [];

  constructor(private activatedRoute: ActivatedRoute, private pokeAPIservice:PokeAPIService) { }

  getPokemon(dex : string): void {
    this.pokeAPIservice.getPokemonByDex(dex).subscribe(data => this.pokemon = data);
  }

  getPokemonSpecie(dex : string): void {
    this.pokeAPIservice.getPokemonSpeciesByDex(dex).subscribe(data => this.pokemonSpecie = data);
  }

  getEvolutionChain(url : string): void {
    this.pokeAPIservice.getEvolutionChain(url).subscribe(data => this.evolutionChain = data);
  }

  getEvolutionFamily(url : string): void {
    this.evolutionFamily.push(this.evolutionChain.chain.species.name);

    if (this.evolutionChain.chain.evolves_to.length > 0) {
      this.evolutionChain.chain.evolves_to.forEach(
        (ele: { species: { name: string }; evolves_to: [] }) => {
          this.evolutionFamily.push(ele.species.name);
          if (ele.evolves_to.length > 0) {
            ele.evolves_to.forEach(
              (ele: {
                  species: { name: string };
                  evolves_to: [];
              }) => {
                this.evolutionFamily.push(ele.species.name);
                if (ele.evolves_to.length > 0) {
                  ele.evolves_to.forEach(
                    (ele: { species: { name: string } }) =>
                        this.evolutionFamily.push(ele.species.name)
                  );
                }
              }
            );
          }
        }
      );
    }
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.dex = params['dex']; 
    });
    this.getPokemon(this.dex);
    this.getPokemonSpecie(this.dex);
    console.log(this.pokemon);
    this.getEvolutionChain(this.pokemonSpecie.evolution_chain.url);

    console.log("hi this is "+this.evolutionFamily);
  }
}
