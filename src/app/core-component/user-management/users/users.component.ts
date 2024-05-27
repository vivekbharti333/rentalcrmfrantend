import { Component, importProvidersFrom} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  DataService,
  pageSelection,
  apiResultFormat,
  SidebarService,
} from 'src/app/core/core.index';
import { routes } from 'src/app/core/helpers/routes';
import { users } from 'src/app/shared/model/page.model';
import { PaginationService, tablePageSize } from 'src/app/shared/shared.index';
import Swal from 'sweetalert2';
import { UserManagementService } from '../user-management.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})

export class UsersComponent {


  public addressList: any;

  public user = {
    userPicture: '',
    firstName: '',
    lastName: '',
    emailId: '',
	  roleType: '',
	  mobileNo: '',
	  alternateMobile: '',
    userCode: '',
	  idDocumentType: '',
	  idDocumentPicture: '',
	  panNumber: '',
    dob:'',
    emergencyContactRelation1: '',
    emergencyContactName1: '',
    emergencyContactNo1: '',
    emergencyContactRelation2: '',
    emergencyContactName2: '',
    emergencyContactNo2: '',
    // addressList: [
    //   this.createAddress(),
    //   this.createAddress()
    // ]
    addressList: [
      { addressType: 'CURRENT', addressLine: '', landmark: '', district: '', city: '', state: '', country: 'INDIA', pincode: '' },
      { addressType: 'PARMANENT', addressLine: '', landmark: '', district: '', city: '', state: '', country: 'INDIA', pincode: '' }
    ]
  };

  openEditModal(rowDate: any) {
    this.user.userPicture = rowDate.userPicture;
    this.user.firstName = rowDate.firstName; // Assign the value to user.firstName
    this.user.lastName = rowDate.lastName;
    this.user.emailId = rowDate.emailId;
    this.user.roleType = rowDate.roleType;
    this.user.mobileNo = rowDate.mobileNo;
    this.user.alternateMobile = rowDate.alternateMobile;
    this.user.userCode = rowDate.userCode;
    this.user.idDocumentType = rowDate.idDocumentType;
	  this.user.idDocumentPicture = rowDate.idDocumentPicture;
	  this.user.panNumber = rowDate.panNumber;
    this.user.emergencyContactRelation1 = rowDate.emergencyContactRelation1;
    this.user.emergencyContactName1 = rowDate.emergencyContactName1;
    this.user.emergencyContactNo1 = rowDate.emergencyContactNo1;
    this.user.emergencyContactRelation2 = rowDate.emergencyContactRelation2;
    this.user.emergencyContactName2 = rowDate.emergencyContactName2;
    this.user.emergencyContactNo2 = rowDate.emergencyContactNo2;

    this.getAddressListByUserId(rowDate.loginId);
   
  }

  public roleTypes = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
    { id: 3, name: 'Guest' }
  ];



  initChecked = false;
  selectedValue1 = '';
  selectedValue2 = '';
  selectedValue3 = '';
  selectedValue4 = '';
  selectedValue5 = '';
  selectedValue6 = '';
  selectedValue7 = '';

  public userList: any;

  public routes = routes;
  // pagination variables
  public tableData: Array<any> = [];
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<users>;
  public searchDataValue = '';
  //** / pagination variables



  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    private sidebar: SidebarService,
    private userManagementService: UserManagementService,
  ) {
      this.userManagementService.getUserDetailsList().subscribe((apiRes: any) => {
      this.totalData = apiRes.totalNumber;
      const stringRepresentation = JSON.stringify(apiRes);
      const dataSize = stringRepresentation.length;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.users) {
          this.getTableData({ skip: res.skip, limit: this.totalData  });
          this.pageSize = res.pageSize;
        }
      });
    });
  }


  private getTableData(pageOption: pageSelection): void {
      this.userManagementService.getUserDetailsList().subscribe((apiRes: any) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalNumber;
      apiRes.listPayload.map((res: any, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<users>(this.tableData);
      const dataSize = this.tableData.length;
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

  public password : boolean[] = [false];

  public togglePassword(index: number){
    this.password[index] = !this.password[index]
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

  public getAddressListByUserId(userId:any) {
    alert(12345)
    this.userManagementService.getAddressListByUserId(userId)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            this.addressList = JSON.parse(JSON.stringify(response['listPayload']));
            alert("hghgg : "+this.addressList)
            console.log(this.addressList)
          } else {
          }
        },
        // error: (error: any) => this.toastr.error('Server Error', '500'),
      });
  }


  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64String = event.target.result.split(',')[1]; // Get the base64 part

        // Set the base64 string to the userPicture field
        this.user.userPicture = "data:image/jpeg;base64,"+base64String;
        alert("base64 : "+this.user.userPicture);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  submitUserForm() {
    // this.isLoading = true;
    alert(this.user.userPicture);
    // alert(form);
    // alert(form.value);
    
    this.userManagementService.updateUserDetails(this.user)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
              //  this.toastr.success(response['payload']['respMesg'], response['payload']['respCode']);
             // form.reset();
              // this.createForms();
              // this.isLoading = false;
            } else {
              // this.toastr.error(response['payload']['respMesg'], response['payload']['respCode']);
              // this.isLoading = false;
            }
          } else {
            // this.toastr.error(response['responseMessage'], response['responseCode']);
            // this.isLoading = false;
          }
        },
        // error: (error: any) => this.toastr.error('Server Error', '500'),
      });
      // this.isLoading = false;
  }
}
