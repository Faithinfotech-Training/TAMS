import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeOfUse } from 'src/app/shared/typeofuse';
import { Resourcedetails } from 'src/app/shared/resourcedetails';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResourceService } from 'src/app/shared/resource.service';
import { Resourcemaster } from 'src/app/shared/resourcemaster';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resource-add',
  templateUrl: './resource-add.component.html',
  styleUrls: ['./resource-add.component.scss']
})
export class ResourceAddComponent implements OnInit {

  resources: Observable<Resourcedetails[]>
  resourceDetails: Resourcedetails = new Resourcedetails();

  submitted = false;
  addResourceForm: FormGroup;
  addResourceType: FormGroup;
  resourceMaster: Observable<Resourcemaster[]>;
  rM: Resourcemaster;
  fileToUpload: File = null;
  fileData: File = null;

  typesofUse: TypeOfUse[] = [
    { id: 1, name: 'Internal' },
    { id: 2, name: 'External' }
  ];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private resourceService: ResourceService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.createForm();
    this.resourceMasterDropDown();
  }

  //Populate dropdown
  resourceMasterDropDown() {
    this.resourceMaster = this.resourceService.getResourceMaster();
    console.log(this.resourceMaster);

    /*
    this.resourceService.getResourceMaster().subscribe(
      data => {
        console.log(data)
        //Testing
        this.resourceMaster = data
      },
      error => {
        console.log(error);
      }
    )*/
  }

  //Form
  createForm() {

    this.addResourceType = this.fb.group({
      resourceTypeId: ['', Validators.required]
    });

    this.addResourceForm = this.fb.group({
      //resourceTypeId: [0, Validators.required],
      // resourceType: [''],
      resourceCapacity: ['', Validators.required],
      noOfSystems: ['', Validators.required],
      projector: ['', Validators.required],
      whiteBoard: ['', Validators.required],
      //typeOfUse: [0, Validators.required],
      resourceRate: ['', Validators.required]

    });
   
  }

  onSubmit() {
    this.submitted = true;
    this.resourceDetails.resource = this.addResourceType.value;
    this.resourceDetails.resourceCapacity = this.addResourceForm.controls.resourceCapacity.value;
    this.resourceDetails.noOfSystems = this.addResourceForm.controls.noOfSystems.value;
    this.resourceDetails.projector = this.addResourceForm.controls.projector.value;
    this.resourceDetails.whiteBoard = this.addResourceForm.controls.whiteBoard.value;
    //this.resourceDetails.typeOfUse = this.addResourceForm.controls.typeOfUse.value;
    this.resourceDetails.resourceRate = this.addResourceForm.controls.resourceRate.value;
    this.resourceDetails.typeOfUse = "Available";
    this.resourceDetails.isBooked = "N";
    this.resourceDetails.isAccepted = "N";
    this.resourceDetails.isActive = "Y";
    this.resourceDetails.picturePath = "assets/" + this.fileToUpload.name;
    //console.log(this.resourceDetails);
    //console.log(this.addResourceForm.get('resource').get('resourceTypeId').value);
    console.log(this.resourceDetails);
    this.save();
 
  }

  save() {
    console.log(this.resourceDetails);
    this.resourceService.createResourceDetails(this.resourceDetails)
      .subscribe(data => console.log(data), error => console.log(error));
    //this.employee = new Employee();
    this.gotoList();
    this.toastr.success('Resource has been successfully created', 'RMSv2020');
    //throw new Error("Method not implemented.");
  }

  gotoList() {
    this.resources = this.resourceService.getResourceList();
    this.router.navigate(['../resourcelist']);
  }

 
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload.name);
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }


  backToResourceInfo() {
    this.router.navigate(['../resourcelist']);
  }

}
