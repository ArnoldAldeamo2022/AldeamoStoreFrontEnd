import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.module';

@Component({
  selector: 'app-root',
  template:
    '<app-header [cart]="cart"></app-header> <router-outlet></router-outlet> <app-footer></app-footer>', //agrego el enrutador de salida router oulet para que me muestre mi header y mi pagina home juntos automaticamente al ir a la URL http://localhost:4200/ me lo enruta a http://localhost:4200/home
  styles: [],
})
export class AppComponent implements OnInit {
  cart: Cart = { items: [] };

  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
