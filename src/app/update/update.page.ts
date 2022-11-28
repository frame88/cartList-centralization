import { NgForm } from '@angular/forms';
import { CentralService } from './../service/central.service';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models/IGetAll';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  products: Products[] = [];
  acca;
  constructor(
    private http: HttpClient,
    private router: Router,
    public central: CentralService
  ) {}

  ngOnInit() {
  }

}
