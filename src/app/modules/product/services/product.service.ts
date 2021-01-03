import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  test = 'test service';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.masterAppApi.baseApi}/Product`
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${environment.masterAppApi.baseApi}/Product`,
      product
    );
  }
}
