import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ipOracle } from "../utils";
@Injectable({
    providedIn: "root"
})
export class ClientCampaingService {
    info = localStorage.getItem("user");
    prueba = JSON.parse(this.info);
    constructor(private http: HttpClient) {}
    getAll(id: string): any {
        return this.http.get(
            ipOracle + "clients-campaign-report/?campaign_id=" + id
        );
    }

    getCampaign(): any {
        return this.http.get(
            ipOracle +
                "campaign/?creator_enterprise=" +
                this.prueba.empleado.empresa.ruc
        );
    }
}
