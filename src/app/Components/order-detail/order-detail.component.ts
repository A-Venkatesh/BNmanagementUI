import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.sass']
})
export class OrderDetailComponent implements OnInit {
  id : any;
  cont: any;

  constructor(private _Activatedroute:ActivatedRoute, private ds:DataService) {

   }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.cont = this.ds.orders.filter(o => o.id?.match(this.id));
  });
  }

}
