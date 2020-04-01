import { Component, OnInit } from '@angular/core';
import { Resourcedetails } from '../shared/resourcedetails';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ResourceService } from '../shared/resource.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  resources: Observable<Resourcedetails[]>;

  constructor(private resourceService: ResourceService,
    private router: Router) { }

  ngOnInit(): void {

    this.getResourceDetails();
  }

  // method to get all details
  getResourceDetails() {
    this.resources = this.resourceService.getActiveResources();
    console.log(this.resources);
  }

  // method to view more details
  viewResource(resourceId: number) {
    // link
    this.router.navigate(['../resourcedetails', resourceId]);
  }

}
