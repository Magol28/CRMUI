import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class CampaingService {
    constructor(private http: HttpClient) {}

    getAdvisor(): any {
        return this.http.get("http://192.168.1.108:8000/service/advisor/");
    }

    getClient(): any {
        return this.http.get("http://25.64.247.201:5002/api/producto");
    }
}