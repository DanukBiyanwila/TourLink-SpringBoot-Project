import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DriverGuidePackage } from "app/model/driver-guide-package";
import { AuthService } from "app/service/auth.service";
import { DriverGuidePackageService } from "app/service/driver-guide-package.service";
import { CartService } from 'app/service/cart.service';
import { User } from "app/model/user";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from "app/service/user.service";


@Component({
    selector: 'driver-package-cmp',
    moduleId: module.id,
    templateUrl: 'driver-package.component.html',
    styleUrls: ['driver-package.component.css']
    
})

export class DriverPackageComponent implements OnInit{

  driverId: string;
    packages: DriverGuidePackage[];
    userRole: string;
    filteredDriverGuidePackage: DriverGuidePackage[];
    searchQuery: string = '';
    user: User = new User();
    userName: string;

    constructor(private driverGuidePackageService: DriverGuidePackageService, 
        private activatedRouter: ActivatedRoute, private authService: AuthService, 
        private router: Router,private cartService: CartService,private snackBar: MatSnackBar,
        private userService: UserService) {}

    getUserRole() {
        return this.authService.getUserRole();
      }
    getUserId() {
        return this.authService.getUserId();
      }

    ngOnInit(): void {
        this.userRole = this.authService.getUserRole();
        this.getPackage();
    }
   
    private getPackage(){
        this.driverId = this.activatedRouter.snapshot.params['id'];
        this.driverGuidePackageService.getAllDriverPackages(this.driverId).subscribe(data => {
            this.packages = data;
            this.filteredDriverGuidePackage = [...this.packages]
        })

        this.userRole = this.authService.getUserRole();

        this.userService.getGuideById(this.driverId).subscribe(data => {
          this.user = data;
          console.log(this.user)
          this.userName = this.user.firstName;
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
        const extraString = "2"; 
        const userId = this.authService.getUserId();
        this.cartService.addToCart(id, userId, extraString).subscribe(data => {
          this.getPackage();
        });
      }

      exportToExcel(): void {
        const date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-');
        const fileName = `${this.userName}_packages_${date}.xlsx`;
      
        const data = this.packages.map(pack => ({
          Name: pack.name,
          Price: pack.price,
          Peoples: pack.noOfPeoples,
          Description: pack.description,
        }));
      
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, fileName);
      }
      
    
      downloadExcel(): void {
        this.getPackage(); 
        setTimeout(() => {
          this.snackBar.open('Document generation has successfully complete.', 'Close', {
            duration: 2000,
          });
          this.exportToExcel();
        }, 1000); 
      }

}