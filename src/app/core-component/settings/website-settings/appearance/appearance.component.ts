import { Component } from '@angular/core';
import { SidebarService } from 'src/app/core/service/sidebar/sidebar.service';
interface data {
  value: string;
}

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  styleUrl: './appearance.component.scss'
})
export class AppearanceComponent {
  constructor(private sidebar: SidebarService) {}
  
  isActive: string | null = null;

  setActive(theme: string) {
    this.isActive = theme;
  }
  public selectedValue1 = ''
  public selectedValue2 = ''

  selectedList1: data[] = [
    {value: 'Small - 85px'},
    {value: 'Large - 250px'},
  ];
  selectedList2: data[] = [
    {value: 'Nunito'},
    {value: 'Poppins'},
  ];
  isCollapsed: boolean = false;
  toggleCollapse() {
    this.sidebar.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }
  
}
