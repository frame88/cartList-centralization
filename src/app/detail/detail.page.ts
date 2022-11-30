import { CentralService } from './../service/central.service';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RespINewProd } from '../models/INewProd';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {


  //infoProd: RespINewProd = null;

  acca = null;

  iddi = +this.activatedRoute.snapshot.params.id;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public central: CentralService)
    {}

    ngOnInit() {
      this.central.info(this.iddi);
      /*
      this.acca = this.central.infoProd.data;
      console.log(this.central.infoProd);
      console.log(this.acca);
      */
    }
}
