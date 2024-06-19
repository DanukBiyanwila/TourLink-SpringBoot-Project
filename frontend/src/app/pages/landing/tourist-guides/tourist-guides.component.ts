import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DriverGuideRatingDto } from "app/dto/driver-guide-rating-dto";
import { User } from "app/model/user";
import { AuthService } from "app/service/auth.service";
import { DriverGuideRatingService } from "app/service/driver-guide-rating.service";
import { UserService } from "app/service/user.service";


@Component({
    selector: 'tourist-guides-cmp',
    templateUrl: 'tourist-guides.component.html',
    styleUrls: ['../landing.component.scss', '../style.component.css']
  })


export class TouristGuidesComponent implements OnInit{

    guides: User[];
    type: string;
    title: string;
    userRole: string;

    constructor(private userService: UserService, private activatedRouter: ActivatedRoute,
        private userRatingService: DriverGuideRatingService,
    private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.type = this.activatedRouter.snapshot.params['type'];
        this.userRole = this.authService.getUserRole();

        if(this.type == "guide"){
            this.title = "Guides"
            this.getAllTourGuides();
        }

        if(this.type == "driver"){
            this.title = "Drivers"
            this.getAllDrivers();
        }



    }

    async getAllTourGuides() {
        try {
          const guides = await this.userService.getAllGuides().toPromise();
          for (const guide of guides) {
            guide.averageRating = await this.getAverageRatingForUser(guide.id);
          }
          this.guides = guides.sort((a, b) => b.averageRating - a.averageRating).slice(0, 3);
        } catch (error) {
          console.error('Error fetching tour guides:', error);
        }
      }

      async getAllDrivers() {
        try {
          const drivers = await this.userService.getAllDrivers().toPromise();
          for (const driver of drivers) {
            driver.averageRating = await this.getAverageRatingForUser(driver.id);
          }
          this.guides = drivers.sort((a, b) => b.averageRating - a.averageRating).slice(0, 3);
        } catch (error) {
          console.error('Error fetching drivers:', error);
        }
      }

      async getAverageRatingForUser(userId: string): Promise<number> {
        try {
          const ratings = await this.userRatingService.getAllDriverGuideRatingById(userId).toPromise();
          return this.calculateAverage(ratings);
        } catch (error) {
          console.error('Error fetching ratings for user:', error);
          return 0;
        }
      }

      private calculateAverage(ratings: DriverGuideRatingDto[]) : number {
        let totalRating = 0;
        for (const rating of ratings) {
          totalRating += rating.rating;
        }
        return ratings.length > 0 ? totalRating / ratings.length : 0;
      }



      dgPackage(id: string, type: string){
        this.router.navigate(['tourist-dg-packages', id,type]);
        console.log("click",type)
      }


      showPopup: boolean = false;
      idToSend: string;
      rateType: string;
    
      openPopup(id: string, ty: string) {
        this.idToSend = id;
        this.rateType = ty;
        this.showPopup = true;
      }
}