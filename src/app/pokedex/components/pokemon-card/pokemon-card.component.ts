import { Component, Input, OnInit  } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() Pokemon !: string;
  @Input() Dex !: number;
  Shiny: boolean = false;

  shiny():void{
    this.Shiny = !this.Shiny;
  }
}
