import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonCardComponent } from './pokedex/components/pokemon-card/pokemon-card.component';
import { PokedexComponent } from './pokedex/components/pokedex/pokedex.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonInfoComponent } from './pokedex/components/pokemon-info/pokemon-info.component';
import { DropdownComponent } from './utility/dropdown/dropdown.component';
import { LoginComponent } from './user/component/login/login.component';
import { RegisterComponent } from './user/component/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonCardComponent,
    PokedexComponent,
    PokemonInfoComponent,
    DropdownComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
