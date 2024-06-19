import { Component, OnInit, VERSION } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { TravelInsurance } from "app/model/travel-insurance";
import { ConfirmationDialog } from "app/pages/confirmation-dialog/confirmation-dialog.component";
import { TravelInsuranceService } from "app/service/travel-insurance.service";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
    selector: 'admin-travel-insurance-list-cmp',
    moduleId: module.id,
    templateUrl: 'admin-travel-insurance-list.component.html'
})


export class AdminTravelInsuranceList implements OnInit{
    version = VERSION;

    travelInsurance: TravelInsurance[];
    filteredtravelInsurance: TravelInsurance[];
    searchQuery: string = '';

    constructor(private travelInsuranceService: TravelInsuranceService, private router: Router,
        private dialog: MatDialog, private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getAllInsurance();
    }

    private getAllInsurance(){
        this.travelInsuranceService.getAllTravelInsurance().subscribe(data => {
            this.travelInsurance = data;
            this.filteredtravelInsurance = [...this.travelInsurance]
        })
    }

    applyFilter() {
        if (!this.searchQuery.trim()) {
          this.filteredtravelInsurance = [...this.travelInsurance];
          return;
        }
    
        this.filteredtravelInsurance = this.travelInsurance.filter(insurance =>
            insurance.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            insurance.price.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            insurance.coverageType.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            insurance.coveragePeriod.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            insurance.coverageLimit.toLowerCase().includes(this.searchQuery.toLowerCase())
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
        // const snack = this.snackBar.open('Snack bar open before dialog');
    
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed) {
            this.deleteTravelInsurance(id)
            // snack.dismiss();
            // const a = document.createElement('a');
            // a.click();
            // a.remove();
            // snack.dismiss();
            this.snackBar.open('Insurance deleted!', 'Fechar', {
              duration: 2000,
            });
          }
        });
      }

    createInsurance(){
        this.router.navigate(['create-insurance'])
    }

    updateInsurance(id: string){
        this.router.navigate(['update-insurance', id])
    }

    detailsInsurance(id: string){
        this.router.navigate(['travel-insurance-details', id])
    }

    deleteTravelInsurance(id: string){
        this.travelInsuranceService.deleteInsurance(id).subscribe(data => {
            this.getAllInsurance()
        })
    }


    exportToExcel(): void {
      const date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-');
      const fileName = `travel_insurance_${date}.xlsx`;
    
      const data = this.travelInsurance.map(insu => ({
      Name: insu.name,
      Price: insu.price,
      CoverageType: insu.coverageType,
      coverageLimit: insu.coverageLimit,
      CoveragePeriod: insu.coveragePeriod,
      Deductible: insu.deductible,
      Description: insu.description,
      Restriction: insu.restriction,
      AdditionalInfo: insu.additionalInfo,
      AgeLimit: insu.ageLimit,
      }));
    
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, fileName);
    }
    
  
    downloadExcel(): void {
      this.getAllInsurance(); 
      setTimeout(() => {
        this.snackBar.open('Document generation has successfully complete.', 'Close', {
          duration: 2000,
        });
        this.exportToExcel();
      }, 1000); 
    }

}