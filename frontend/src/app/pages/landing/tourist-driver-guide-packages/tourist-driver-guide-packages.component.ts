import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { DriverGuidePackage } from "app/model/driver-guide-package";
import { AuthService } from "app/service/auth.service";
import { CartService } from "app/service/cart.service";
import { DriverGuidePackageService } from "app/service/driver-guide-package.service";



@Component({
    selector: 'tourist-driver-guide-packages-cpm',
    templateUrl: 'tourist-driver-guide-packages.component.html',
    styleUrls: ['../landing.component.scss', '../style.component.css']
  })


  export class TouristDriverGuidePackageComponent implements OnInit{

    userId: string;
    userType: string;
    packages: DriverGuidePackage[];
    userRole: string;
    filteredDriverGuidePackage: DriverGuidePackage[];
    searchQuery: string = '';
    title: string;
    extraString: string;

    constructor(private driverGuidePackageService: DriverGuidePackageService, 
        private activatedRouter: ActivatedRoute,private authService: AuthService, 
        private cartService: CartService, private snackBar: MatSnackBar) {}

    ngOnInit(): void {
        this.getPackage();
    }

    private getPackage(){
        this.userId = this.activatedRouter.snapshot.params['id'];
        this.userType = this.activatedRouter.snapshot.params['type'];
        this.userRole = this.authService.getUserRole();
        this.driverGuidePackageService.getAllDriverPackages(this.userId).subscribe(data => {
            this.packages = data;
            console.log(this.packages)
            this.filteredDriverGuidePackage = [...this.packages]
        })
    }


    applyFilter() {
        if (!this.searchQuery.trim()) {
          this.filteredDriverGuidePackage = [...this.packages];
          return;
        }
    
        this.filteredDriverGuidePackage = this.packages.filter(packag =>
            packag.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            packag.price.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            packag.noOfPeoples.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      addToCart(id: string) {
        if(this.userType == "guide"){
            this.extraString = "3"; 
        }

        if(this.userType == "driver"){
            this.extraString = "2"; 
        }
        
        const userId = this.authService.getUserId();
        this.cartService.addToCart(id, userId, this.extraString).subscribe(data => {
          this.getPackage();
        }, error => {
            this.snackBar.open('Package has been added to your cart.', 'Close', {
                duration: 2000,
              });
        });
      }

  }