import { Product } from './../../../../../models/product.model';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {
@Input() fullWidthMode=false; // importo el input y aqui lo inicializo  crea una entrada y se agrega el nombre de ancho completo y digo qie valores predeterminados son falsos xk cuando se carga la aplicación tendre 3 productos x fila, solo si se hace clic en el primer icono
@Input() product: Product | undefined;
@Output () addToCart = new EventEmitter();

constructor() { }


  ngOnInit(): void {
  }

  onAddToCart(){
    this.addToCart.emit(this.product);
  }

}
