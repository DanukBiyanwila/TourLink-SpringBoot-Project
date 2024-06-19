import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OtherFacilities } from "app/model/other-facilities";
import { OtherFacilitiesService } from "app/service/other-facilities.service";



@Component({
    selector: 'other-facilities-details-cmp',
    moduleId: module.id,
    templateUrl: 'other-facilities-details.component.html'
})

export class OtherFacilitiesDetails implements OnInit {

    otherFacilities: OtherFacilities = new OtherFacilities();
    id: string;

    constructor(private facilitiesService: OtherFacilitiesService, private router: Router, private activatedRouter: ActivatedRoute) {}

    ngOnInit(): void {
        this.id = this.activatedRouter.snapshot.params['id'];
        this.facilitiesService.getOtherFacilitiesById(this.id).subscribe(data => {
            this.otherFacilities = data;
        })
    }

}