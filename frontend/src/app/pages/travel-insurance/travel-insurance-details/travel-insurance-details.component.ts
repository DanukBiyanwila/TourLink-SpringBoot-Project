import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TravelInsurance } from "app/model/travel-insurance";
import { TravelInsuranceService } from "app/service/travel-insurance.service";



@Component({
    selector: 'insurance-details-cmp',
    moduleId: module.id,
    templateUrl: 'travel-insurance-details.component.html'
})

export class TravelInsuranceDetailsComponent implements OnInit {

    travelInsurance: TravelInsurance = new TravelInsurance();
    id: string;

    constructor(private travelInsuranceService: TravelInsuranceService, private router: Router, private activatedRouter: ActivatedRoute) {}

    ngOnInit(): void {
        this.id = this.activatedRouter.snapshot.params['id'];
        this.travelInsuranceService.getInsuranceById(this.id).subscribe(data => {
            this.travelInsurance = data;
        });
    }

}