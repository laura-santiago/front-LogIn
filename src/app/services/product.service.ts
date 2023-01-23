import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { Product } from '../components/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/products';
  }

  getProducts(): Observable<Product[]> {
    //IMPORTANTE. ESTE CÓDIGO PERMITE ACCEDER A LA PÁGINA DE PRODUCTOS 
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    // return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`, {headers: headers});
    //PERO, LO COMENTAMOS TODO PARA MOVER ESTE CÓDIGO AL INTERCEPTOR
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  
}
