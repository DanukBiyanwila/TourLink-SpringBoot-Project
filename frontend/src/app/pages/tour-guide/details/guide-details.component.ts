import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "app/model/user";
import { UserService } from "app/service/user.service";

@Component({
    selector: 'guide-details-cmp',
    moduleId: module.id,
    templateUrl: 'guide-details.component.html'
})

export class GuideDetailsComponent implements OnInit{

    user: User = new User();
    id: string

    constructor(private userService: UserService, private router: ActivatedRoute) {}

    ngOnInit(): void {
        this.id = this.router.snapshot.params['id'];
        this.userService.getGuideById(this.id).subscribe(data =>{
            this.user = data;
        })
    }

}