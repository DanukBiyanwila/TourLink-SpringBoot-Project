import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { HotelPackage } from "app/model/hotel-package";
import { HotelPackagesServiceService } from "app/service/hotel-packages-service.service";

@Component({
    selector: 'update-hotel-package-cmp',
    moduleId: module.id,
    templateUrl: 'create-hotel-package.component.html'
})


export class UpdateHotelPackageComponent implements OnInit{

    id: string;
    hotelPackage: HotelPackage = new HotelPackage();

    constructor(private hotelPackageService: HotelPackagesServiceService, private activatedRouter: ActivatedRoute,
        private router: Router, private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.id = this.activatedRouter.snapshot.params['id'];
        this.hotelPackageService.getHotelPackageById(this.id).subscribe(data => {
            this.hotelPackage = data;
        })
    }

    saveHotelPackage(){
        this.hotelPackageService.createHotelPackage(this.hotelPackage).subscribe(data =>{
            console.log(data);
            this.snackBar.open('Hotel Package Update Successfully!.', 'Close', {
                duration: 2000,
              });
            this.navigateToHotelList();
        },error => console.log(error))
    }

    navigateToHotelList(){
        this.router.navigate(['hotels'])
    }

    onSubmit() {
        console.log(this.hotelPackage);
        this.saveHotelPackage();
    }

}