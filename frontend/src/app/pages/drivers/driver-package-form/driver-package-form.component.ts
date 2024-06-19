import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DriverGuidePackage } from "app/model/driver-guide-package";
import { AuthService } from "app/service/auth.service";
import { DriverGuidePackageService } from "app/service/driver-guide-package.service";

@Component({
    selector: 'driver-package-form-cmp',
    moduleId: module.id,
    templateUrl: 'driver-package-form.component.html'
})

export class DriverPackageFormComponent implements OnInit{

    driverPackage: DriverGuidePackage = new DriverGuidePackage();
    driverId: string;

    constructor(private packageService: DriverGuidePackageService, 
        private authService: AuthService,private router: Router,private snackBar: MatSnackBar
    ) {}
    
    ngOnInit(): void {
        this.driverId = this.authService.getUserAccountId();
    }

    savePackage() {
        this.packageService.createDriverPackage(this.driverPackage).subscribe(data => {
            console.log(data);
            this.snackBar.open('Driver Package Saved Successfully!.', 'Close', {
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
        this.driverPackage.insertUserId = this.driverId;
        this.savePackage()
    }
}