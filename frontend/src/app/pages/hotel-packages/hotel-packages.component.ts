import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HotelPackage } from "app/model/hotel-package";
import { HotelPackagesServiceService } from "app/service/hotel-packages-service.service";

import { AuthService } from 'app/service/auth.service';
import { CartService } from 'app/service/cart.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'hotel_package-cmp',
    moduleId: module.id,
    templateUrl: 'hotel-packages.component.html',
    styleUrls: ['hotel-packages.component.css']
})

export class HotelPackagesComponent implements OnInit{

    hotelPackages: HotelPackage[];
    id: string;
    filteredHotelPackages: HotelPackage[];
    searchQuery: string = '';
    hotelName: string;

    constructor(private hotelPackagesService: HotelPackagesServiceService, private activatedRouter: ActivatedRoute, private router: Router,
        private authService: AuthService,private cartService: CartService,private snackBar: MatSnackBar) { }

    getUserRole() {
        return this.authService.getUserRole();
      }
      getUserId() {
        return this.authService.getUserId();
      }
    ngOnInit(): void {
        const userRole = this.authService.getUserRole();
        this.id = this.activatedRouter.snapshot.params['id'];
        this.getHotelPackage();
        
    }

    getHotelPackage(){
        this.hotelPackagesService.gelAllHotelPackagesById(this.id).subscribe(data => {
            this.getHotelName(data);
            this.hotelPackages = data;
            this.filteredHotelPackages = [...this.hotelPackages];
        })
    }

    getHotelName(data){
        this.hotelName = data[0].hotel.name;
        console.log(this.hotelName)
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

    hotelPackageCreate(id: string){
        this.router.navigate(['create_hotel_package', id])
    }


    updateHotelPackage(id: string){
        this.router.navigate(['update_hotel_package', id])
    }

    deleteHotelPackage(id: string){
        this.hotelPackagesService.deleteHotelPackageById(id).subscribe(data => {
            this.getHotelPackage();
        })
    }

    addToCart(id: string) {
        const extraString = "1"; 
        const userId = this.authService.getUserId();
        this.cartService.addToCart(id, userId, extraString).subscribe(data => {
          this.getHotelPackage();
        });
      }


      exportToExcel(): void {
        const date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-');
        const fileName = `${this.hotelName}_packages_${date}.xlsx`;
      
        const data = this.hotelPackages.map(hotel => ({
          Name: hotel.name,
          Price: hotel.price,
          RoomType: hotel.roomType,
          BedType: hotel.bedType,
          Adults: hotel.maxAdults,
          Childrens: hotel.maxChildren,
          Description: hotel.description,
        }));
      
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, fileName);
      }
      
    
      downloadExcel(): void {
        this.getHotelPackage(); 
        setTimeout(() => {
          this.snackBar.open('Document generation has successfully complete.', 'Close', {
            duration: 2000,
          });
          this.exportToExcel();
        }, 1000); 
      }
}