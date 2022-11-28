/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IGetAll } from './../models/IGetAll';
import { environment } from 'src/environments/environment';
import { Products } from './../models/IGetAll';

import { NgForm } from '@angular/forms';
import { RespINewProd } from '../models/INewProd';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CentralService {

  products: Products[] = [];

  constructor( private http: HttpClient, private router: Router) {}

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

  //ELIMINA IL PRODOTTO PARTICOLARE
  deleteHandler(id: number){
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // eslint-disable-next-line quote-props
      'Authorization': `Bearer ${token}`
    });
    this.http.delete(`${environment.API.backend}/api/ShoppingCart/${id}`, {headers})
    .subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
      console.log(this.products);
    });
  }

  //SALVA IL FORM
  save(form: NgForm) {
    console.log(form.value);
    this.add(form);
    this.router.navigateByUrl('nuovapagina');
  }

  //AGGIUNGE PRODOTTO AL DB
  add(form: NgForm) {
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    this.http.post<RespINewProd>(`${environment.API.backend}/api/ShoppingCart`, form.value, {headers})
    .subscribe(result => {
      form.reset();
    });
  }

}
