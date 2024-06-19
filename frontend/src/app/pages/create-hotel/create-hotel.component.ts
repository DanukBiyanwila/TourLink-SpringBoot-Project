import { Component, OnInit } from "@angular/core";
import { Hotel } from "app/model/hotel";
import { FormsModule } from "@angular/forms";
import { HotelService } from "app/service/hotel.service";
import { error } from "console";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/service/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'create-hotel-cmp',
    moduleId: module.id,
    templateUrl: 'create-hotel.component.html'
})

export class CreateHotelComponent implements OnInit{

    hotel: Hotel = new Hotel();
    hotelCheck: Hotel = new Hotel();
    id: string;
    userAccountId: string;

    constructor(private hotelService: HotelService, private router: Router, private activatedRouter: ActivatedRoute, 
        private authService: AuthService, private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.id = this.activatedRouter.snapshot.params['id']; // get id from route
        if(this.id != null){

            this.hotelService.getHotelById(this.id).subscribe(data => {
                this.hotel = data;

    
            })

        }

        this.userAccountId = this.authService.getUserAccountId(); // get current user id from session
    }

    saveHotel(){
        this.hotelService.createHotel(this.hotel).subscribe(data =>{
            console.log(data);
            this.snackBar.open('Hotel Saved Successfully!.', 'Close', {
                duration: 2000,
              });
            this.navigateToHotelList();
        },error => console.log(error))
    }

    navigateToHotelList(){
        this.router.navigate(['hotels'])
    }

    onSubmit() {
        this.hotel.insertUserId = this.userAccountId;
        this.saveHotel();
    }

}