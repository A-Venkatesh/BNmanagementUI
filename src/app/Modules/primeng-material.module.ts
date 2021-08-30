import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SkeletonModule} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';

const primengModules = [
  MenubarModule,
  ButtonModule,
  SlideMenuModule,
  SkeletonModule,
  TableModule,
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
