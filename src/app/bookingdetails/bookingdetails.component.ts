import { Component, OnInit } from '@angular/core';
import { Bookingdetails } from '../bookingdetails';
import { BookingdetailsService } from '../bookingdetails.service';
import { ResourceService } from '../shared/resource.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.scss']
})
export class BookingdetailsComponent implements OnInit {

  bookingid: number;
  booking: Bookingdetails;

  loading = false;
  buttionText = "Submit";
  
  constructor(private bookingService: BookingdetailsService,
    private resourceDetailsService: ResourceService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    // getting value passed in url
    this.bookingid = this.route.snapshot.params['bookingid'];
    this.getBooking();
  }

  getBooking() {
    // search resourceby id
    this.bookingService.searchById(this.bookingid).subscribe(
      data => this.booking = data,
      error => console.log(error)
    );

    console.log(this.booking);
  }

  rejectBooking(bookingid: number) {
    //setting value
    this.booking.bookingStatus = "N";
    this.booking.pending = "N";
    //calling update booking method
    this.updateBooking();
    // setting value
    this.booking.resourceDetails.isBooked = "N";
    this.booking.resourceDetails.isAccepted = "N";
    this.booking.resourceDetails.typeOfUse = "Available";
    //calling update Resource method
    this.updateResource();
    //this.getBooking();
    //console.log(this.booking.bookingStatus)
    this.register();
    this.router.navigateByUrl("viewbookingdetails");
  }

  acceptBooking(bookingid: number) {

    this.booking.bookingStatus = "Y";
    this.booking.pending = "N";
    //calling update booking method
    this.updateBooking();
    // setting value
    this.booking.resourceDetails.isAccepted = "Y";
    this.booking.resourceDetails.typeOfUse="External";
    //calling update Resource method
    this.updateResource();
    this.register();
    this.router.navigateByUrl("viewbookingdetails");
  }

  updateBooking() {
    //calling update method
    this.bookingService.updateBooking(this.booking).subscribe(
      data => console.log(data), error => console.log(error)
    );
  }

  updateResource() {
    // calling update method
    this.resourceDetailsService.updateResource(this.booking.resourceDetails).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  //Sending Mail
  register() {
    this.loading = true;
    this.buttionText = "Submiting...";
    let user = {
      name: this.booking.custName,
      email: this.booking.email,
      resourcename: this.booking.resourceDetails.resource.resourceType,
      action: this.booking.bookingStatus
    }
    this.bookingService.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res:any = data; 
        console.log(user.action);
        console.log(
          `ðŸ‘ ${user.name} : mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = "Submit";
      },() => {
        this.loading = false;
        this.buttionText = "Submit";
      }
    );
  }

}
