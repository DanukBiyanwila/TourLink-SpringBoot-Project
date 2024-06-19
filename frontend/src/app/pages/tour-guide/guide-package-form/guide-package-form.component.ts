import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DriverGuidePackage } from "app/model/driver-guide-package";
import { AuthService } from "app/service/auth.service";
import { DriverGuidePackageService } from "app/service/driver-guide-package.service";
import { error } from "console";




@Component({
    selector: 'guide-package-form-cmp',
    moduleId: module.id,
    templateUrl: 'guide-package-form.component.html'
})

export class GuidePackageFormComponent implements OnInit{

    driverPackage: DriverGuidePackage = new DriverGuidePackage();
    guideId: string;

    constructor(private packageService: DriverGuidePackageService, private authService: AuthService,
        private router: Router,private snackBar: MatSnackBar
    ) {}
    
    ngOnInit(): void {
        this.guideId = this.authService.getUserAccountId();
    }

    savePackage() {
        this.packageService.createGuidePackage(this.driverPackage).subscribe(data => {
            console.log(data);
            this.snackBar.open('Guide Package Saved Successfully!.', 'Close', {
                duration: 2000,
              });
            this.navigateToGuideList();
        },error => console.log(error))
    }

    navigateToGuideList(){
        this.router.navigate(['guide_packages'])
    }

    onSubmit(){
        this.driverPackage.insertUserId = this.guideId;
        this.savePackage()
    }
}