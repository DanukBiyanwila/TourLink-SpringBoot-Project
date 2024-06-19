import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { DriverGuidePackage } from "app/model/driver-guide-package";
import { DriverGuidePackageService } from "app/service/driver-guide-package.service";


@Component({
    selector: 'update-guide-package-form-cmp',
    moduleId: module.id,
    templateUrl: 'guide-package-form.component.html'
})

export class UpdateGuidePackageFormComponent implements OnInit{

    driverPackage: DriverGuidePackage = new DriverGuidePackage();
    packageId: string;

    constructor(private packageService: DriverGuidePackageService, private activatedRouter: ActivatedRoute,
        private router: Router,private snackBar: MatSnackBar
    ) {}
    
    ngOnInit(): void {
        this.packageId = this.activatedRouter.snapshot.params['id'];
        this.packageService.getSinglePackageDetails(this.packageId).subscribe(data => {
            this.driverPackage = data;
        })
    }

    savePackage() {
        this.packageService.createGuidePackage(this.driverPackage).subscribe(data => {
            console.log(data);
            this.snackBar.open('Guide Package Update Successfully!.', 'Close', {
                duration: 2000,
              });
            this.navigateToGuideList();
        },error => console.log(error))
    }

    navigateToGuideList(){
        this.router.navigate(['guide_packages'])
    }

    onSubmit(){
        
        this.savePackage()
    }
}