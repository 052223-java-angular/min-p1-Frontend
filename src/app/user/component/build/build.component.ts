import { Component, Inject } from '@angular/core';
import { BuildPayload } from 'src/app/models/BuildPayload';
import { PokeAPIService } from 'src/app/pokedex/services/poke-api.service';
import { BuildService } from '../../service/build.service';
import { BuildCardComponent } from '../build-card/build-card.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModifyBuildPayload } from 'src/app/models/ModifyBuildPayload';
import { take } from 'rxjs';


@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css'],
})
export class BuildComponent {
  public option: any;
  public dex: string = "1";
  public pokemon: any = {};
  public pokemonList: { [index: string]: string } = this.buildService.pokemonList;
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
    buildId: '',
    name: '',
    pokemonName: '',
    natureName: '',
    abilityName: '',
    description: '',
    learnedMoves: ['', '', '', '']
  }
  constructor(private pokeAPIservice: PokeAPIService, private buildService: BuildService, public dialogRef: MatDialogRef<BuildCardComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.payload.description = data.description;
      this.payload.buildId = data.id;
      this.payload.name = data.name
      this.payload.pokemonName = data.pokemon;
      this.payload.abilityName = data.ability;
      this.payload.natureName = data.nature;
      this.payload.learnedMoves[0] = data.moves[0].name;
      this.payload.learnedMoves[1] = data.moves[1].name;
      this.payload.learnedMoves[2] = data.moves[2].name;
      this.payload.learnedMoves[3] = data.moves[3].name;
      this.dex = this.pokemonList[data.pokemon];
    }
  }


  getPokemon(dex: string): void {
    this.pokeAPIservice.getPokemonByDex(dex).pipe(take(1)).subscribe(
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
    this.payload.natureName = nature;
  }

  changeAbility(ability: string) {
    this.payload.abilityName = ability;
  }

  changeMoveOne(move: string) {
    this.payload.learnedMoves[0] = move;
  }

  changeMoveTwo(move: string) {
    this.payload.learnedMoves[1] = move;
  }

  changeMoveThree(move: string) {
    this.payload.learnedMoves[2] = move;
  }

  changeMoveFour(move: string) {
    this.payload.learnedMoves[3] = move;
  }


  newBuild() {
    this.buildService.newBuild(this.payload).pipe(take(1)).subscribe({
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

  editBuild() {
    this.buildService.modifyBuild(this.payload).pipe(take(1)).subscribe({
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
