import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    allowedRoles: string[];
    showInMenu: boolean;
}

export const ROUTES: RouteInfo[] = [
    { path: '/admin-dashboard', title: 'Admin Dashboard', icon: 'nc-spaceship', class: '', allowedRoles: ['ROLE_ADMIN'], showInMenu: false},
    { path: '/hotels', title: 'Hotels', icon: 'nc-bank', class: '', allowedRoles: ['ROLE_ADMIN', 'ROLE_TOURIST'], showInMenu: true},
    { path: '/guide-dashboard', title: 'Guide Dashboard', icon: 'nc-single-02', class: '', allowedRoles: ['ROLE_GUIDE'], showInMenu: false},
    { path: '/guide_packages', title: 'Package', icon: 'nc-single-02', class: '', allowedRoles: ['ROLE_GUIDE'], showInMenu: true},
    { path: '/driver-dashboard', title: 'Driver Dashboard', icon: 'nc-single-02', class: '', allowedRoles: ['ROLE_DRIVER'], showInMenu: false},
    { path: '/driver-packages', title: 'Package', icon: 'nc-single-02', class: '', allowedRoles: ['ROLE_DRIVER'], showInMenu: true},
    { path: '/driver-guide-reviews', title: 'Reviews', icon: 'nc-single-02', class: '', allowedRoles: ['ROLE_DRIVER','ROLE_GUIDE'], showInMenu: true},
    { path: '/admin-guide-list', title: 'Guide', icon: 'nc-single-02', class: '', allowedRoles: ['ROLE_ADMIN', 'ROLE_TOURIST'], showInMenu: true},
    { path: '/admin-driver-list', title: 'Driver', icon: 'nc-single-02', class: '', allowedRoles: ['ROLE_ADMIN', 'ROLE_TOURIST'], showInMenu: true},
    { path: '/admin-travel-insurance-list', title: 'Travel Insurance', icon: 'nc-single-02', class: '', allowedRoles: ['ROLE_ADMIN', 'ROLE_TOURIST'], showInMenu: true},
    { path: '/admin-other-facilities-list', title: 'Other Facilities', icon: 'nc-single-02', class: '', allowedRoles: ['ROLE_ADMIN', 'ROLE_TOURIST'], showInMenu: true},
    { path: '/toursit-home', title: 'Tourist Home', icon: 'nc-single-02', class: '', allowedRoles: ['ROLE_TOURIST'], showInMenu: true}, 
    { path: '/user', title: 'User Profile', icon: 'nc-single-02', class: '', allowedRoles: ['ROLE_ADMIN', 'ROLE_GUIDE', 'ROLE_DRIVER'], showInMenu: true},
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    constructor(private authService: AuthService) {}
    getUserRole() {
        return this.authService.getUserRole();
      }
    public menuItems: any[];
    ngOnInit() {
        const userRole = this.authService.getUserRole();
        // this.menuItems = this.filterMenuItemsByRole(userRole);
        this.menuItems = this.filterMenuItems(userRole);
        console.log('User Role:', userRole);
    }

    private filterMenuItemsByRole(role: string): RouteInfo[] {
        switch (role) {
            case 'ROLE_ADMIN':
                return ROUTES.filter(item => item.path.startsWith('/admin-'));
            case 'ROLE_GUIDE':
                return ROUTES.filter(item => item.path.startsWith('/guide-'));
            case 'ROLE_DRIVER':
                return ROUTES.filter(item => item.path.startsWith('/driver-'));
                case 'ROLE_TOURIST':
                return ROUTES.filter(item => item.path.startsWith('/toursit-'));
            default:
                return [];
        }
    }

    private filterMenuItems(role: string): RouteInfo[] {
        return ROUTES.filter(item => item.allowedRoles.includes(role) && item.showInMenu);
    }
}
