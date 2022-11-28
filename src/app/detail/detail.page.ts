import { CentralService } from './../service/central.service';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Products } from '../models/IGetAll';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(
    activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public central: CentralService)
    {}

  ngOnInit() {
  }
}
