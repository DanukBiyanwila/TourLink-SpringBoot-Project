import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "app/model/user";
import { UserService } from "app/service/user.service";
import { AuthService } from 'app/service/auth.service';
import { CartService } from 'app/service/cart.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'admin-driver-list-cmp',
    moduleId: module.id,
    templateUrl: 'admin-driver-list.component.html'
})


export class AdminDriverListComponent implements OnInit{

    users: User[];
    filteredUsers: User[];
    searchQuery: string = '';

    constructor(private userService: UserService, private router: Router,
        private authService: AuthService,private cartService: CartService,
        private snackBar: MatSnackBar 
    ) {}

    getUserRole() {
        return this.authService.getUserRole();
      }

    getUserId() {
        return this.authService.getUserId();
      }

    ngOnInit(): void {
        const userRole = this.authService.getUserRole();
        this.getAllDrivers();
    }
   

    private getAllDrivers() {
        this.userService.getAllDrivers().subscribe(data =>{
            this.users = data;
            this.filteredUsers = [...this.users]
        })
    }

    applyFilter(){
        if (!this.searchQuery.trim()) {
            this.filteredUsers = [...this.users];
            return;
          }

        this.filteredUsers = this.users.filter(user => 
            user.firstName.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase()) ||
            user.country.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase()) ||
            user.email.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase())
        )
    }

    driverPackages(id: string){
        this.router.navigate(['driver-packages', id])
    }

    driverDetails(id: string){
        this.router.navigate(['guide_details', id])
    }
    addToCart(id: string) {
        const extraString = "2"; 
        const userId = this.authService.getUserId();
        this.cartService.addToCart(id, userId, extraString).subscribe(data => {
          this.getAllDrivers();
        });
      }


      exportToExcel(): void {
        const date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-');
        const fileName = `drivers_${date}.xlsx`;
      
        const data = this.users.map(user => ({
        FirstName: user.firstName,
        LastName: user.lastName,
        Age: user.age,
        Address: user.address,
        Email: user.email,
        phone: user.phone,
        }));
      
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, fileName);
      }
      
    
      downloadExcel(): void {
        this.getAllDrivers(); 
        setTimeout(() => {
          this.snackBar.open('Document generation has successfully complete.', 'Close', {
            duration: 2000,
          });
          this.exportToExcel();
        }, 1000); 
      }
}