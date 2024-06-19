import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserAccount } from "app/model/user-accunt";
import { UserAccountService } from "app/service/user-account.service";
import { AuthService } from "app/service/auth.service";

@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})


export class LoginComponent implements OnInit{

    userAccount: UserAccount = new UserAccount();
    errorMessage: string = '';

    constructor(
        private useraccountService: UserAccountService,
        private router: Router,
        private authService: AuthService 
    ) {}
    ngOnInit(): void {}

    onSubmit() {
        this.login();
    }

    login(){
        this.useraccountService.login(this.userAccount).subscribe
        (data =>{
             this.navigateTo(data);
             this.errorMessage = '';

        },
        error => {
            console.log(error)
            this.errorMessage = error.error;
        })
    }
    
    navigateTo(data){
      
        const firstAuthority = data.userDetails.authorities[0].authority;
        const uId = data.userDetails.username
        const uaId = data.userData.account.id
        const userId = data.userData.id;
        
        this.authService.setUserRole(firstAuthority);
        this.authService.setUserId(uId);
        this.authService.setUserAccountId(uaId);
        this.authService.setSessionUserId(userId);
        
        if (firstAuthority === 'ROLE_ADMIN') {
            this.router.navigate(['hotels'])
        }
        else if (firstAuthority === 'ROLE_DRIVER') {
            this.router.navigate(['driver-packages'])
        }
        else if (firstAuthority === 'ROLE_GUIDE') {
            this.router.navigate(['guide_packages'])
        }
        else if (firstAuthority === 'ROLE_TOURIST') { 
            this.router.navigate(['landing'])
        }
        else{
            this.router.navigate(['auth'])
        }
    }

    register(){
        this.router.navigate(['register'])
    }

    closeErrorMessage(){
        this.errorMessage = '';
    }


}