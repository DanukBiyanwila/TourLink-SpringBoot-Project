import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "app/model/user";
import { UserService } from "app/service/user.service";



@Component({
    selector: 'admin-tourist-list-cmp',
    moduleId: module.id,
    templateUrl: 'admin-tourist-list.component.html'
})

export class AdminTouristListComponent implements OnInit{

    users: User[];

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        this.allTourists();
    }

    private allTourists() {
        this.userService.getAllTourist().subscribe(data => {
            this.users = data;
        })
    }

    touristPackageDetails(id: string){
        this.router.navigate(['tourist_package_details', id])
    }

}