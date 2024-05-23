import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule and NgForm
import { SidebarService, routes } from 'src/app/core/core.index'; // Ensure correct import path
import { UserManagementService } from '../user-management.service';
// import { ToastrService } from 'ngx-toastr';

interface data {
  value: string;
}

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  public user = {
    userPicture: '',
    firstName: '',
    lastName: '',
    emailId: '',
    roleTypeIds: '',
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

  // createAddress() {
  //   return {
  //     addressType: '',
  //     addressLine: '',
  //     landmark: '',
  //     district: '',
  //     city: '',
  //     state: '',
  //     country: 'INDIA',
  //     pincode: ''
  //   };
  // }

  // addItem() {
  //   this.user.addressList.push(this.createAddress());
  // }

  // removeItem(index: number) {
  //   this.user.addressList.splice(index, 1);
  // }

  constructor(private sidebar: SidebarService,
    private userManagementService: UserManagementService,
    // private toastr: ToastrService,
  ) {}

  public routes = routes;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  public selectedValue6 = '';
  public selectedValue7 = '';
  public password : boolean[] = [false];
  selectedList1: data[] = [{ value: 'Male' }, { value: 'Female' }];
  selectedList2: data[] = [{ value: 'United Kingdom' }, { value: 'India' }];
  selectedList3: data[] = [{ value: 'Choose' },{value: 'Regular' }];
  selectedList4: data[] = [
    { value: 'UI/UX' },
    { value: 'Support' },
    { value: 'HR' },
    { value: 'Engineering' },
  ];
  selectedList5: data[] = [
    { value: 'Designer' },
    { value: 'Developer' },
    { value: 'Tester' },
  ];
  selectedList6: data[] = [
    { value: 'O positive' },
    { value: 'A positive' },
    { value: 'B positive' },
  ];
  selectedList7: data[] = [{ value: 'United Kingdom' }, { value: 'USA' }];

  public roleTypes = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
    { id: 3, name: 'Guest' }
  ];


  submitUserForm12(form: NgForm) {
    if (form.valid) {
      this.userManagementService.saveUserDetails(this.user).subscribe(
        response => {
          console.log("User details saved successfully", response);
          // Handle success response
        },
        error => {
          console.error("Error saving user details", error);
          // Handle error response
        }
      );
    } else {
      console.log('Form is invalid');
    }
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
    
    this.userManagementService.saveUserDetails(this.user)
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


  isCollapsed: boolean = false;

  toggleCollapse() {
    this.sidebar.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }
}