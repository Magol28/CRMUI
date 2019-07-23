import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
}
