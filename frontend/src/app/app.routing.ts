import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RegisterComponent } from './pages/register/register.component';

import { CartComponent } from "./pages/cart-pay/cart.component";

import { LandingComponent } from './pages/landing/landing.component';
import { TouristHotelComponent } from './pages/landing/tourist-hotels/tourist-hotels.component';
import { TouristGuidesComponent } from './pages/landing/tourist-guides/tourist-guides.component';
import { paymentComponent } from './pages/payment/payment.component';
import { TouristHotelPackageComponent } from './pages/landing/tourist-hotel-packages/tourist-hotel-packages.component';
import { TouristDriverGuidePackageComponent } from './pages/landing/tourist-driver-guide-packages/tourist-driver-guide-packages.component';



export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'tourist-hotels',
    component: TouristHotelComponent,
  },
  {
    path: 'tourist/:type',
    component: TouristGuidesComponent,
  },
  {
    path: 'tourist-hotel-packages/:id',
    component: TouristHotelPackageComponent,
  },
  {
    path: 'tourist-dg-packages/:id/:type',
    component: TouristDriverGuidePackageComponent,
  },
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: 'cart', 
    component: CartComponent },

  { path: 'payment', 
    component: paymentComponent },

  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth' 
  }
];
