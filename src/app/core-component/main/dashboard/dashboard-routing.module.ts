import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent,
children: [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin-dashboard'
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'sales-dashboard',
    component: SalesDashboardComponent
  }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
