import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HotelUserRatingDTO } from "app/dto/hotel-user-rating-dto";
import { Hotel } from "app/model/hotel";
import { AuthService } from "app/service/auth.service";
import { HotelUserRatingDTOService } from "app/service/hotel-user-rating-dto.service";
import { HotelService } from "app/service/hotel.service";


@Component({
    selector: 'tourist-hotels-cmp',
    templateUrl: 'tourist-hotels.component.html',
    styleUrls: ['../landing.component.scss', '../style.component.css']
  })

  export class TouristHotelComponent implements OnInit{

    hotels: Hotel[];
    checkInDate: string;
    checkOutDate: string;
    userRole: string;

    constructor(private hotelService: HotelService, private hotelUserService: HotelUserRatingDTOService,
      private router: Router, private authService: AuthService
    ) {}

    ngOnInit(): void {
      this.userRole = this.authService.getUserRole();
        this.getHotels();
    }

    private getHotels() {
      this.hotelService.gelAllHotels().subscribe(data => {
        this.hotels = data;
        console.log("hotels", this.hotels)
        this.hotels.forEach(hotel =>{
          this.getHotelRatings(hotel.id)
        })
      });
    }
  
    private getHotelRatings(hotelId: string) {
      this.hotelUserService.getAllHotelRatingById(hotelId).subscribe(data => {
        
        const averageRating = this.calculateAverageRating(data);
        
        const hotel = this.hotels.find(h => h.id === hotelId);
        if (hotel) {
          hotel.averageRating = averageRating;
        }
        
        this.hotels.sort((a, b) => b.averageRating - a.averageRating);
       
        this.hotels = this.hotels;
        
      });
    }
  
    private calculateAverageRating(ratings: HotelUserRatingDTO[]): number {
      let totalRating = 0;
      for (const rating of ratings) {
        totalRating += rating.rating;
      }
      return ratings.length > 0 ? totalRating / ratings.length : 0;
    }


      searchRooms() {
        
        console.log('Check-in Date:', this.checkInDate);
        console.log('Check-out Date:', this.checkOutDate);
      }

      hotelPackages(id: string) {
        this.router.navigate(['tourist-hotel-packages', id])
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