import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonInfoComponent } from './pokedex/components/pokemon-info/pokemon-info.component';

const routes: Routes = [
  {
    path:'pokemon',
    children:[
      {path: ':dex', component: PokemonInfoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
