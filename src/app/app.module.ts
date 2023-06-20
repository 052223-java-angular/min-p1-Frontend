import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonCardComponent } from './pokedex/components/pokemon-card/pokemon-card.component';
import { PokedexComponent } from './pokedex/components/pokedex/pokedex.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonInfoComponent } from './pokedex/components/pokemon-info/pokemon-info.component';
import { DropdownComponent } from './utility/dropdown/dropdown.component';
import { LoginComponent } from './user/component/login/login.component';
import { RegisterComponent } from './user/component/register/register.component';
import { ProfileComponent } from './user/component/profile/profile.component';
import { PostsComponent } from './user/component/posts/posts.component';
import { PostComponent } from './user/component/post/post.component';
import { BuildComponent } from './user/component/build/build.component';
import { TeamComponent } from './user/component/team/team.component';
import { PostCardComponent } from './user/component/post-card/post-card.component';
import { CommentCardComponent } from './user/component/comment-card/comment-card.component';
import { BuildCardsComponent } from './user/component/build-cards/build-cards.component';
import { TeamCardsComponent } from './user/component/team-cards/team-cards.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonCardComponent,
    PokedexComponent,
    PokemonInfoComponent,
    DropdownComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PostsComponent,
    PostComponent,
    BuildComponent,
    TeamComponent,
    PostCardComponent,
    CommentCardComponent,
    BuildCardsComponent,
    TeamCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
