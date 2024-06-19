import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Hotel } from "app/model/hotel";
import { HotelService } from "app/service/hotel.service";

@Component({
    selector: 'hotel_details-cmp',
    moduleId: module.id,
    templateUrl: 'hotel_details.component.html'
})

export class HotelDetailsComponent implements OnInit{

    constructor(private hotelService: HotelService, private router: ActivatedRoute) {}

    hotel: Hotel = new Hotel();
    id: string;

    ngOnInit(): void {
        this.id = this.router.snapshot.params['id']; // get id from route
        this.hotelService.getHotelById(this.id).subscribe(data => {
            this.hotel = data;
        })
    }

}