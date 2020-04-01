import { Component, OnInit } from '@angular/core';
import { Resourcedetails } from '../shared/resourcedetails';
import { Observable } from 'rxjs';
import { ResourceService } from '../shared/resource.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {

  p: number = 1;
  resources: Observable<Resourcedetails[]>;

  constructor(private resourceDetailsService: ResourceService,
    private router: Router) { }

  ngOnInit(): void {
    this.getResourceDetails();
  }

  getResourceDetails() {
    this.resources = this.resourceDetailsService.getResourceList();
  }

  viewChart(resourceId: number, resourceType: string) {
    this.router.navigate(['barchart', resourceId, resourceType]);
  }

}
