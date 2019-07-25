import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ipOracle } from "../utils";

@Injectable({
    providedIn: "root"
})
export class StateCampaingService {
    constructor(private http: HttpClient) {}
    info = localStorage.getItem("user");
    prueba = JSON.parse(this.info);

    getAll(): any {
        return this.http.get(
            ipOracle +
                "campaign/?creator_enterprise=" +
                this.prueba.empleado.empresa.ruc
        );
    }
    getID(id: String): any {
        return this.http.get(ipOracle + "campaign/?campaign_id=" + id);
    }

    getEmail(id: String): any {
        console.log(id);
        return this.http.get(
            ipOracle + "campaign-send-email/?campaign_id=" + id
        );
    }

    putStage(data, select): any {
        const objeto = {
            id: data.id,
            stage: select
        };
        return this.http.put(ipOracle + "campaign/", JSON.stringify(objeto), {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
        });
    }
}
