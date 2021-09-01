import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/api/model';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.sass'],
})
export class OrderDetailComponent implements OnInit {
  id: any;
  cont :any;
  displayedColumns: string[] = ['id','item', 'varaint', 'quantity', 'cost', 'tcost'];
  constructor(
    private _Activatedroute: ActivatedRoute,
    private ds: DataService
  ) {
    _Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.cont = <Order> this.ds.orders.find(o => o.id?.match(this.id));
      this.id = this.cont.postedOn + '000000000000';
      console.log(JSON.stringify(this.cont));
    });
  }

  ngOnInit(): void {}
  getTotalCost() {
    let total = 0;
    this.cont.line_items.forEach((element : any) => {
      total += Number(element.amount) * Number(element.quantity);
    });

    return total;
  }

  getTotalQty() {
    return this.cont.line_items
      .map((t:any) => Number(t.quantity))
      .reduce((acc : any, value: any) => acc + value, 0);
  }

  add(a: number, b: number) {
    return Number(a) + Number(b);
  }

  multiply(a: number, b: number) {
    return Number(a) * Number(b);
  }
}
