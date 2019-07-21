import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class StateCampaingService {
    constructor(private http: HttpClient) {}

    getAll(): any {
        return this.http.get("http://25.22.76.174:8000/service/campaign");
    }
}
