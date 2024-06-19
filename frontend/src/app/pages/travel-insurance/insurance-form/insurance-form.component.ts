import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { TravelInsurance } from "app/model/travel-insurance";
import { AuthService } from "app/service/auth.service";
import { TravelInsuranceService } from "app/service/travel-insurance.service";


@Component({
    selector: 'insurance-form-cmp',
    moduleId: module.id,
    templateUrl: 'insurance-form.component.html'
})


export class InsuranceFormComponent implements OnInit{

    travelInsurance: TravelInsurance = new TravelInsurance();
    id: string;
    adminId: string;

    constructor(private travelInsuranceService: TravelInsuranceService, private router: Router, private activatedRouter: ActivatedRoute, private authService: AuthService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.id = this.activatedRouter.snapshot.params['id'];
        this.adminId = this.authService.getUserAccountId();

        if(this.id){
            this.travelInsuranceService.getInsuranceById(this.id).subscribe(data => {
                this.travelInsurance = data;
            })

        }

    }

    saveInsurance(){
        this.travelInsuranceService.createTravelInsurance(this.travelInsurance).subscribe(data => {
            console.log(data);
            this.snackBar.open('Travel Insurance Saved Successfully!.', 'Close', {
                duration: 2000,
              });
            this.navigateToInsuranceList();
        },error => console.log(error))
    }

    navigateToInsuranceList(){
        this.router.navigate(['admin-travel-insurance-list'])
    }
            
    onSubmit(){
        this.travelInsurance.insertUserId = this.adminId;
        this.saveInsurance();
    }

}
