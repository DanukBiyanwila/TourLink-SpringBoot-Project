import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { User } from "app/model/user";
import { UserService } from "app/service/user.service";



@Component({
    selector: 'Register-cmp',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})


export class RegisterComponent implements OnInit{
    user:User=new User
    constructor(private userService:UserService, private router: Router,
        private snackBar: MatSnackBar
    ) {}
        ngOnInit(): void {}

        onSubmit() {
            this.register();
        }

        register(){
            this.userService.register(this.user).subscribe
            (data =>{
                 
                },
            error => {
                this.navigateTo();
                this.snackBar.open('User Registered Successfully.', 'Close', {
                   duration: 2000,
                 });
            })
        }

        navigateTo(){
            this.router.navigate(['auth'])
        }
}