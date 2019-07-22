import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ReportService {
    constructor(private http: HttpClient) {}
    getClient(): any {
        return this.http.get(
            "http://http://25.22.76.174::8000/service/clients-total-campaign-report/"
        );
    }

    getLocation(): any {
        return this.http.get(
            " http://http://25.22.76.174::8000/service/campaign-location-report/"
        );
    }
}
