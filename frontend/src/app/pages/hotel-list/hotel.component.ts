import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'app/model/hotel';
import { HotelService } from 'app/service/hotel.service';
import { AuthService } from 'app/service/auth.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'hotel-cmp',
    moduleId: module.id,
    templateUrl: 'hotel.component.html'
})

export class HotelComponent implements OnInit{

    hotels: Hotel[];
    filteredHotels: Hotel[];
    searchQuery: string = '';

    constructor(private hotelService: HotelService, private router: Router,private authService: AuthService
      ,private snackBar: MatSnackBar,private dialog: MatDialog
    ) {}


    getUserRole() {
        return this.authService.getUserRole();
      }
    ngOnInit(): void {
      const userRole = this.authService.getUserRole();
        this.getHotels();
    }

    

  private getHotels() {
    this.hotelService.gelAllHotels().subscribe(data => {
      this.hotels = data;
      this.filteredHotels = [...this.hotels];
    });
  }

  applyFilter() {
    if (!this.searchQuery.trim()) {
      this.filteredHotels = [...this.hotels];
      return;
    }

    this.filteredHotels = this.hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      hotel.country.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      hotel.city.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

    hotelDetails(id: string){
        this.router.navigate(['hotel_details', id])
    }

    hotelPackages(id: string){
        this.router.navigate(['hotel_packages', id])
    }

    hotelCreate(){
        this.router.navigate(['hotel_create'])
    }

    hotelUpdate(id: string){
        this.router.navigate(['hotel_update', id])
    }

    openDialog(id: string) {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          message: 'Are you sure want to delete?',
          buttonText: {
            ok: 'Yes',
            cancel: 'No',
          },
        },
      });
      // const snack = this.snackBar.open('Snack bar open before dialog');
  
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.hotelDelete(id)
          // snack.dismiss();
          // const a = document.createElement('a');
          // a.click();
          // a.remove();
          // snack.dismiss();
          this.snackBar.open('Hotel deleted!', 'Fechar', {
            duration: 2000,
          });
        }
      });
    }

    hotelDelete(id: string){
        this.hotelService.deleteHotel(id).subscribe(data => {
            this.getHotels()
        })
    }

    exportToExcel(): void {
      const boldStyle = { bold: true }; 
      const date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-');
      const fileName = `hotels_${date}.xlsx`;
    
      const data = this.hotels.map(hotel => ({
        Name: hotel.name,
        Address: hotel.address,
        City: hotel.city,
        Counry: hotel.country,
        Email: hotel.email,
        ZipCode: hotel.zipCode,
        Description: hotel.description,
      }));
    
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, fileName);
    }
    
  
    downloadExcel(): void {
      this.getHotels(); 
      setTimeout(() => {
        this.snackBar.open('Document generation has successfully complete.', 'Close', {
          duration: 2000,
        });
        this.exportToExcel();
      }, 1000); 
    }

}