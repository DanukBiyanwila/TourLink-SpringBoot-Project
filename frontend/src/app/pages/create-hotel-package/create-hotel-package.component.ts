import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { HotelPackage } from "app/model/hotel-package";
import { AuthService } from "app/service/auth.service";
import { HotelPackagesServiceService } from "app/service/hotel-packages-service.service";

@Component({
    selector: 'create-hotel-package-cmp',
    moduleId: module.id,
    templateUrl: 'create-hotel-package.component.html'
})


export class CreateHotelPackageComponent implements OnInit{

    hotelId: string;
    hotelPackage: HotelPackage = new HotelPackage();
    userAccountId: string;

    constructor(private hotelPackageService: HotelPackagesServiceService, private activatedRouter: ActivatedRoute, 
        private authService: AuthService, private router: Router, private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.hotelId = this.activatedRouter.snapshot.params['id'];
        this.userAccountId = this.authService.getUserAccountId();
    }

    saveHotelPackage(){
        this.hotelPackageService.createHotelPackage(this.hotelPackage).subscribe(data =>{
            console.log(data);
            this.snackBar.open('Hotel Package Saved Successfully!.', 'Close', {
                duration: 2000,
              });
            this.navigateToHotelList();
        },error => console.log(error))
    }

    navigateToHotelList(){
        this.router.navigate(['hotels'])
    }

    onSubmit() {
        this.hotelPackage.hotelId = this.hotelId;
        this.hotelPackage.insertUserId = this.userAccountId;
        console.log(this.hotelPackage);
        this.saveHotelPackage();
    }

}