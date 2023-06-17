import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonInfoComponent } from './pokedex/components/pokemon-info/pokemon-info.component';
import { PokedexComponent } from './pokedex/components/pokedex/pokedex.component';
import { RegisterComponent } from './user/component/register/register.component';
import { LoginComponent } from './user/component/login/login.component';
import { ProfileComponent } from './user/component/profile/profile.component';

const routes: Routes = [
  {
    path: 'pokemon',
    children: [
      { path: ':dex', component: PokemonInfoComponent }
    ]
  },
  {
    path: 'pokedex', component: PokedexComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'user',
    children: [
      { path: ':username', component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
