import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class TeleMarketingService {
    constructor(private http: HttpClient) {}

    getClient(id: string): any {
        return this.http.get(
            "http://192.168.1.108:8000/service/client/?client_id=" + id
        );
    }

    getTelemarketing(idCient: string, idCampaign: string, idAdvisor): any {
        return this.http.get(
            "http://192.168.1.108:8000/service/telemarketing-result/?advisor=" +
                idAdvisor +
                "&campaign=" +
                idCampaign +
                "&client=" +
                idCient
        );
    }

    getClientRisk(idCient: string): any {
        return this.http.get(
            "http://192.168.1.108:8000/service/client-risk/?client_id=" +
                idCient
        );
    }

    getMarketing(idMarketing, idUser): any {
        return this.http.get(
            "http://192.168.1.108:8000/service/campaign/?campaign_id=" +
                idMarketing +
                "&created_by=" +
                idUser
        );
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
            "http://192.168.1.108:8000/service/telemarketing-result/",
            JSON.stringify(objeto),
            { headers: new HttpHeaders({ "Content-Type": "application/json" }) }
        );
    }
}
