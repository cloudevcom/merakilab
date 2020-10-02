import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

    public getDynamicYears() {
        let startYear = new Date().getFullYear() - 19;
        const currentyear = new Date().getFullYear();
        const range = [];
        while (startYear < currentyear) {
            startYear = startYear + 1;
            range.push(startYear);
        }
        return range;

    }
}
