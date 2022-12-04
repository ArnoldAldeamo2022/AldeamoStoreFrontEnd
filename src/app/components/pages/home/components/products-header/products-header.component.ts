import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();//esta es la forma en que envia los datos fuera de su componente a los componentes principales, el número que se agrego es el número de columnas que deseo mostrar
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  sort = 'desc';
  itemsShowCount = 12;
  constructor() { }

  ngOnInit(): void {
  }

  //metodo para ordenar el actualizado
  onSortUpdate(newSort: string): void{
  this.sort= newSort;
  this.sortChange.emit(newSort);
  }
//metodo actualizado de articulos
onItemsUpdated(count: number): void{ //el :void se agrega cuando no devuelve nada si que solo lo actualizara
this.itemsShowCount = count;
this.itemsCountChange.emit(count);
}
//metodo para actualizar el diseño de muestra los productos
onColumnsUpdated(colsNum: number){
  this.columnsCountChange.emit(colsNum);  //emite el numero que recibimos de la plantilloa
}
}
