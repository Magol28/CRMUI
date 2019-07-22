import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-campaing2",
    templateUrl: "./campaing2.component.html",
    styleUrls: ["./campaing2.component.scss"]
})
export class Campaing2Component implements OnInit {
    constructor() {}

    ngOnInit() {}

    toppingList: string[] = [
        "Azuay",
        "Bolívar",
        "Cañar",
        "Carchi",
        "Chimborazo",
        "Cotopaxi",
        "El Oro",
        "Esmeraldas",
        "Galápagos",
        "Guayas",
        "Imbabura",
        "Loja",
        "Los Ríos",
        "Morona Santiago",
        "Napo",
        "Orellana",
        "Pastaza",
        "Pichincha",
        "Santa Elena",
        "Santo Domingo de los Tsáchilas",
        "Sucumbíos",
        "Tungurahua",
        "Zamora Chinchipe"
    ];
}
