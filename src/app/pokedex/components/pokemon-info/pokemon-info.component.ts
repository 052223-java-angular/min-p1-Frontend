import { Component, SimpleChanges } from '@angular/core';
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
  public forms: any = [];

  constructor(private activatedRoute: ActivatedRoute, private pokeAPIservice:PokeAPIService) { }

  getPokemon(dex : string): void {
    this.pokeAPIservice.getPokemonByDex(dex).subscribe(data => this.pokemon = data);
  }

  getPokemonSpecie(dex : string): void {
    this.pokeAPIservice.getPokemonSpeciesByDex(dex).subscribe(data => {
      this.pokemonSpecie = data
      this.getEvolutionChain(this.pokemonSpecie.evolution_chain.url);
      this.getForms();
    });
  }

  getEvolutionChain(url : string): void {
    this.pokeAPIservice.getEvolutionChain(url).subscribe(data =>{
      this.evolutionChain = data;
      this.evolutionFamily.push({
        dex : this.parseUrlForDex(this.evolutionChain.chain.species.url), 
        name : this.evolutionChain.chain.species.name});
      this.getEvolutionFamily(this.evolutionChain.chain.evolves_to);
    });
  }

  getEvolutionFamily(family:any): void{
    for(let pokemon of family){
      let url:string = pokemon.species.url
      this.evolutionFamily.push({
        dex : this.parseUrlForDex(url), 
        name : pokemon.species.name
      });
      this.getEvolutionFamily(pokemon.evolves_to);
    }
  }

  parseUrlForDex(url:string){
    return parseInt(
      url.slice(
        url.lastIndexOf(
          "/",
          url.length - 2
        ) + 1
      )
    )
  }

  getForms(): void{
    for(let form of this.pokemonSpecie.varieties){
      this.forms.push({
        dex : this.parseUrlForDex(form.pokemon.url),
        name : form.pokemon.name
      })
    }
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.dex = params['dex'];
      this.evolutionFamily = [];
      this.forms = [];
      this.getPokemon(this.dex);
      this.getPokemonSpecie(this.dex);
    });
    
  }

}
