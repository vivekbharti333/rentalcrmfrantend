import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SidebarService,
  apiResultFormat,
  pageSelection,
  routes,
} from 'src/app/core/core.index';
import { DataService } from 'src/app/core/service/data/data.service';
import { shift } from 'src/app/shared/model/page.model';
import { PaginationService, tablePageSize } from 'src/app/shared/shared.index';
import Swal from 'sweetalert2';
interface data {
  value: string;
}

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrl: './shift.component.scss',
})
export class ShiftComponent {
  time1 = new Date();
  time2 = new Date();
  time3 = new Date();
  time4 = new Date();
  time5 = new Date();
  time6 = new Date();
  time7 = new Date();
  time8 = new Date();
  time9 = new Date();
  time10 = new Date();
  time11 = new Date();
  time12 = new Date();
  time13 = new Date();
  time14 = new Date();
  time15 = new Date();
  time16 = new Date();

  public routes = routes;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';

  // pagination variables
  public tableData: Array<shift> = [];
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<shift>;
  public searchDataValue = '';
  //** / pagination variables

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    private sidebar: SidebarService,
    private datePipe: DatePipe
  ) {
    this.data.getDataTable().subscribe((apiRes: apiResultFormat) => {
      this.totalData = apiRes.totalData;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.shift) {
          this.getTableData({ skip: res.skip, limit: this.totalData });
          this.pageSize = res.pageSize;
        }
      });
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getShift().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: shift, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<shift>(this.tableData);
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
  public filter = false;
  openFilter() {
    this.filter = !this.filter;
  }
  isCollapsed: boolean = false;
  toggleCollapse() {
    this.sidebar.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }
  selectedList1: data[] = [
    { value: 'Sort by Date' },
    { value: 'Newest' },
    { value: 'Oldest' },
  ];
  selectedList2: data[] = [
    { value: 'Choose Shift' },
    { value: 'Fixed' },
    { value: 'Rotating' },
    { value: 'Split' },
    { value: 'On-Call' },
    { value: 'Weekend' },
  ];
  selectedList3: data[] = [
    { value: 'Choose Status' },
    { value: 'Active' },
    { value: 'Inactive' },
  ];
  selectedList4: data[] = [
    { value: 'Choose' },
    { value: 'Sunday, Monday' },
    { value: 'Saturday, Sunday' },
    { value: 'Tuesday, Saturday' },
  ];
  selectedList5: data[] = [
    { value: 'Choose' },
    { value: 'Sunday, Monday' },
    { value: 'Saturday, Sunday' },
    { value: 'Tuesday, Saturday' },
  ];

  showBox = false;

  toggleBox() {
    this.showBox = !this.showBox;
  }
  showTimePicker: Array<string> = [];
  date = new Date();
  zones: Date = new Date();
  mytime: Date = new Date();
  myTime: Date = new Date();

  toggleTimePicker(value: string): void {
    if (this.showTimePicker[0] !== value) {
      this.showTimePicker[0] = value;
    } else {
      this.showTimePicker = [];
    }
  }
  public initChecked = false;
  formatTime(date: Date) {
    const selectedDate: Date = new Date(date);
    return this.datePipe.transform(selectedDate, 'h:mm a');
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
