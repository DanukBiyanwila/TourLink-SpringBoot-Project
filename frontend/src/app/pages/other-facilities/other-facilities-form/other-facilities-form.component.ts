import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { OtherFacilities } from "app/model/other-facilities";
import { AuthService } from "app/service/auth.service";
import { OtherFacilitiesService } from "app/service/other-facilities.service";



@Component({
    selector: 'other-facilities-form-cmp',
    moduleId: module.id,
    templateUrl: 'other-facilities-form.component.html'
})


export class OtherFacilitiesFormComponent implements OnInit{

    otherFacilities: OtherFacilities = new OtherFacilities();
    id: string;
    adminId: string;

    constructor(private facilitiesService: OtherFacilitiesService, private router: Router, private activatedRouter: ActivatedRoute, private authService: AuthService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.id = this.activatedRouter.snapshot.params['id'];
        this.adminId = this.authService.getUserAccountId();

        if(this.id){

            this.facilitiesService.getOtherFacilitiesById(this.id).subscribe(data => {
                this.otherFacilities = data;
            })
        }

    }

    saveFacilities(){
        this.facilitiesService.createOtherFacilities(this.otherFacilities).subscribe(data => {
            console.log(data);
            this.snackBar.open('Other Facilities Saved Successfully!.', 'Close', {
                duration: 2000,
              });
            this.navigateToFacilitiesList(data);
        },error => console.log(error))
    }

    navigateToFacilitiesList(data){
        this.router.navigate(['admin-other-facilities-list']);
    }
    

    onSubmit(){
        this.otherFacilities.insertUserId = this.adminId;
        this.saveFacilities()
    }

}
