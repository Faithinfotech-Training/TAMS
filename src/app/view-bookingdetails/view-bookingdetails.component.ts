import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookingdetails } from '../bookingdetails';
import { BookingdetailsService } from '../bookingdetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bookingdetails',
  templateUrl: './view-bookingdetails.component.html',
  styleUrls: ['./view-bookingdetails.component.scss']
})
export class ViewBookingdetailsComponent implements OnInit {

  p: number = 1;
  bookings: Observable<Bookingdetails[]>;
  
  constructor(private bookingService: BookingdetailsService,
    private router: Router) { }

  ngOnInit(): void {

    this.getBookingDetails();
  }

  //method to get all booking details
  getBookingDetails() {
    this.bookings = this.bookingService.getAllBooking();
  }

  viewBooking(bookingid: number){
    this.router.navigate(['../bookingdetails', bookingid]);
  }
}
