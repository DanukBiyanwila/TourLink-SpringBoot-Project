import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DriverGuidePackage } from "app/model/driver-guide-package";
import { AuthService } from "app/service/auth.service";
import { DriverGuidePackageService } from "app/service/driver-guide-package.service";

import { CartService } from 'app/service/cart.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from "app/model/user";
import { UserService } from "app/service/user.service";
import { ConfirmationDialog } from "app/pages/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: 'single-guide-package-cmp',
    moduleId: module.id,
    templateUrl: 'guide-package.component.html',
    styleUrls: ['guide-package.component.css']
})

export class SingleGuidePackageComponent implements OnInit{

    id: string;
    packages: DriverGuidePackage[];
    userRole: string;
    filteredDriverGuidePackage: DriverGuidePackage[];
    searchQuery: string = '';
    guideId: string;
    user: User = new User();
    userName: string;

    constructor(private driverGuidePackageService: DriverGuidePackageService,
         private activatedRouter: ActivatedRoute, private authService: AuthService, 
        private cartService: CartService,private router: Router,private snackBar: MatSnackBar,
        private userService: UserService,  private dialog: MatDialog) {}


    getUserRole() {
        return this.authService.getUserRole();
    }
    getUserId() {
        return this.authService.getUserId();
    }

    ngOnInit(): void {
        const userRole = this.authService.getUserRole();
        this.getPackage();
    }

    private getPackage(){
        this.guideId = this.authService.getSessionUserId();
        this.driverGuidePackageService.getAllGuidePackages(this.guideId).subscribe(data => {
            this.packages = data;
            this.filteredDriverGuidePackage = [...this.packages]
        })

        this.userRole = this.authService.getUserRole();
        console.log("guide id", this.guideId)

        this.userService.getGuideById(this.guideId).subscribe(data => {
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

    createPackage(){
        this.router.navigate(['create-guide-package'])
    }

    updateGuidePackage(id: string){
        this.router.navigate(['update-guide-package', id])
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
        
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed) {
            this.deleteGuidePackage(id)
            this.snackBar.open('Package deleted!', 'Fechar', {
              duration: 2000,
            });
          }
        });
      }

    deleteGuidePackage(id: string) {
        this.driverGuidePackageService.deletePackage(id).subscribe(data => {
            this.getPackage();
        })
    }

    addToCart(id: string) {
        const extraString = "3"; 
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