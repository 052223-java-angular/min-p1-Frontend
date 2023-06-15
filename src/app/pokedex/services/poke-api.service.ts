import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {
  baseurl = "https://pokeapi.co/api/v2/";
  constructor(private http: HttpClient) { }


  getPokemonSpecies(){
    return this.http.get(`${this.baseurl}pokemon-species/?limit=1020`)
  }

  getPokemonByDex(dex:string){
    return this.http.get(`${this.baseurl}pokemon/${dex}`)
  }
  
  getPokemonSpeciesByDex(dex:string){
    return this.http.get(`${this.baseurl}pokemon-species/${dex}`)
  }

  getEvolutionChain(url:string){
    return this.http.get(url);
  }
}