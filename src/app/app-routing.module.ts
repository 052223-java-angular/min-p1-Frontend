import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonInfoComponent } from './pokedex/components/pokemon-info/pokemon-info.component';
import { PokedexComponent } from './pokedex/components/pokedex/pokedex.component';

const routes: Routes = [
  {
    path:'pokemon',
    children:[
      {path: ':dex', component: PokemonInfoComponent}
    ]
  },
  {
    path:'pokedex', component:PokedexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
