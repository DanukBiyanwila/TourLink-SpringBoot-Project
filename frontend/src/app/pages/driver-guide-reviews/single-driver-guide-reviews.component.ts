import { Component, Input, OnInit } from "@angular/core";
import { DriverGuideRatingDto } from "app/dto/driver-guide-rating-dto";
import { AuthService } from "app/service/auth.service";
import { DriverGuideRatingService } from "app/service/driver-guide-rating.service";



@Component({
    selector: 'single-driver-guide-reviews-cmp',
    moduleId: module.id,
    templateUrl: 'driver-guide-reviews.component.html',
    styleUrls: ['driver-guide-reviews.component.css']
})

export class SingleDriverGuideReviewComponent implements OnInit {

    reviews: DriverGuideRatingDto[];
    userId: string

    constructor(private service: DriverGuideRatingService, private authService: AuthService) {}

    ngOnInit(): void {
        this.userId = this.authService.getSessionUserId();
        this.service.getAllDriverGuideRatingById(this.userId).subscribe(data => {
            this.reviews = data;
        })
    }

}