import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService, SidebarService, apiResultFormat, pageSelection, routes } from 'src/app/core/core.index';
import { stock } from 'src/app/shared/model/page.model';



import { PaginationService, tablePageSize } from 'src/app/shared/shared.index';

import Swal from 'sweetalert2';
interface data {
  value: string;
}

@Component({
  selector: 'app-stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrl: './stock-transfer.component.scss'
})
export class StockTransferComponent {
  initChecked = false;
 
  public routes = routes;
  public cartValue = [4,4];

  public addPos(i: number): void {
    this.cartValue[i]++;
  }
  public reducePos(i: number): void {
    this.cartValue[i]--;
  }
  // pagination variables
  public tableData: Array<stock> = [];
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<stock>;
  public searchDataValue = '';
  //** / pagination variables

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    private sidebar: SidebarService
  ) {
    this.data.getDataTable().subscribe((apiRes: apiResultFormat) => {
      this.totalData = apiRes.totalData;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.stockTransfer) {
          this.getTableData({ skip: res.skip, limit: this.totalData  });
          this.pageSize = res.pageSize;
        }
      });
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getStocks().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: stock, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<stock>(this.tableData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.tableData = this.dataSource.filteredData;
  }
  confirmColor() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: ' btn btn-success',
        cancelButton: 'me-2 btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      confirmButtonText: 'Yes, delete it!',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  public filter = false;
  openFilter() {
    this.filter = !this.filter;
  }
  isCollapsed: boolean = false;
  toggleCollapse() {
    this.sidebar.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  public selectedValue6 = '';
  public selectedValue7 = '';
  public selectedValue8 = '';
  public selectedValue9 = '';
  public selectedValue10 = '';




  selectedList1: data[] = [
    { value: 'Sort by Date' },
    { value: 'Newest' },
    { value: 'Oldest' },
  ];
  selectedList2: data[] = [
    { value: 'Warehouse From' },
    { value: 'Lobar Handy' },
    { value: 'Quaint Warehouse' },
    { value: 'Traditional Warehouse' },
    { value: 'Cool Warehouse' },
  ];
  selectedList3: data[] = [
    { value: 'Warehouse To' },
    { value: 'Selosy' },
    { value: 'Logerro' },
    { value: 'Vesloo' },
    { value: 'Crompy' },
  ];
  selectedList4: data[] = [
    { value: 'Choose' },
    { value: 'Lobar Handy' },
    { value: 'Quaint Warehouse' },
   
  ];
  selectedList5: data[] = [
    { value: 'Choose' },
    { value: 'Selosy' },
    { value: 'Logerro' },
   
  ];
  selectedList6: data[] = [
    { value: 'Lobar Handy' },
    { value: 'Quaint Warehouse' },
  ];
  selectedList7: data[] = [
    { value: 'Lobar Handy' },
    { value: 'Quaint Warehouse' },
  ];
  selectedList8: data[] = [
    { value: 'Selosy' },
    { value: 'Logerro' },
  ];
  selectedList9: data[] = [
    { value: 'Choose' },
    { value: 'Store 1' },
  ];
  selectedList10: data[] = [
    { value: 'Choose' },
    { value: 'Sent' },
    { value: 'Pending' },
  ];
  quantity: number = 2; // Initial quantity value

decreaseQuantity() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}

increaseQuantity() {
  this.quantity++;
}
showBox = false;
toggleBox() {
  this.showBox = !this.showBox;
}
selectAll(initChecked: boolean) {
  if (!initChecked) {
    this.tableData.forEach((f) => {
      f.isSelected = true;
    });
  } else {
    this.tableData.forEach((f) => {
      f.isSelected = false;
    });
  }
}
}
