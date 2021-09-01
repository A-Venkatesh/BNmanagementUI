// import { Component, OnInit } from '@angular/core';
import { AfterViewInit, Component, ViewChild, OnInit, ElementRef, Pipe } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { OrderService } from 'src/app/api/controllers/Order';
import { Order } from 'src/app/api/model';
import { DataService } from 'src/app/Services/data.service';
import { TextToPdfService } from 'src/app/Services/text-to-pdf.service';

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


export class OrdersListComponent implements AfterViewInit {
  printB= true;
  @ViewChild('dataContainer')
  dataContainer!: ElementRef;

  loadData(data:string) {
    console.log('load data methord');

      this.dataContainer.nativeElement.innerHTML = data;
  }
  displayedColumns: string[] = [
    'postedOn',
    'id',
    'status',
    'fullName',
    'amount',
    'action',
  ];
  dataSource: MatTableDataSource<Order>;
  data!: Order[];
  // data!: import("d:/NB/BNmanagementUI/src/app/api/model").Order[];
  // const data = [] ;
  constructor(os: OrderService, ds:DataService, public t2p:TextToPdfService) {
    // const data = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    console.log(t2p.content);
    // this.loadData(t2p.content) ;

    console.log('consy');
    this.data = [];
    os.getOrdersUsingGET().subscribe((arg) => {
      // console.log(JSON.stringify(arg[0].id));

      this.data = arg;
      this.dataSource = new MatTableDataSource(this.data);
      this.ngAfterViewInit();

      this.tabClick(0);
      ds.orders = arg;
    });

    // Create 100 data
    this.dataSource = new MatTableDataSource(this.data);

    // Assign the data to the data source for the table to render
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = (item: Order, property) => {
      switch (property) {
        case 'fullName':
          return item.userDetails.fullName;
        case 'id':
          return item.id;
        case 'status':
          return item.status;
        case 'amount':
          return Number(item.invoice.amount);
        case 'postedOn':
          return new Date(item.postedOn != undefined ? item.postedOn : '');
        // default: return item[property];
      }
    };
    this.sort.sort({ id: 'postedOn', start: 'asc' } as MatSortable);
    // this.dataSource.sort = sort;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  tabClicked(tab: MatTabChangeEvent){
this.tabClick(tab.index);
  }

  tabClick(tab: Number) {
    console.log(tab);

    switch (tab) {
      case 2:
        // let data =  this.data;
        this.dataSource = new MatTableDataSource(this.data);
        this.ngAfterViewInit();
        break;
      case 0:
     this.tabData('RECEIVED');
        //  this.ngAfterViewInit();
        break;

      case 1:
        this.tabData('DISPACHED');
        //  this.ngAfterViewInit();
        break;

      default:
        break;
    }
  }
  tabData(status:any){

    this.dataSource.data = this.data;

    this.dataSource.filterPredicate = (data: Order, filter) => {
      // const dataStr = JSON.stringify(data).toLowerCase();
      return data.status == filter;
    };
    this.dataSource.filter = status;
    this.dataSource.data = this.dataSource.filteredData;

    // let data = this.data.filter((a) => a.status?.match(status));
    // this.dataSource = new MatTableDataSource(data);
    // console.log(JSON.stringify(data));

    // // this.ngAfterViewInit();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.filterPredicate  =  (data: Element, filter: string) => data.name.indexOf(filter) != -1;
  }
  async printComponent(cmpName: any) {
    this.printB = false;
    await new Promise(f => setTimeout(f, 1000));
    console.log('pcccccccccc');

    this.t2p.captureScreen();
    // let printContents = document.getElementById(cmpName)!.innerHTML;
    // let originalContents = document.body.innerHTML;

    // document.body.innerHTML = printContents;

    // window.print();

    // document.body.innerHTML = originalContents;
    // window.location.reload();
     this.printB = true;
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
