import { Component, Input, OnInit } from "@angular/core";
import { HotelUserRatingDTO } from "app/dto/hotel-user-rating-dto";
import { HotelUserRatingDTOService } from "app/service/hotel-user-rating-dto.service";


@Component({
    selector: 'hotel-reviews-cmp',
    moduleId: module.id,
    templateUrl: 'hotel-reviews.component.html',
    styleUrls: ['hotel-reviews.component.css']
})

export class HotelReviewsComponent implements OnInit{

    @Input() hotelId: string;
    reviews: HotelUserRatingDTO[];

    constructor(private hotelUserService: HotelUserRatingDTOService) {}

    ngOnInit(): void {
        this.hotelUserService.getAllHotelRatingById(this.hotelId).subscribe(data => {
            this.reviews = data;
        })
    }

}