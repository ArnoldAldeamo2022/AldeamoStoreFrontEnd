import { CartComponent } from './components/pages/cart/cart.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},

{
  path: 'cart',
  component: CartComponent
},

{
path: '', redirectTo: 'home', pathMatch: 'full' //esto me hace que por ejemplo en coloco localhost:4200 me redirige siempre a la pagina HOME
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
