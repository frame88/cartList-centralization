/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IGetAll } from './../models/IGetAll';
import { environment } from 'src/environments/environment';
import { Products } from './../models/IGetAll';


@Injectable({
  providedIn: 'root'
})
export class CentralService {

  products: Products[] = [];

  constructor( private http: HttpClient) {}

  //STAMPA TUTTI I PRODOTTI
  getAll() {
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    //console.log(this.auth.tok);
    this.http.get<IGetAll>(`${environment.API.backend}/api/ShoppingCart`, {headers})
    .subscribe(result => {
      this.products = result.data;
      console.log(this.products);
    });
  }

}
