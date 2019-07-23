import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ReportService {
    constructor(private http: HttpClient) {}
    getClient(): any {
        return this.http.get(
            "http://192.168.1.112:8000/service/clients-total-campaign-report/"
        );
    }

    getLocation(): any {
        return this.http.get(
            " http://192.168.1.112:8000/service/campaign-location-report/"
        );
    }
}
