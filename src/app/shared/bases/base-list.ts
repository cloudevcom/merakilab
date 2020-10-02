import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService, ControlsService } from 'src/app/core/services';


export abstract class BaseList  extends MatPaginatorIntl {

    public urlApi: String = '';
    public dataSource: MatTableDataSource<any>;
    public displayedColumns: string[];
    public length: number;
    public pageSize: number;
    public pageSizeOptions: number[];
    public page = 1;
    public sort: MatSort;
    public asc = 1;
    public parameters = {};
    constructor(public methodService: HttpService,   public  controlService: ControlsService) {
        super();
        this.nextPageLabel = 'Siguiente página';
        this.previousPageLabel = 'Página posterior';
        this.lastPageLabel = 'Útima página';
        this.firstPageLabel = 'Primera página';
        this.itemsPerPageLabel = 'Registros por página';
    }
    public async consultar() {
        const url = `${this.urlApi}?page=${this.page}&per_page=${this.pageSize}&asc=${this.asc}&key=${this.sort.active}`;
        const response = await this.methodService.GET<any>(url, this.parameters);
    
        if (response.status === 'success') {
            this.dataSource = new MatTableDataSource(response.data.result);
            this.dataSource.sort = this.sort;
            this.llenarPaginacion(response.data);
        } else {
            this.controlService.snackbarError(response.message);
        }
    }

    public llenarPaginacion(data: any) {
        // console.log(data);
        this.page = data.current_page;
        this.length = data.total;
        this.pageSize = data.per_page;
    }

    public siguenteAtras(pageEvent: PageEvent) {
        this.page = pageEvent.pageIndex + 1;
        this.consultar();
    }

    public sortChange() {
        this.asc = this.sort.direction === 'asc' ? 1 : 0;
        this.consultar();
    }
}
