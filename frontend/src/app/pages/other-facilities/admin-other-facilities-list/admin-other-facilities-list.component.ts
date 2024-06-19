import { Component, OnInit, VERSION } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { OtherFacilities } from "app/model/other-facilities";
import { ConfirmationDialog } from "app/pages/confirmation-dialog/confirmation-dialog.component";
import { OtherFacilitiesService } from "app/service/other-facilities.service";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
    selector: 'admin-other-facilities-list-cmp',
    moduleId: module.id,
    templateUrl: 'admin-other-facilities-list.component.html'
})


export class AdminOtherFacilitiesComponent implements OnInit{
    version = VERSION;

    otherFacilities: OtherFacilities[];
    filteredOtherFacilities: OtherFacilities[];
    searchQuery: string = '';

    constructor(private otherFacilitiesService: OtherFacilitiesService, private router: Router,
        private dialog: MatDialog, private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getAllOtherFacilities();
    }

    private getAllOtherFacilities(){
        this.otherFacilitiesService.getAllOtherFacilities().subscribe(data => {
            this.otherFacilities = data;
            this.filteredOtherFacilities = [...this.otherFacilities];
        })
    }

    applyFilter() {
        if (!this.searchQuery.trim()) {
          this.filteredOtherFacilities = [...this.otherFacilities];
          return;
        }
    
        this.filteredOtherFacilities = this.otherFacilities.filter(facilities =>
            facilities.serviceType.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            facilities.price.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            facilities.serviceLocation.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
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
            this.deleteOtherFacilities(id)
            this.snackBar.open('Facilitie deleted!', 'Fechar', {
              duration: 2000,
            });
          }
        });
      }

    createOtherFacilities(){
        this.router.navigate(['create_other-facilities'])
    }

    updateOtherFacilities(id: string){
        this.router.navigate(['update_other-facilities', id])
    }
    detailsOtherFacilities(id: string){
        this.router.navigate(['other-facilities-details', id])
    }

    deleteOtherFacilities(id: string){
        this.otherFacilitiesService.deleteOtherFacilities(id).subscribe(data => {
            this.getAllOtherFacilities()
        })
    }

    exportToExcel(): void {
      const date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-');
      const fileName = `other_facilities_${date}.xlsx`;
    
      const data = this.otherFacilities.map(other => ({
      ServiceType: other.serviceType,
      Price: other.price,
      ServiceDescription: other.serviceDescription,
      ServiceLocation: other.serviceLocation,
      }));
    
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, fileName);
    }
    
  
    downloadExcel(): void {
      this.getAllOtherFacilities(); 
      setTimeout(() => {
        this.snackBar.open('Document generation has successfully complete.', 'Close', {
          duration: 2000,
        });
        this.exportToExcel();
      }, 1000); 
    }
}