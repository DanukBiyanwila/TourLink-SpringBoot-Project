import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { User } from "app/model/user";
import { UserService } from "app/service/user.service";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
    selector: 'admin-guide-list-cmp',
    moduleId: module.id,
    templateUrl: 'admin-guide-list.component.html'
})


export class AdminGuideListComponent implements OnInit{

    users: User[];
    filteredUsers: User[];
    searchQuery: string = '';

    constructor(private userService: UserService, private router: Router,private snackBar: MatSnackBar) {}

    ngOnInit(): void {
        this.getAllTourGuides();
    }

    private getAllTourGuides() {
        this.userService.getAllGuides().subscribe(data =>{
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

    guideDetails(id: string){
        this.router.navigate(['guide_details', id])
    }

    guidePackages(id: string){
        this.router.navigate(['guide_packages', id])
    }

    exportToExcel(): void {
        const date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-');
        const fileName = `guides_${date}.xlsx`;
      
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
        this.getAllTourGuides(); 
        setTimeout(() => {
            this.snackBar.open('Document generation has successfully complete.', 'Close', {
                duration: 2000,
              });
          this.exportToExcel();
        }, 1000); 
      }

}