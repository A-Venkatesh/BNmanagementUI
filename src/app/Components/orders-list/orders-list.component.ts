// import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { OrderService } from 'src/app/api/controllers/Order';
import { Order } from 'src/app/api/model';

// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   fruit: string;
// }

/** Constants used to fill up our data base. */
// const FRUITS: string[] = [
//   'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
// ];
// const NAMES: string[] = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.sass'],
  providers: [OrderService],
})
export class OrdersListComponent  implements AfterViewInit {
  displayedColumns: string[] = ['postedOn','id', 'status', 'fullName', 'amount'];
  dataSource: MatTableDataSource<Order>;
  users!: Order[];
  // users!: import("d:/NB/BNmanagementUI/src/app/api/model").Order[];
  // const users = [] ;
  constructor( os: OrderService) {
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
console.log("consy");
this.users=[];
    os.getOrdersUsingGET()
      .subscribe(arg => {
        // console.log(JSON.stringify(arg[0].id));

        this.users = arg
        this.dataSource = new MatTableDataSource(this.users);
       this.ngAfterViewInit();
      });

    // Create 100 users
    this.dataSource = new MatTableDataSource(this.users);


    // Assign the data to the data source for the table to render

  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = (item:Order, property) => {
      switch(property) {
        case 'fullName': return item.userDetails.fullName;
        case 'id': return item.id;
        case 'status': return item.status;
        case 'amount': return Number(item.invoice.amount);
        case 'postedOn': return new Date(item.postedOn != undefined ?item.postedOn:'' ) ;
        // default: return item[property];
      }
    };
    this.sort.sort(({ id: 'postedOn', start: 'asc'}) as MatSortable);
    // this.dataSource.sort = sort;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))]
//   };
// }
