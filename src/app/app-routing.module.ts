import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PokemonBatleComponent } from './pokemon-batle/pokemon-batle.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'plantilla',
    component:HeaderComponent
  },
  {
    path:'Galery',
    component:PokemonBatleComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
