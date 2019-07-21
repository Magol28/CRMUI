import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class StateCampaingService {
    constructor(private http: HttpClient) {}

    getAll(): any {
        return this.http.get("http://192.168.1.103:8000/service/campaign");
    }
    getID(id: String): any {
        return this.http.get(
            "http://192.168.1.103:8000/service/campaign/?campaign_id=" + id
        );
    }
}
