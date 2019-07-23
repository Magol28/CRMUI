import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ClientCampaingService {
    constructor(private http: HttpClient) {}
    getAll(id: string): any {
        return this.http.get(
            "http://192.168.1.112:8000/service/clients-campaign-report/?campaign_id=" +
                id
        );
    }

    getCampaign(): any {
        return this.http.get("http://192.168.1.112:8000/service/campaign/");
    }
}
