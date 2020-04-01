import { Component, OnInit } from '@angular/core';
import { Resourcedetails } from 'src/app/shared/resourcedetails';
import { ResourceService } from 'src/app/shared/resource.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss']
})
export class ResourceDetailsComponent implements OnInit {

  resourceId: number;
  res: Resourcedetails;

  constructor(private resourceService: ResourceService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // getting value passed in url
    this.resourceId = this.route.snapshot.params['resourceId'];

    this.getResource();
  }

  getResource() {

    // search resourceby id
    this.resourceService.searchById(this.resourceId).subscribe(
      data => this.res = data,
      error => console.log(error)
    );
  }

  book(resourceId: number) {
    this.router.navigate(['../bookingform', resourceId]);
  }

}
