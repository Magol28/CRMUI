import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpEventType } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class CampaingService {
    info = localStorage.getItem("user");
    prueba = JSON.parse(this.info);
    ip = "25.76.59.152";
    public dt;

    url =
        "http://" +
        this.ip +
        ":3000/documentfolder/" +
        this.prueba.empleado.nombre;
    constructor(private http: HttpClient) {}

    getAdvisor(): any {
        return this.http.get("http://54.242.242.56:8000/service/advisor/");
    }

    getClient(): any {
        return this.http.get("http://34.207.234.136:5002/api/producto");
    }

    postCampaing(data, advisorList): any {
        let advisorL = [];
        for (let i = 0; i < advisorList.length; i++) {
            advisorL.push(advisorList[i].id);
        }

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
            created_by: 1,
            modified_by: 1,
            stage: data.stage,
            advisors: advisorL
        };
        console.log("prueba");
        console.log(objeto);
        return this.http.post(
            "http://54.242.242.56:8000/service/campaign/",
            JSON.stringify(objeto),
            { headers: new HttpHeaders({ "Content-Type": "application/json" }) }
        );
    }
}
