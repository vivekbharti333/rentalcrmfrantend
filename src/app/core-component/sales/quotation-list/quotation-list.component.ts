import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  DataService,
  SidebarService,
  apiResultFormat,
  pageSelection,
  routes,
} from 'src/app/core/core.index';
import { quotationList } from 'src/app/shared/model/page.model';
import { PaginationService, tablePageSize } from 'src/app/shared/shared.index';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrl: './quotation-list.component.scss',
})
export class QuotationListComponent {
  initChecked = false;
  selectedValue1 = '';
  selectedValue2 = '';
  selectedValue3 = '';
  selectedValue4 = '';
  selectedValue5 = '';
  selectedValue6 = '';
  selectedValue7 = '';
  selectedValue8 = '';

  public routes = routes;
  // pagination variables
  public tableData: Array<quotationList> = [];
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<quotationList>;
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
        if (this.router.url == this.routes.quotationList) {
          this.getTableData({ skip: res.skip, limit: this.totalData });
          this.pageSize = res.pageSize;
        }
      });
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getQuotationList().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: quotationList, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<quotationList>(this.tableData);
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
  isCollapsed: boolean = false;
  toggleCollapse() {
    this.sidebar.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }
  public filter = false;
  openFilter() {
    this.filter = !this.filter;
  }

  confirmColor() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: ' btn btn-success',
        cancelButton: 'me-2 btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        confirmButtonText: 'Yes, delete it!',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
  }
  public cartValue = [2, 2, 2, 2, 2, 2, 2, 2];

  public addPos(i: number): void {
    this.cartValue[i]++;
  }
  public reducePos(i: number): void {
    this.cartValue[i]--;
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
