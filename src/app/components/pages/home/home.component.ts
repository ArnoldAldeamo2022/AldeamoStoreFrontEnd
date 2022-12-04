import { StoreService } from './../../../services/store.service';
import { Product } from './../../../models/product.model';
import { CartService } from './../../../services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
//se crea un nuevo objeto para que pueda mapear la altura de las tarjetas donde se mostraran los productos
const ROWS_HEIGHT: { [id:number]: number } = {1: 400, 3: 335, 4: 350}; //a este objeto se asignan 3 valores  donde el primer valor es la columna seleccionada y una altura de 400px, segundo valor tenemos 3 articulos por fila con una altura de 335px, el último valor tenemos 4 elementos por fila y una altua de 350px

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
sort = 'desc';
count = '12';
productsSubcription: Subscription | undefined;
  constructor( private CartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts (): void{
     this.productsSubcription = this.storeService.getAllProducts(this.count, this.sort, this.category)
     .subscribe((_products) => {
      this.products = _products;
     })
  }

  onColumnsCountChange(colsNum: number): void{ //este metodo lo llamo en el HOME COMPONENT
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  //creo el  metodo que fue creado en filter.component.ts para poder llamarlo en mi home page
  onShowCategory(newCategory: string): void{
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart (product: Product): void{
    this.CartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
}

onItemsCountChange (newCount: number): void{
this.count = newCount.toString();
this.getProducts();
}

onSortChange(newSort: string): void{
  this.sort = newSort;
  this.getProducts();
}

ngOnDestroy(): void {
    if(this.productsSubcription) {
      this.productsSubcription.unsubscribe();
    }
}
}
