import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { DriverGuidePackage } from "app/model/driver-guide-package";
import { DriverGuidePackageService } from "app/service/driver-guide-package.service";

@Component({
    selector: 'update-driver-package-form-cmp',
    moduleId: module.id,
    templateUrl: 'driver-package-form.component.html'
})

export class UpdateDriverPackageFormComponent implements OnInit{

    driverPackage: DriverGuidePackage = new DriverGuidePackage();
    id: string;

    constructor(private packageService: DriverGuidePackageService,  private activatedRouter: ActivatedRoute,
        private router: Router,private snackBar: MatSnackBar
    ) {}
    
    ngOnInit(): void {
        this.id = this.activatedRouter.snapshot.params['id'];
        this.packageService.getSinglePackageDetails(this.id).subscribe(data => {
            this.driverPackage = data;
        })
    }

    savePackage() {
        this.packageService.createDriverPackage(this.driverPackage).subscribe(data => {
            console.log(data);
            this.snackBar.open('Driver Package Update Successfully!.', 'Close', {
                duration: 2000,
              });
            this.navigateToDriverList();
        },error => console.log(error))
    }

    navigateToDriverList(){
        this.router.navigate(['driver-packages'])
    }

    onSubmit(){
        console.log(this.driverPackage)
        this.savePackage()
    }
}