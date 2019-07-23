import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ReportCampaingService {
    constructor(private http: HttpClient) {}

    getCampaign(): any {
        return this.http.get("http://192.168.1.108:8000/service/campaign/");
    }

    getAdvisor(): any {
        return this.http.get("http://192.168.1.108:8000/service/advisor/");
    }

    getAdvisorCampaign(data): any {
        return this.http.get(
            "http://192.168.1.108:8000/service/clients-campaign-advisor/?advisor_id=" +
                data.advisor +
                "&campaign_id=" +
                data.campaign
        );
    }
}
