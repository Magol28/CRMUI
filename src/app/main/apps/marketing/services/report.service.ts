import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ipOracle } from "../utils";

@Injectable({
    providedIn: "root"
})
export class ReportService {
    info = localStorage.getItem("user");

    prueba = JSON.parse(this.info);
    // console.log();
    constructor(private http: HttpClient) {}
    getClient(): any {
        return this.http.get(
            ipOracle +
                "clients-total-campaign-report/?creator_enterprise=" +
                this.prueba.empleado.empresa.ruc
        );
    }

    getLocation(): any {
        return this.http.get(
            ipOracle +
                "campaign-location-report/?creator_enterprise=" +
                this.prueba.empleado.empresa.ruc
        );
    }
}
