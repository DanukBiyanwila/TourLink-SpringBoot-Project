import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { HotelPackage } from "app/model/hotel-package";
import { AuthService } from "app/service/auth.service";
import { CartService } from "app/service/cart.service";
import { HotelPackagesServiceService } from "app/service/hotel-packages-service.service";
import { error } from "console";


@Component({
    selector: 'tourist-hotel-packages',
    templateUrl: 'tourist-hotel-packages.component.html',
    styleUrls: ['../landing.component.scss', '../style.component.css']
  })

export class TouristHotelPackageComponent implements OnInit{

    hotelPackages: HotelPackage[];
    id: string;
    filteredHotelPackages: HotelPackage[];
    searchQuery: string = '';
    userRole: string;

    constructor(private hotelPackagesService: HotelPackagesServiceService, private activatedRouter: ActivatedRoute,
        private authService: AuthService,private cartService: CartService, private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.userRole = this.authService.getUserRole();
        this.id = this.activatedRouter.snapshot.params['id'];
        this.getHotelPackage();
    }

    getHotelPackage(){
        this.hotelPackagesService.gelAllHotelPackagesById(this.id).subscribe(data => {
            this.hotelPackages = data;
            this.filteredHotelPackages = [...this.hotelPackages];
        })
    }


    applyFilter() {
        if (!this.searchQuery.trim()) {
          this.filteredHotelPackages = [...this.hotelPackages];
          return;
        }
    
        this.filteredHotelPackages = this.hotelPackages.filter(packages =>
            packages.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            packages.roomType.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            packages.price.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            packages.bedType.toLowerCase().includes(this.searchQuery.toLowerCase()) 
        );
      }


      addToCart(id: string) {
        const extraString = "1"; 
        const userId = this.authService.getUserId();
        this.cartService.addToCart(id, userId, extraString).subscribe(data => {
          this.getHotelPackage();

        }, error => {
            this.snackBar.open('Package has been added to your cart.', 'Close', {
                duration: 2000,
              });
        });
      }
      

}