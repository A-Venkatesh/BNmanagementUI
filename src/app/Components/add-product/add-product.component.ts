import { Component, OnInit } from '@angular/core';
// import { CounterService } from 'src/app/api/controllers/Counter';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass']
})
export class AddProductComponent implements OnInit {
pID: number =5;
  constructor() {
    // this.pID = cs.pId.;
   }

  ngOnInit(): void {
  }

}
