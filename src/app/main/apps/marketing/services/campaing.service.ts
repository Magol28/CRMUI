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
        return this.http.get("http://192.168.1.112:8000/service/advisor/");
    }

    getClient(): any {
        return this.http.get("http://25.64.247.201:5002/api/producto");
    }
}
