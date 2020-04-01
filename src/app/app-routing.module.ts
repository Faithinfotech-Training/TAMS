import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceListComponent } from './resource/resource-list/resource-list.component';
import { ResourceAddComponent } from './resource/resource-add/resource-add.component';
import { ResourceUpdateComponent } from './resource/resource-update/resource-update.component';
import { HomeComponent } from './home/home.component';
import { ResourceDetailsComponent } from './resource/resource-details/resource-details.component';
import { AddBookingdetailsComponent } from './add-bookingdetails/add-bookingdetails.component';
import { ViewBookingdetailsComponent } from './view-bookingdetails/view-bookingdetails.component';
import { BookingdetailsComponent } from './bookingdetails/bookingdetails.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'home', component: HomeComponent },
  { path: 'resourcelist', component: ResourceListComponent,canActivate: [AuthGuard] },
  { path: 'resourceadd', component: ResourceAddComponent,canActivate: [AuthGuard] },
  { path: 'resourceupdate/:resourceId', component: ResourceUpdateComponent,canActivate: [AuthGuard] },
  { path: 'resourcedetails/:resourceId', component: ResourceDetailsComponent },
  { path: 'bookingform/:resourceId', component: AddBookingdetailsComponent },
  { path: 'viewbookingdetails', component: ViewBookingdetailsComponent,canActivate: [AuthGuard]},
  { path: 'bookingdetails/:bookingid', component: BookingdetailsComponent,canActivate: [AuthGuard] },
  { path: 'barchart/:resourceId/:resourceType', component: BarChartComponent,canActivate: [AuthGuard] },
  { path: 'viewreport', component: ViewReportComponent,canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },
  { path: "manager", component: ManagerComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
