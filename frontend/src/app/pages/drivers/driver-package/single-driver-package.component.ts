import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DriverGuidePackage } from "app/model/driver-guide-package";
import { AuthService } from "app/service/auth.service";
import { DriverGuidePackageService } from "app/service/driver-guide-package.service";
import { User } from "app/model/user";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from "app/service/user.service";
import { ConfirmationDialog } from "app/pages/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";



@Component({
    selector: 'single-driver-package-cmp',
    moduleId: module.id,
    templateUrl: 'driver-package.component.html',
    styleUrls: ['driver-package.component.css']
    
})

export class SingleDriverPackageComponent implements OnInit{

    driverId: string;
    packages: DriverGuidePackage[];
    userRole: string;
    filteredDriverGuidePackage: DriverGuidePackage[];
    searchQuery: string = '';
    user: User = new User();
    userName: string;

    constructor(private driverGuidePackageService: DriverGuidePackageService, 
        private activatedRouter: ActivatedRoute, private authService: AuthService, 
        private router: Router,private snackBar: MatSnackBar,
        private userService: UserService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.getPackage();
    }
    getUserRole() {
        return this.authService.getUserRole();
      }
    getUserId() {
        return this.authService.getUserId();
      }
    private getPackage(){
        this.driverId = this.authService.getSessionUserId();
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

    createPackage() {
        this.router.navigate(['create-driver-package'])
    }

    updateDriverPackage(id: string) {
        this.router.navigate(['update-driver-package', id])
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
          this.deleteDriverPackage(id)
          this.snackBar.open('Package deleted!', 'Fechar', {
            duration: 2000,
          });
        }
      });
    }


    deleteDriverPackage(id: string) {
        this.driverGuidePackageService.deletePackage(id).subscribe(data => {
            this.getPackage();
        })
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