import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {SlideMenuModule} from 'primeng/slidemenu';

const primengModules = [
  MenubarModule,
  ButtonModule,
  SlideMenuModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...primengModules
  ],
  exports: [
    ...primengModules
  ],
})

export class PrimengMaterialModule { }
