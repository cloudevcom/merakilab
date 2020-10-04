import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthService, HttpService } from 'src/app/core/services';
import { NotifyService } from 'src/app/core/services/notify.service';


declare const $: any;

// Metadata
export interface RouteInfo {
    path: string;
    label: string;
    type: string;
    icon: string;
    collapse?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/home',
    label: 'Home',
    type: 'link',
    icon: 'fas fa-chart-pie'
},{
    path: '/testcase/all',
    label: 'TestCases',
    type: 'link',
    icon: 'fas fa-vial'
}]

@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ps: any;
    public usuario: any = {};
    storageData: any;
    constructor(public authService: AuthService, 
        private methodService: HttpService,
        private notifyService: NotifyService) {
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    async ngOnInit() {

        this.storageData = JSON.parse(localStorage.getItem('storageData'));

        this.menuItems = ROUTES.filter(menuItem => menuItem);

        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    logout() {
        this.authService.signOut();
      
    }

    closeSideBar()
    {
        $('.close-layer.visible').click();
    }
}
