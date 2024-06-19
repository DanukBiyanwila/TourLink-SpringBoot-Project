import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DriverGuidePackage } from "app/model/driver-guide-package";
import { DriverGuidePackageService } from "app/service/driver-guide-package.service";


@Component({
    selector: 'tourist-package-details-cmp',
    moduleId: module.id,
    templateUrl: 'tourist-package-details.component.html'
})


export class TouristPackageDetailsComponent implements OnInit{

    packages: DriverGuidePackage[];
    id: string;

    constructor(private driverGuidePackageService: DriverGuidePackageService, private router: ActivatedRoute) {}

    ngOnInit(): void {
        this.id = this.router.snapshot.params['id'];
        this.driverGuidePackageService.getAllUserPackages(this.id).subscribe(data => {
            this.packages = data;
            console.log(this.packages)
        })
    }

}