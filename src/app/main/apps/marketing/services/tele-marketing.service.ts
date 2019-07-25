import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ipOracle } from "../utils";

@Injectable({
    providedIn: "root"
})
export class TeleMarketingService {
    info = localStorage.getItem("user");
    constructor(private http: HttpClient) {}

    getClient(id: string): any {
        return this.http.get(ipOracle + "client/?client_id=" + id);
    }

    getTelemarketing(idCient: string, idCampaign: string, idAdvisor): any {
        return this.http.get(
            ipOracle +
                "telemarketing-result/?advisor=" +
                idAdvisor +
                "&campaign=" +
                idCampaign +
                "&client=" +
                idCient
        );
    }

    getClientRisk(idCient: string): any {
        return this.http.get(ipOracle + "client-risk/?client_id=" + idCient);
    }

    getMarketing(idMarketing): any {
        return this.http.get(ipOracle + "campaign/?campaign_id=" + idMarketing);
    }

    putTeleMarketing(data, idClient, idCampaign, idAdvisor): any {
        console.log(data);
        const objeto = {
            advisor: idAdvisor,
            client: idClient,
            campaign: idCampaign,
            result: data.result,
            result_detail: data.detail,
            client_risk: data.risk
        };
        return this.http.put(
            ipOracle + "telemarketing-result/",
            JSON.stringify(objeto),
            { headers: new HttpHeaders({ "Content-Type": "application/json" }) }
        );
    }
}
