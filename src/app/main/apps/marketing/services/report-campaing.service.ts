import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ipOracle } from "../utils";

@Injectable({
    providedIn: "root"
})
export class ReportCampaingService {
    info = localStorage.getItem("user");
    prueba = JSON.parse(this.info);
    constructor(private http: HttpClient) {}

    getCampaign(): any {
        return this.http.get(
            ipOracle +
                "campaign/?creator_enterprise=" +
                this.prueba.empleado.empresa.ruc
        );
    }

    getAdvisor(): any {
        return this.http.get(ipOracle + "advisor/");
    }

    getAdvisorCampaign(data): any {
        return this.http.get(
            ipOracle +
                "clients-campaign-advisor/?advisor_id=" +
                data.advisor +
                "&campaign_id=" +
                data.campaign
        );
    }
}
