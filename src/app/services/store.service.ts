import { Product } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const STORE_BASE_URL = 'https://fakestoreapi.com'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpCliente: HttpClient) { }

  getAllProducts(limit ='12', sort= 'desc', category?:string): Observable<Array<Product>>{

return this.httpCliente.get<Array<Product>>(

  `${STORE_BASE_URL}/products${
    category ? '/category/' + category : ''
  }?sort=${sort}&limit=${limit}`)
}

getAllCategories(): Observable<Array<string>> {
  return this.httpCliente.get<Array<string>>(
    `${STORE_BASE_URL}/products/categories`
  );

}
}
