import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CampaingService } from "../services/campaing.service";
import { fuseAnimations } from "@fuse/animations";
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-campaing2",
    templateUrl: "./campaing2.component.html",
    styleUrls: ["./campaing2.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class Campaing2Component implements OnInit {
    selected = "";
    selectedFileCampaigns = "";
    opcionSeleccionado: string = "S";
    disableSelect = new FormControl(false);
    form: FormGroup;
    resources: any[];
    selectedOptions = [];
    selectedOption;
    flat: boolean = true;
    flatErrorAge: boolean = false;
    flatErrorBuget: boolean = false;
    flatCampaign: boolean = false;

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
        "Manabi",
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
    advisorList = [];
    productsList = [];
    constructor(
        private _campaing: CampaingService,
        private activateR: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private router: Router
    ) {
        this._campaing.getAdvisor().subscribe(data => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                this.advisorList.push(data[i]);
            }
        });

        this._campaing.getClient().subscribe(data => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                this.productsList.push(data[i]);
            }
        });
    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            name: ["", Validators.required],
            description: ["", Validators.required],
            budgetCampa: ["", Validators.required],
            ageStart: ["", Validators.required],
            ageEnd: ["", Validators.required],
            bugetStart: ["", Validators.required],
            bugetEnd: ["", Validators.required],
            rdGender: ["", Validators.required],
            location: ["", Validators.required],
            stage: ["", Validators.required],
            advisor: ["", Validators.required],
            products: ["", Validators.required],
            filesCampaign: ["", Validators.required]
        });
    }
    createCampaign(): void {
        if (this.form.value.ageStart > this.form.value.ageEnd) {
            alert("Age exceeds limits");
            this.flat = false;
            this.flatCampaign = false;
            this.flatErrorAge = true;
            this.flatErrorBuget = false;
        }

        if (this.form.value.bugetStart > this.form.value.bugetEnd) {
            alert("Buget exceeds limits");
            this.flat = false;
            this.flatCampaign = false;
            this.flatErrorAge = false;
            this.flatErrorBuget = true;
        }

        if (this.flat == true) {
            console.log(this.toppingList);
            console.log(this.advisorList);
            console.log(this.productsList);
            console.log(this.form.value);

            this._campaing
                .postCampaing(this.form.value, this.advisorList)
                .subscribe(data => {
                    this.flatCampaign = true;
                    this.flatErrorAge = false;
                    this.flatErrorBuget = false;
                });
        }
    }
}
