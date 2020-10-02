import { ApiService } from "src/app/core/services/api.service";
import { NotifyService } from "src/app/core/services/notify.service";
import { APIResponse } from "../interfaces";
import { NgxSpinnerService } from "ngx-spinner";


export abstract class BaseLoad {

    public url: string;
    dataSource: any[]; 
    currentPage: number = 0;
    page = 1;
    notscrolly= true;
    notEmptyPost=true;

    constructor(public apiService: ApiService, 
        public  notifyService: NotifyService,
        private spinner: NgxSpinnerService) {

    }
 
    public getSource(): void {
        this.spinner.show();

        this.apiService.GET<APIResponse>(`${this.url}?page=${this.page}&per_page=10`).subscribe((response: APIResponse) => {
           
            if (response.status == 'success') {              
                if (response.data.result.length === 0 ) 
                    this.notEmptyPost =  false;   

                if(this.dataSource === undefined || this.dataSource.length <= 0) {
                    this.dataSource = response.data.result;    
                } else {
                    this.dataSource = this.dataSource.concat(response.data.result); 
                }
                this.spinner.hide();
                this.notscrolly = true;                         
            } else {
                this.notifyService.notifyError(response.message);
            }
        }, () => this.notifyService.notifySystemError());
    }


    get sourceLoaded(): boolean{
        if (!this.dataSource) return true;
        return this.dataSource && this.dataSource.length > 0;  
    }

    public onScroll(): void {
        if (this.notscrolly && this.notEmptyPost) {
            this.spinner.show();
            this.notscrolly = false;
            this.page++;
            this.getSource();
         }
    }



}
