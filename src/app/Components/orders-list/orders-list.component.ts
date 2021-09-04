// import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  Pipe,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { OrderService } from 'src/app/api/controllers/Order';
import { PdfService } from 'src/app/api/controllers/Pdf';
import { Order } from 'src/app/api/model';
import { DataService } from 'src/app/Services/data.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.sass'],
  providers: [OrderService, PdfService],
})
export class OrdersListComponent implements AfterViewInit {
  // printB = true;
  // printC = '';
  selection = new SelectionModel<Order>(true, []);
  displayedColumns: string[] = [
    'radio',
    'postedOn',
    'id',
    'status',
    'fullName',
    'amount',
    'action',
  ];
  dataSource: MatTableDataSource<Order>;
  data!: Order[];

  constructor(os: OrderService, ds: DataService, public pdf: PdfService) {
    console.log('consy');
    this.data = [];
    os.getOrdersUsingGET().subscribe((arg) => {

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
  tabClicked(tab: MatTabChangeEvent) {
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
  tabData(status: any) {
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
  async printComponent(content: any) {
    // this.printB = false;
    console.log(content);

    if (typeof content === 'string') {

      this.pdf.batch({orders : this.selection.selected}).subscribe((response) => {
        var mediaType = 'application/pdf';
        var blob = new Blob([response], { type: mediaType });
        saveAs(blob, 'multiple.pdf');
    },
        (error) => {
          console.log(error);
         });
    } else {
      console.log("single file");

      this.pdf.pdf({order:content}).subscribe((response) => {
        var mediaType = 'application/pdf';
        var blob = new Blob([response], { type: mediaType });
        saveAs(blob, content.id + '.pdf');
    },
        (error) => {
          console.log(error);
         });
    }

    // await new Promise((f) => setTimeout(f, 1000));
    console.log('pcccccccccc');
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
    console.log(this.selection);
  }
}
