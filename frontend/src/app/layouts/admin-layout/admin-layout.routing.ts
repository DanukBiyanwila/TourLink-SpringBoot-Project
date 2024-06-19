import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { AdminDashboardComponent } from 'app/pages/admin-dashboard/admin_dashboard.component';
import { HotelComponent } from 'app/pages/hotel-list/hotel.component';
import { HotelDetailsComponent } from 'app/pages/hotel-details/hotel_details.component';
import { HotelPackagesComponent } from 'app/pages/hotel-packages/hotel-packages.component';
import { CreateHotelComponent } from 'app/pages/create-hotel/create-hotel.component';
import { CreateHotelPackageComponent } from 'app/pages/create-hotel-package/create-hotel-package.component';
import { TourGuideDashboardComponent } from 'app/pages/tour-guide/dashboard/guide-dashboard.component';
import { DriverDashboardComponent } from 'app/pages/drivers/driver-dashboard/driver-dashboard.component';
import { AdminGuideListComponent } from 'app/pages/tour-guide/admin-list/admin-guide-list.component';
import { AdminDriverListComponent } from 'app/pages/drivers/admin-list/admin-driver-list.component';
import { GuideDetailsComponent } from 'app/pages/tour-guide/details/guide-details.component';
import { GuidePackageComponent } from 'app/pages/tour-guide/guide-package/guide-package.component';
import { AdminTravelInsuranceList } from 'app/pages/travel-insurance/admin-travel-insurance-list/admin-travel-insurance-list.component';
import { AdminOtherFacilitiesComponent } from 'app/pages/other-facilities/admin-other-facilities-list/admin-other-facilities-list.component';
import { LoginComponent } from 'app/pages/login/login.component';

import { AdminTouristListComponent } from 'app/pages/tourist/admin-list/admin-tourist-list.component';
import { TouristPackageDetailsComponent } from 'app/pages/tourist/tourist-package-details/tourist-package-details.component';
import { OtherFacilitiesFormComponent } from 'app/pages/other-facilities/other-facilities-form/other-facilities-form.component';

import { RegisterComponent } from 'app/pages/register/register.component';
import { InsuranceFormComponent } from 'app/pages/travel-insurance/insurance-form/insurance-form.component';
import { UpdateHotelPackageComponent } from 'app/pages/create-hotel-package/update-hotel-package.component';
import { SingleGuidePackageComponent } from 'app/pages/tour-guide/guide-package/signle-guide-package.component';
import { GuidePackageFormComponent } from 'app/pages/tour-guide/guide-package-form/guide-package-form.component';
import { SingleDriverPackageComponent } from 'app/pages/drivers/driver-package/single-driver-package.component';
import { DriverPackageComponent } from 'app/pages/drivers/driver-package/driver-package.component';
import { DriverPackageFormComponent } from 'app/pages/drivers/driver-package-form/driver-package-form.component';
import { SingleDriverGuideReviewComponent } from 'app/pages/driver-guide-reviews/single-driver-guide-reviews.component';
import { UpdateGuidePackageFormComponent } from 'app/pages/tour-guide/guide-package-form/update-guide-package-form.component';
import { UpdateDriverPackageFormComponent } from 'app/pages/drivers/driver-package-form/update-driver-package-form.component';
import { LandingComponent } from 'app/pages/landing/landing.component';
import { TouristHotelComponent } from 'app/pages/landing/tourist-hotels/tourist-hotels.component';
import { TouristGuidesComponent } from 'app/pages/landing/tourist-guides/tourist-guides.component';
import { TouristHotelPackageComponent } from 'app/pages/landing/tourist-hotel-packages/tourist-hotel-packages.component';
import { TouristDriverGuidePackageComponent } from 'app/pages/landing/tourist-driver-guide-packages/tourist-driver-guide-packages.component';
import { TravelInsuranceDetailsComponent } from 'app/pages/travel-insurance/travel-insurance-details/travel-insurance-details.component';
import { OtherFacilitiesDetails } from 'app/pages/other-facilities/other-facilities-details/other-facilities-details.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'auth',component:LoginComponent},
    { path: 'dashboard',component: DashboardComponent },
    { path: 'admin-dashboard',component: AdminDashboardComponent },
    { path: 'hotels',component: HotelComponent },
    { path: 'user',component: UserComponent },
    { path: 'hotel_details/:id',component: HotelDetailsComponent },
    { path: 'hotel_packages/:id',component: HotelPackagesComponent },
    { path: 'hotel_create',component: CreateHotelComponent },
    { path: 'hotel_update/:id',component: CreateHotelComponent },
    { path: 'create_hotel_package/:id',component: CreateHotelPackageComponent },
    { path: 'update_hotel_package/:id',component: UpdateHotelPackageComponent },
    { path: 'guide-dashboard',component: TourGuideDashboardComponent },
    { path: 'driver-dashboard',component: DriverDashboardComponent },
    { path: 'admin-guide-list',component: AdminGuideListComponent },
    { path: 'admin-driver-list',component: AdminDriverListComponent },
    { path: 'guide_details/:id',component: GuideDetailsComponent },
    { path: 'guide_packages/:id',component: GuidePackageComponent },
    { path: 'guide_packages',component: SingleGuidePackageComponent },
    { path: 'admin-travel-insurance-list',component: AdminTravelInsuranceList },
    { path: 'admin-other-facilities-list',component: AdminOtherFacilitiesComponent },

    { path: 'admin-tourist-list',component: AdminTouristListComponent },
    { path: 'tourist_package_details/:id',component: TouristPackageDetailsComponent },
    { path: 'create_other-facilities',component: OtherFacilitiesFormComponent },
    { path: 'update_other-facilities/:id',component: OtherFacilitiesFormComponent },

    { path: 'register',component:RegisterComponent},
    { path: 'create-insurance',component:InsuranceFormComponent},
    { path: 'update-insurance/:id',component:InsuranceFormComponent},

    { path: 'create-guide-package',component:GuidePackageFormComponent},
    { path: 'update-guide-package/:id',component:UpdateGuidePackageFormComponent},
    { path: 'driver-packages',component:SingleDriverPackageComponent},
    { path: 'driver-packages/:id',component:DriverPackageComponent},
    { path: 'create-driver-package',component:DriverPackageFormComponent},
    { path: 'update-driver-package/:id',component:UpdateDriverPackageFormComponent},
    { path: 'driver-guide-reviews',component:SingleDriverGuideReviewComponent},
    { path: 'landing',component:LandingComponent},
    { path: 'tourist-hotels',component:TouristHotelComponent},
    { path: 'tourist/:type',component:TouristGuidesComponent},
    { path: 'tourist-hotel-packages/:id',component:TouristHotelPackageComponent},
    { path: 'tourist-dg-packages/:id/:type',component:TouristDriverGuidePackageComponent},
    { path: 'travel-insurance-details/:id',component:TravelInsuranceDetailsComponent},
    { path: 'other-facilities-details/:id',component:OtherFacilitiesDetails},


    
  
 ];
