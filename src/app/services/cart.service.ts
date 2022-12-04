import { CartItem, Cart} from './../models/cart.module';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open('1 Producto agregado a tu bolsa', 'Ok', { duration: 3000 });
  }

  // metodo remove para bajar la cantidad de productos en el carrito
  removeQuantity(item: CartItem): void{
    let itemForRemoval: CartItem | undefined;
    let filteredItems = this.cart.value.items.map((_item) =>{
      if (_item.id === item.id) {
        _item.quantity--; //aqui se usa la abreviatura del menos menos estamos eliminando la cantidad pero

        if(_item.quantity ===0){
          itemForRemoval = _item;
        }
      }
      return _item
    });

    if (itemForRemoval){
     filteredItems = this.removeFromCart(itemForRemoval, false)
    }

    this.cart.next({items: filteredItems})
    this._snackBar.open('1 producto removido de la bolsa', 'Ok',{
      duration: 3000
    })

  }
    //con este metodo vamops recorriendo todos los elementos y tomando su precio y la cantidad del producto y luego se agrega para que podamos usar reducir el valor anterior del actual
    getTotal (items: Array<CartItem>): number{
      return items.
      map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0) //indicams el valor anterior sumado al actual y se incializa en cero
    }

    clearCart (): void{
      this.cart.next({ items: [] });
      this._snackBar.open('Su bolsa esta vacía. ', 'Ok', {
        duration: 3000
      });
    }

    removeFromCart (item: CartItem, update = true): Array<CartItem>{
      const filteredItems = this.cart.value.items.filter (
        (_item) => _item.id !== item.id
      );


      if(update){
      this.cart.next({ items: filteredItems});
      this._snackBar.open('1 producto removido de la bolsa', 'Ok', {

      duration:3000

      });

    }
    return filteredItems;
  }
}
