import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MorsePagePageRoutingModule } from './morse-page-routing.module';

import { MorsePagePage } from './morse-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MorsePagePageRoutingModule
  ],
  declarations: [MorsePagePage]
})
export class MorsePagePageModule {}
