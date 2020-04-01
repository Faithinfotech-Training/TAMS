import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bookingdetails } from './bookingdetails';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingdetailsService {

  constructor(private httpClient: HttpClient) { }

  addBooking(booking: Bookingdetails): Observable<any> {
    console.log(booking);
    return this.httpClient.post(environment.apiUrl + "/booking", booking);
  }

  getAllBooking(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/booking");
  }

  searchById(bookingid: number): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/booking/" + bookingid);
  }

  updateBooking(booking: Object): Observable<any> {
    return this.httpClient.put(environment.apiUrl + "/booking", booking);
  }

  reportEnquiry(resourceId: number, startDate: Date, endingDate: Date): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/booking-report/" + resourceId + "&" + startDate + "&" + endingDate);
  }

  acceptedReport(resourceId: number, startDate: Date, endingDate: Date): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/booking-acceptedreport/" + resourceId + "&" + startDate + "&" + endingDate);
  }

  rejectedReport(resourceId: number, startDate: Date, endingDate: Date): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/booking-rejectedreport/" + resourceId + "&" + startDate + "&" + endingDate);
  }

  //Send Mail
  sendEmail(url, data) {
    return this.httpClient.post(url, data);
  }
  
}
