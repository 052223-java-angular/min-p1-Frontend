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
    this.pokeAPIservice.getPokemonSpeciesByDex(dex).subscribe(data => {
      this.pokemonSpecie = data
      this.getEvolutionChain(this.pokemonSpecie.evolution_chain.url);
    });
  }

  getEvolutionChain(url : string): void {
    this.pokeAPIservice.getEvolutionChain(url).subscribe(data =>{
      this.evolutionChain = data;
      this.getEvolutionFamily(this.evolutionChain.url);
    });
  }

  getEvolutionFamily(url : string): void {
    this.evolutionFamily.push(
      parseInt(
        this.evolutionChain.chain.species.url.slice(
          this.evolutionChain.chain.species.url.lastIndexOf(
            "/",this.evolutionChain.chain.species.url.length - 2
          ) + 1
        )
      )
    );

    if (this.evolutionChain.chain.evolves_to.length > 0) {
      this.evolutionChain.chain.evolves_to.forEach(
        (ele: { species: { 
          url: string }; 
          evolves_to: [] 
        }) => {
          this.evolutionFamily.push(parseInt(ele.species.url.slice(ele.species.url.lastIndexOf("/",ele.species.url.length - 2) + 1)));
          if (ele.evolves_to.length > 0) {
            ele.evolves_to.forEach(
              (ele: {
                  species: { url: string };
                  evolves_to: [];
              }) => {
                this.evolutionFamily.push(parseInt(ele.species.url.slice(ele.species.url.lastIndexOf("/",ele.species.url.length - 2) + 1)));
                if (ele.evolves_to.length > 0) {
                  ele.evolves_to.forEach(
                    (ele: { 
                      species: { url: string } 
                    }) =>
                        this.evolutionFamily.push(parseInt(ele.species.url.slice(ele.species.url.lastIndexOf("/",ele.species.url.length - 2) + 1)))
                  );
                }
              }
            );
          }
        }
      );
    }

    console.log(this.evolutionFamily)
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.dex = params['dex']; 
    });
    this.getPokemon(this.dex);
    this.getPokemonSpecie(this.dex);
  }
}
