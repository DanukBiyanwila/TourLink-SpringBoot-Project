import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HotelComponent } from "./pages/hotel-list/hotel.component";
import { HotelDetailsComponent } from "./pages/hotel-details/hotel_details.component";
import { HotelReviewsComponent } from "./pages/hotel-reviews/hotel-reviews.component";
import { HotelPackagesComponent } from "./pages/hotel-packages/hotel-packages.component";
import { CreateHotelComponent } from "./pages/create-hotel/create-hotel.component";
import { CreateHotelPackageComponent } from "./pages/create-hotel-package/create-hotel-package.component";
import { AdminGuideListComponent } from "./pages/tour-guide/admin-list/admin-guide-list.component";
import { AdminDriverListComponent } from "./pages/drivers/admin-list/admin-driver-list.component";

import { LoginComponent } from "./pages/login/login.component";

import { GuideDetailsComponent } from "./pages/tour-guide/details/guide-details.component";
import { GuidePackageComponent } from "./pages/tour-guide/guide-package/guide-package.component";
import { AdminTravelInsuranceList } from "./pages/travel-insurance/admin-travel-insurance-list/admin-travel-insurance-list.component";
import { AdminOtherFacilitiesComponent } from "./pages/other-facilities/admin-other-facilities-list/admin-other-facilities-list.component";

import { AdminTouristListComponent } from "./pages/tourist/admin-list/admin-tourist-list.component";
import { TouristPackageDetailsComponent } from "./pages/tourist/tourist-package-details/tourist-package-details.component";
import { OtherFacilitiesFormComponent } from "./pages/other-facilities/other-facilities-form/other-facilities-form.component";

import { RegisterComponent } from "./pages/register/register.component";
import { InsuranceFormComponent } from "./pages/travel-insurance/insurance-form/insurance-form.component";
import { UpdateHotelPackageComponent } from "./pages/create-hotel-package/update-hotel-package.component";
import { SingleGuidePackageComponent } from "./pages/tour-guide/guide-package/signle-guide-package.component";
import { GuidePackageFormComponent } from "./pages/tour-guide/guide-package-form/guide-package-form.component";
import { SingleDriverPackageComponent } from "./pages/drivers/driver-package/single-driver-package.component";
import { DriverPackageComponent } from "./pages/drivers/driver-package/driver-package.component";
import { DriverPackageFormComponent } from "./pages/drivers/driver-package-form/driver-package-form.component";
import { DriverGuideReviewComponent } from "./pages/driver-guide-reviews/driver-guide-reviews.component";
import { SingleDriverGuideReviewComponent } from "./pages/driver-guide-reviews/single-driver-guide-reviews.component";
import { UpdateGuidePackageFormComponent } from "./pages/tour-guide/guide-package-form/update-guide-package-form.component";
import { UpdateDriverPackageFormComponent } from "./pages/drivers/driver-package-form/update-driver-package-form.component";
import { TouristHomeComponent } from "./pages/tourist-pages/tourist-home/tourist-home";

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialog } from "./pages/confirmation-dialog/confirmation-dialog.component";
import { BrowserModule } from "@angular/platform-browser";

import { CartComponent } from "./pages/cart-pay/cart.component";

import { LandingComponent } from "./pages/landing/landing.component";
import { TopNavbarComponent } from "./shared/topnavbar/navbar.component";
import { TouristHotelComponent } from "./pages/landing/tourist-hotels/tourist-hotels.component";
import { TouristGuidesComponent } from "./pages/landing/tourist-guides/tourist-guides.component";
import { paymentComponent } from "./pages/payment/payment.component";
import { TouristHotelPackageComponent } from "./pages/landing/tourist-hotel-packages/tourist-hotel-packages.component";
import { TouristDriverGuidePackageComponent } from "./pages/landing/tourist-driver-guide-packages/tourist-driver-guide-packages.component";
import { FeedbackFormComponent } from "./pages/landing/feedbakc-form/feedback-form.component";
import { TravelInsuranceDetailsComponent } from "./pages/travel-insurance/travel-insurance-details/travel-insurance-details.component";
import { OtherFacilitiesDetails } from "./pages/other-facilities/other-facilities-details/other-facilities-details.component";






@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HotelComponent,
    HotelDetailsComponent,
    HotelReviewsComponent,
    HotelPackagesComponent,
    CreateHotelComponent,
    CreateHotelPackageComponent,
    AdminGuideListComponent,
    AdminDriverListComponent,
    LoginComponent,
    RegisterComponent,
    GuideDetailsComponent,
    GuidePackageComponent,
    SingleGuidePackageComponent,
    AdminTravelInsuranceList,
    AdminOtherFacilitiesComponent,
    AdminTouristListComponent,
    TouristPackageDetailsComponent,
    OtherFacilitiesFormComponent,
    InsuranceFormComponent,
    UpdateHotelPackageComponent,
    GuidePackageFormComponent,
    SingleDriverPackageComponent,
    DriverPackageComponent,
    DriverPackageFormComponent,
    DriverGuideReviewComponent,
    SingleDriverGuideReviewComponent,
    UpdateGuidePackageFormComponent,
    UpdateDriverPackageFormComponent,
    TouristHomeComponent,
    ConfirmationDialog,


    CartComponent,
    LandingComponent,
    TopNavbarComponent,
    TouristHotelComponent,
    TouristGuidesComponent,

    paymentComponent,

    TouristHotelPackageComponent,
    TouristDriverGuidePackageComponent,
    FeedbackFormComponent,
    TravelInsuranceDetailsComponent,
    OtherFacilitiesDetails



  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
