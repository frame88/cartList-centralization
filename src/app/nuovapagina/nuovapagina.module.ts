import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuovapaginaPageRoutingModule } from './nuovapagina-routing.module';

import { NuovapaginaPage } from './nuovapagina.page';
import { DragAndDropModule } from 'angular-draggable-droppable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuovapaginaPageRoutingModule,
    DragAndDropModule
  ],
  declarations: [
    NuovapaginaPage,
  ]
})
export class NuovapaginaPageModule {}
