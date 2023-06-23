import { Component } from '@angular/core';
import { BuildPayload } from 'src/app/models/BuildPayload';
import { PokeAPIService } from 'src/app/pokedex/services/poke-api.service';
import { BuildService } from '../../service/build.service';
import { BuildCardComponent } from '../build-card/build-card.component';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css'],
})
export class BuildComponent {
  public buildName: string = "";
  public buildDescription: string = "";
  public option: any;
  public dex: string = "1";
  public pokemon: any = {};
  public pokemonList: { [index: string]: string } = this.buildServic.pokemonList;
  public nameList = Object.keys(this.pokemonList)
  public natureList = [
    'Hardy',
    'Lonely',
    'Brave',
    'Adamant',
    'Naughty',
    'Bold',
    'Docile',
    'Relaxed',
    'Impish',
    'Lax',
    'Timid',
    'Hasty',
    'Serious',
    'Jolly',
    'Naive',
    'Modest',
    'Mild',
    'Quiet',
    'Bashful',
    'Rash',
    'Calm',
    'Gentle',
    'Sassy',
    'Careful',
    'Quirky'
  ];
  public abilityList = [];
  public moveList = [];

  payload: BuildPayload = {
    userId: sessionStorage.getItem('id') || '',
    name: '',
    pokemonName: '',
    natureName: '',
    abilityName: '',
    description: '',
    learnedMoves: ['', '', '', '']
  }
  constructor(private pokeAPIservice: PokeAPIService, private buildServic: BuildService, public dialogRef: MatDialogRef<BuildCardComponent>) { }


  getPokemon(dex: string): void {
    this.pokeAPIservice.getPokemonByDex(dex).subscribe(
      data => {
        this.pokemon = data;
        this.abilityList = this.pokemon.abilities.map((ability: { ability: any; }) => ability.ability.name);
        this.moveList = this.pokemon.moves.map((move: { move: any; }) => move.move.name);
      }
    );
  }

  changeInfo(name: string) {
    this.payload.pokemonName = name;
    this.dex = this.pokemonList[name];
    this.getPokemon(this.dex);
  }

  changeNature(nature: string) {
    this.payload.natureName = nature.replace('-', ' ');
  }

  changeAbility(ability: string) {
    this.payload.abilityName = ability.replace('-', ' ');
  }

  changeMoveOne(move: string) {
    this.payload.learnedMoves[0] = move.replace('-', ' ');
  }

  changeMoveTwo(move: string) {
    this.payload.learnedMoves[1] = move.replace('-', ' ');
  }

  changeMoveThree(move: string) {
    this.payload.learnedMoves[2] = move.replace('-', ' ');
  }

  changeMoveFour(move: string) {
    this.payload.learnedMoves[3] = move.replace('-', ' ');
  }


  save() {
    this.payload.name = this.buildName;
    this.payload.description = this.buildDescription;
    this.buildServic.newBuild(this.payload).subscribe({
      next: comment => {
        console.log("success");
        this.dialogRef.close();
        // Handle the sucsess response
        // TODO: Add code for handling success response
      },
      error: error => {
        console.log("failed");
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })
  }
}
