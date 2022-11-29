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

import { IModProd } from '../models/IModProd';
import { IDelete } from '../models/IDelete';

@Injectable({
  providedIn: 'root'
})
export class CentralService {

  products: Products[] = [];
  iddi;
  infoProd;
  errorMessage = '';

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
      if (result.success) {
        this.products = result.data;
        console.log(this.products);
      }
      else {
        this.errorMessage = result.errorMessage;
        console.log(this.errorMessage);
      }
    });
  }

  areUsure() {
  let text = 'Press a button!\nEither OK or Cancel.';
  if (confirm(text) === true) {
    //incollo la chiamata DELETE
  } else {
    text = 'You canceled!';
  }
}

    //ELIMINA IL PRODOTTO PARTICOLARE
    deleteHandler(id: number){
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // eslint-disable-next-line quote-props
      'Authorization': `Bearer ${token}`
    });
    this.http.delete<IDelete>(`${environment.API.backend}/api/ShoppingCart/${id}`, {headers})
    .subscribe(result => {
      if (result.success) {
        this.products = this.products.filter(product => product.id !== id);
        console.log(this.products);
      }
      else {
        this.errorMessage = result.errorMessage;
        console.log(this.errorMessage);
      }
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
      if (result.success) {
        form.reset();
      }
      else {
        this.errorMessage = result.errorMessage;
        console.log(this.errorMessage);
      }
    });
  }

  //OTTIENE INFO SU UN PRODOTTO
  info(id: number) {
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    this.http.get<Products>(`${environment.API.backend}/api/ShoppingCart/${id}`, {headers})
    .subscribe((result: Products) => {
      this.infoProd = result;
      console.log('info sul prodotto particolare: ', this.infoProd);
      this.iddi = id;
      console.log(id, this.iddi);
    });
  }

  //MODIFICA IL PRODOTTO PARTICOLARE
  edit(form: NgForm, id: number) {
    console.log(form);
    const bodyy: IModProd =
    {
      id: form.value.id,
      category: form.value.category,
      productName: form.value.productName,
      quantity: form.value.quantity,
      unitCost: form.value.unitCost,
      orderDate: form.value.orderDate
    };
    const token = JSON.parse(localStorage.getItem('token')).token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    this.http.put<RespINewProd>(`${environment.API.backend}/api/ShoppingCart`, bodyy, {headers} )
    .subscribe(result => {
      if (result.success) {
        console.log(this.products);
      }
      else {
        this.errorMessage = result.errorMessage;
        console.log(this.errorMessage);
      }
    });

    this.router.navigateByUrl('nuovapagina');
  }

}
