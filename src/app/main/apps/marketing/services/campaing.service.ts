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

    postTrack(file: File, relativePath: string, variable: String): any {
        const data = new FormData();
        var PathFather: string = ("" + variable).replace(",", "/");

        relativePath = PathFather + "/" + relativePath;
        data.append("document", file, file.name);
        data.append("DOCUMENTPATH", relativePath);
        data.append("CLIENT_COMPANYID", this.prueba.empleado.empresa.ruc);
        data.append("USERID", this.prueba.empleado.nombre);
        data.append("NAME", file.name);

        this.dt = new Date(file.lastModified);
        this.dt =
            this.dt.getFullYear() +
            "-" +
            ("0" + (this.dt.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + this.dt.getDate()).slice(-2);
        data.append("ACCESS_DATE", this.dt);
        data.append("MODIFICATION_DATE", this.dt);
        data.append("CREATION_DATE", this.dt);
        data.append("STATET", "ACT");
        data.append("TYPE", "DOC");
        var Path = relativePath.split("/");

        var auxPath = "";
        for (var i = 0; i < Path.length - 1; i++) {
            auxPath += Path[i];
            if (i < Path.length - 2) auxPath += "/";
        }
        data.append("PATH_FATHER", auxPath);

        return this.http
            .put(this.url, data, { reportProgress: true, observe: "events" })
            .subscribe(event => {
                console.log("archivo cargado");
                console.log(event);
                if (event.type === HttpEventType.UploadProgress) {
                    console.log(
                        "Upload Progress: " +
                            Math.round(event.loaded / event.total) * 100 +
                            "%"
                    );
                } else if (event.type === HttpEventType.Response) {
                    console.log(event);
                }
            });
    }
}
