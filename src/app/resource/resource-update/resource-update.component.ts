import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceService } from 'src/app/shared/resource.service';
import { ToastrService } from 'ngx-toastr';
import { Resourcedetails } from 'src/app/shared/resourcedetails';
import { Observable } from 'rxjs/internal/Observable';
import { Resourcemaster } from 'src/app/shared/resourcemaster';
import { TypeOfUse } from 'src/app/shared/typeofuse';

@Component({
  selector: 'app-resource-update',
  templateUrl: './resource-update.component.html',
  styleUrls: ['./resource-update.component.scss']
})
export class ResourceUpdateComponent implements OnInit {

  resourceId: number;
  res: Resourcedetails = new Resourcedetails();
  editResourceForm: FormGroup;
  resourceType: Observable<Resourcemaster[]>;
  resource: Resourcedetails;
  addResourceType: FormGroup;

  resources: Observable<Resourcedetails[]>
  resourceDetails: Resourcedetails = new Resourcedetails();

  submitted = false;
  resourceMaster: Observable<Resourcemaster[]>;
  fileToUpload: File = null;
  fileData: File = null;
  fileName: string = 'assets/';

  typesofUse: TypeOfUse[] = [
    { id: 1, name: 'Available' },
    { id: 2, name: 'Internal' },
    { id: 3, name: 'External' }
  ];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private resourceService: ResourceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    // getting value passed in url
    this.resourceId = this.route.snapshot.params['resourceId'];
    console.log(this.resourceId);
    this.fileName = 'assets/';

    // local method calling
    this.createForm();
    this.resourceMasterDropDown();

    // search resourceby id
    this.resourceService.searchById(this.resourceId).subscribe(
      data => {
        this.res = data;
        console.log(this.res);
      },
      error => console.log(error)
    );


  }

  //Form
  createForm() {

    this.addResourceType = this.fb.group({
      resourceTypeId: ['', Validators.required]
    });

    this.editResourceForm = this.fb.group({
      resourceId: [''],
      resourceCapacity: ['', Validators.required],
      noOfSystems: ['', Validators.required],
      projector: ['', Validators.required],
      whiteBoard: ['', Validators.required],
      typeOfUse: ['', Validators.required],
      resourceRate: ['', Validators.required],
      picturePath: ['']
    });

  }

  //Populate drop down
  resourceMasterDropDown() {
    this.resourceMaster = this.resourceService.getResourceMaster();
    console.log(this.resourceMaster);
  }

  onSubmit() {
    this.submitted = true;
    this.resourceDetails.resource = this.addResourceType.value;
    this.resourceDetails.resourceId = this.editResourceForm.controls.resourceId.value;
    this.resourceDetails.resourceCapacity = this.editResourceForm.controls.resourceCapacity.value;
    this.resourceDetails.noOfSystems = this.editResourceForm.controls.noOfSystems.value;
    this.resourceDetails.projector = this.editResourceForm.controls.projector.value;
    this.resourceDetails.whiteBoard = this.editResourceForm.controls.whiteBoard.value;
    this.resourceDetails.typeOfUse = this.editResourceForm.controls.typeOfUse.value;
    this.resourceDetails.resourceRate = this.editResourceForm.controls.resourceRate.value;
    //this.resourceDetails.typeOfUse = "Internal";
    this.resourceDetails.isBooked = "N";
    this.resourceDetails.isAccepted = "N";
    this.resourceDetails.isActive = "Y";
    if (this.fileName != 'assets/') {
      this.resourceDetails.picturePath = this.fileName;
    }
    else {
      this.resourceDetails.picturePath = this.editResourceForm.controls.picturePath.value;
    }

    //console.log(this.resourceDetails);
    //console.log(this.addResourceForm.get('resource').get('resourceTypeId').value);
    console.log(this.resourceDetails);
    this.save();

  }

  save() {
    console.log("Calling update...");
    console.log(this.resourceDetails);
    this.resourceService.updateResource(this.resourceDetails)
      .subscribe(data => console.log(data), error => console.log(error));
    //this.employee = new Employee();
    this.gotoList();
    this.toastr.success('Resource has been successfully updated', 'RMSv2020');
    //throw new Error("Method not implemented.");
  }

  gotoList() {
    this.resources = this.resourceService.getResourceList();
    this.router.navigate(['../resourcelist']);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload.name);
    this.fileName = this.fileName + files.item(0).name;
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

  activateResource(resourceId: number) {

    // changing value of isactive
    this.res.isActive = "Y";
    // calling update method
    this.resourceService.updateResource(this.res).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    this.toastr.success('Resource successfully Activated', 'RMSv2020');
    this.router.navigate(['../resourcelist']);
  }

  deActivateResource(resourceId: number) {
    // changing value of isactive
    this.res.isActive = "N";
    console.log(this.res);
    // calling update method
    this.resourceService.updateResource(this.res).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    this.toastr.success('Resource successfully Deactivated', 'RMSv2020');
    this.router.navigate(['../resourcelist']);
  }

  backToResourceInfo() {
    this.router.navigate(['../resourcelist']);
  }

}
