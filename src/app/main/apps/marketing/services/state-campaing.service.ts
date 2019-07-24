import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class StateCampaingService {
    constructor(private http: HttpClient) {}

    getAll(): any {
        return this.http.get("http://54.242.242.56:8000/service/campaign");
    }
    getID(id: String): any {
        return this.http.get(
            "http://54.242.242.56:8000/service/campaign/?campaign_id=" + id
        );
    }

    getEmail(id: String): any {
        console.log(id);
        return this.http.get(
            "http://54.242.242.56:8000/service/campaign-send-email/?campaign_id" +
                id
        );
    }

    putStage(data, select): any {
        const objeto = {
            id: data.id,
            stage: select
        };
        return this.http.put(
            "http://54.242.242.56:8000/service/campaign/",
            JSON.stringify(objeto),
            { headers: new HttpHeaders({ "Content-Type": "application/json" }) }
        );
    }
}
