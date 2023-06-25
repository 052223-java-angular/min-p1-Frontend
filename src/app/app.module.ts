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
import { BuildCardComponent } from './user/component/build-card/build-card.component';
import { TeamComponent } from './user/component/team/team.component';
import { PostCardComponent } from './user/component/post-card/post-card.component';
import { CommentCardComponent } from './user/component/comment-card/comment-card.component';
import { BuildComponent } from './user/component/build/build.component';
import { TeamCardsComponent } from './user/component/team-cards/team-cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteComponent } from './utility/auto-complete/auto-complete.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SignatureComponent } from './user/component/signature/signature.component';
import { PostFormComponent } from './user/component/post-form/post-form.component';
import { CommentFormComponent } from './user/component/comment-form/comment-form.component';
import { NavigationComponent } from './user/component/navigation/navigation.component';
import { PopupComponent } from './utility/component/popup/popup.component';
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
    BuildCardComponent,
    TeamComponent,
    PostCardComponent,
    CommentCardComponent,
    BuildComponent,
    TeamCardsComponent,
    SignatureComponent,
    PostFormComponent,
    CommentFormComponent,
    NavigationComponent,
    PopupComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AutoCompleteComponent,
    FormsModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
