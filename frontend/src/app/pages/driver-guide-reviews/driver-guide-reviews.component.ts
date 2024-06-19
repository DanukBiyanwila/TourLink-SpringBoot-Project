import { Component, Input, OnInit } from "@angular/core";
import { DriverGuideRatingDto } from "app/dto/driver-guide-rating-dto";
import { DriverGuideRatingService } from "app/service/driver-guide-rating.service";



@Component({
    selector: 'driver-guide-reviews-cmp',
    moduleId: module.id,
    templateUrl: 'driver-guide-reviews.component.html',
    styleUrls: ['driver-guide-reviews.component.css']
})

export class DriverGuideReviewComponent implements OnInit {

    @Input() userId: string;
    reviews: DriverGuideRatingDto[];

    constructor(private service: DriverGuideRatingService) {}

    ngOnInit(): void {
        this.service.getAllDriverGuideRatingById(this.userId).subscribe(data => {
            this.reviews = data;
        })
    }

}