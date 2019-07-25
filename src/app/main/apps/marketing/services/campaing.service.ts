import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpEventType } from "@angular/common/http";

import { ipOracle, ipProducts } from "../utils";

@Injectable({
    providedIn: "root"
})
export class CampaingService {
    info = localStorage.getItem("user");
    prueba = JSON.parse(this.info);
    ip = "3.91.68.253";
    public dt;

    url =
        "http://" +
        this.ip +
        ":3000/documentfolder/" +
        this.prueba.empleado.nombre;
    constructor(private http: HttpClient) {}

    getAdvisor(): any {
        return this.http.get(ipOracle + "advisor/");
    }

    getClient(): any {
        return this.http.get(ipProducts + "producto");
    }

    postCampaing(data): any {
        const objeto = {
            location: {
                province: data.location
            },
            publicity_configuration: {
                path: data.filesCampaign
            },
            products: data.products,
            budget: data.budgetCampa,
            gender_range: data.rdGender,
            name: data.name,
            description: data.description,
            age_range: data.ageStart + "-" + data.ageEnd,
            earning_range: data.bugetStart + "-" + data.bugetEnd,
            creator_enterprise: this.prueba.empleado.empresa.ruc,
            created_by: 1,
            modified_by: 1,
            stage: data.stage,
            advisors: data.advisor
        };
        console.log("prueba");
        console.log(objeto);
        return this.http.post(ipOracle + "campaign/", JSON.stringify(objeto), {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
        });
    }
}
