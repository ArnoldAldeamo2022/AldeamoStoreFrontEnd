import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { CartService } from 'src/app/services/cart.service';
import { Cart} from './../../../models/cart.module';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from './../../../models/cart.module';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart = { items: [] };
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  dataSource: CartItem[] = [];
  cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  //con este metodo vamops recorriendo todos los elementos y tomando su precio y la cantidad del producto y luego se agrega para que podamos usar reducir el valor anterior del actual
  getTotal (items: Array<CartItem>): number{

    return this.cartService.getTotal(items);
    }

    onClearCart():void{
this.cartService.clearCart();
    }

    onRemoveFromCart (item: CartItem): void{
      this.cartService.removeFromCart(item);

    }

    onAddQuantity(item: CartItem): void{
      this.cartService.addToCart(item);
    }

   onRemoveQuantity(item: CartItem): void{
    this.cartService.removeQuantity(item);
   }
   onCheckout(): void{
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
   }).subscribe(async (res: any) => {
    let stripe = await loadStripe('pk_test_51MBMUKAUExIrQPR6lkNxl7znAEbjd8XkgjfXW3uVudANA89LAozQhYaBWct0wBnoa702nPCmRuond5QelVHAlbz800PuVgGgQX');
    stripe?.redirectToCheckout({
      sessionId: res.id,
    })
  });
}
ngOnDestroy() {
  if (this.cartSubscription) {
    this.cartSubscription.unsubscribe();
  }
}
}
