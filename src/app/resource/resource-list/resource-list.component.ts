import { Component, OnInit } from '@angular/core';
import { Resourcedetails } from 'src/app/shared/resourcedetails';
import { Observable } from 'rxjs';
import { ResourceService } from 'src/app/shared/resource.service';
import { Router } from '@angular/router';
import { Resourcemaster } from 'src/app/shared/resourcemaster';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  page: number = 1;
  resources: Observable<Resourcedetails[]>
  resourcesInfo: Observable<Resourcemaster[]>;


  constructor(private resourceService: ResourceService,
    private router: Router) { }

  ngOnInit() {
    this.reloadData();
    this.refreshData();
  }

  //Loading resource details
  reloadData() {
    this.resources = this.resourceService.getResourceList();
    /*
    this.resourceService.getResourceList().subscribe(
      data => {
        console.log(data)
        //Testing
       this.resources = data
      },
      error => {
        console.log(error);
      }
      ) 
    */
  }

  //Refresh dropdown elements
  refreshData() {
    this.resourcesInfo = this.resourceService.getResourceMaster();
  }

  //Search dropdown
  onOptionsSelected(value: string) {
    console.log("the selected value is " + value);

    if (value != '0') {
      this.resources = this.resourceService.getResourceListByName(value);
    }
    else {
      this.resources = this.resourceService.getResourceList();
    }

  }

  //Edit resource details
  editResource(resourceId: number) {
    this.router.navigate(['../resourceupdate', resourceId]);
  }

  
}
