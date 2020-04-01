import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingdetailsService } from '../bookingdetails.service';
import { ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  resourceId: number;
  resourceType: string;
  submitted = true;
  todate = new Date();
  reportForm: FormGroup;
  startDate: Date;
  endingDate: Date;
  public enquiry: number;
  public accepted: number;
  public rejected: number;
  

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[] = ['Enquired', 'Accepted', 'Rejected'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0], label: 'Resources' }
  ];


  constructor(private formBuilder: FormBuilder,
    private bookingService: BookingdetailsService,
    private route: ActivatedRoute) {

      this.barChartData = [
        { data: [], label: '' }]
     }

  ngOnInit(): void {
    this.resourceId = this.route.snapshot.params['resourceId'];
    this.resourceType = this.route.snapshot.params['resourceType'];
    this.createForm();
    //console.log("First");
    this.barChartData[0].label=this.resourceType;
  }

  createForm() {
    this.reportForm = this.formBuilder.group({
      date: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = false;
    this.startDate = this.reportForm.controls.date.value;
    this.endingDate = this.reportForm.controls.endDate.value;

    this.bookingService.reportEnquiry(this.resourceId, this.startDate, this.endingDate).subscribe(
      data => {
        this.enquiry = data;
        console.log("Enquiry: " + this.enquiry);
        this.barChartData[0].data[0]=this.enquiry;
        //console.log("Enquiry: " + this.barChartData[0].data[0]);
      },
      error => console.log(error));

    this.bookingService.acceptedReport(this.resourceId, this.startDate, this.endingDate).subscribe(
      data => {
        this.accepted = data;
        console.log("Accepted: " +this.accepted);
        this.barChartData[0].data[1]=this.accepted;
        //console.log("Accepted: " +this.barChartData[0].data[1]);
      },
      error => console.log(error));

    this.bookingService.rejectedReport(this.resourceId, this.startDate, this.endingDate).subscribe(
      data => {
        this.rejected = data;
        console.log("Rejected: " +this.rejected);
        this.barChartData[0].data[2]=this.rejected;
       
      },
      error => console.log(error));

      //this.barChartData[0].data[3]=0;
    //console.log("Enquiry Out Side : " + this.enquiry);
    //this.barChartData[0].data.
    //for(let i = 0;i<this.barChartData.length;i++) { 
       //console.log(this.barChartData[i].data); 
   //}
  /*
   this.barChartData.push({
    label: 'label2',
    backgroundColor: '#ff0000',
    data: [this.enquiry, 4, 3, 0]
  });*/
  //this.barChartData.0].bars[2].value = 50;
  //this.barChartData.update();
    
  }
  
  
  

}
