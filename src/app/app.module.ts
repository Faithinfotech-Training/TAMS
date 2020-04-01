import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourceListComponent } from './resource/resource-list/resource-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResourceAddComponent } from './resource/resource-add/resource-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { ResourceUpdateComponent } from './resource/resource-update/resource-update.component';
import { HomeComponent } from './home/home.component';
import { ResourceDetailsComponent } from './resource/resource-details/resource-details.component';
import { AddBookingdetailsComponent } from './add-bookingdetails/add-bookingdetails.component';
import { ViewBookingdetailsComponent } from './view-bookingdetails/view-bookingdetails.component';
import { BookingdetailsComponent } from './bookingdetails/bookingdetails.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { AdminComponent } from './admin/admin.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    ResourceListComponent,
    ResourceAddComponent,
    ResourceUpdateComponent,
    HomeComponent,
    ResourceDetailsComponent,
    AddBookingdetailsComponent,
    ViewBookingdetailsComponent,
    BookingdetailsComponent,
    ViewReportComponent,
    BarChartComponent,
    LoginComponent,
    ManagerComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    BrowserAnimationsModule,
    NgxPaginationModule,
    ChartsModule

  ],
  providers: [
    AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
