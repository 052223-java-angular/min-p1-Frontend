import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BuildService } from '../../service/build.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  public options: string[] = [
    "pokedex",
    `user/${sessionStorage.getItem('username')}`,
    `posts`,
    `login`,
    `registration`
  ]

  public pokemonList = this.buildService.pokemonList;

  constructor(private router: Router, private buildService: BuildService) {
    for (let pokemon in this.pokemonList) {
      this.options.push(pokemon)
    }
  }
  navTo(destination: string) {
    if (destination in this.pokemonList) {
      this.router.navigate([`/pokemon/${this.pokemonList[destination]}`])
    } else {
      this.router.navigate([`/${destination}`])
    }

  }
}
