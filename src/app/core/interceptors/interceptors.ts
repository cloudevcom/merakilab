import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingScreenInterceptor } from './loading.interceptor';

export const InterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingScreenInterceptor,
        multi: true
    }
];
