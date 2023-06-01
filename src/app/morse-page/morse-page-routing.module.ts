import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MorsePagePage } from './morse-page.page';

const routes: Routes = [
  {
    path: '',
    component: MorsePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MorsePagePageRoutingModule {}
