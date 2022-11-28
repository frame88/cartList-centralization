/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Products } from '../models/IGetAll';
import { AuthService } from '../core/login/auth.service';
import { CentralService } from '../service/central.service';

@Component({
  selector: 'app-nuovapagina',
  templateUrl: './nuovapagina.page.html',
  styleUrls: ['./nuovapagina.page.scss'],
})
export class NuovapaginaPage implements OnInit {

  products: Products[] = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    public central: CentralService
    ) {}

  ngOnInit() {
    console.log(this.central.getAll());
  }
}

