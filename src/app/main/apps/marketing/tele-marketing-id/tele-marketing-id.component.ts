import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { StateCampaingService } from "../services/state-campaing.service";
import { TeleMarketingService } from "../services/tele-marketing.service";

@Component({
    selector: "app-tele-marketing-id",
    templateUrl: "./tele-marketing-id.component.html",
    styleUrls: ["./tele-marketing-id.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class TeleMarketingIdComponent implements OnInit {
    opcionSeleccionado: string = "S";
    disableSelect = new FormControl(false);
    form: FormGroup;
    resources: any[];
    selectedOptions = [];
    selectedOption;
    idClient: number;
    idCampaing: number;
    idAdvisor: number;
    constructor(
        private activateR: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _teleMarketing: TeleMarketingService,
        private router: Router
    ) {}

    ngOnInit() {
        this.activateR.params.subscribe(params => {
            this.idClient = params["idClient"];
            this.idCampaing = params["idCampaing"];
            this.idAdvisor = params["idAdvisor"];
        });

        this.form = this._formBuilder.group({
            dni: [""],
            full_name: [""],
            gender: [""],
            location: [""],
            email: [""],
            earnings: [""],
            birth_date: [""],
            locationCampaing: [""],
            budgetCampaing: [""],
            nameCampaing: [""],
            descriptionCampaing: [""],
            age_rangeCampaing: [""],
            result: ["", Validators.required],
            detail: ["", Validators.required],
            risk: ["", Validators.required]
        });
        var gender = "";
        const data = this._teleMarketing
            .getClient(this.idClient.toString())
            .subscribe(arg => {
                if (arg.gender === "M" || arg.gender === "m") {
                    gender = "male";
                } else {
                    gender = "female";
                }
                this.form.controls["dni"].setValue(arg.dni);
                this.form.controls["full_name"].setValue(arg.full_name);
                this.form.controls["gender"].setValue(gender);
                this.form.controls["location"].setValue(arg.location.provincia);
                this.form.controls["earnings"].setValue(arg.earnings);
                this.form.controls["birth_date"].setValue(arg.birth_date);
                this.form.controls["email"].setValue(arg.email);
                console.log(arg);
            });

        const dataClientCampaingAdvisor = this._teleMarketing
            .getTelemarketing(
                this.idClient.toString(),
                this.idCampaing.toString(),
                this.idAdvisor.toString()
            )
            .subscribe(arg => {
                this.form.controls["result"].setValue(arg.result);
                this.form.controls["detail"].setValue(arg.result_detail);
                this.form.controls["risk"].setValue(arg.client_risk);

                console.log(arg);
            });

        const dataCampaing = this._teleMarketing
            .getMarketing(this.idCampaing.toString(), "14")
            .subscribe(arg => {
                this.form.controls["locationCampaing"].setValue(
                    arg.location.provincia
                );
                this.form.controls["budgetCampaing"].setValue(arg.budget);
                this.form.controls["nameCampaing"].setValue(arg.name);
                this.form.controls["descriptionCampaing"].setValue(
                    arg.description
                );
                this.form.controls["age_rangeCampaing"].setValue(arg.age_range);

                console.log(arg);
            });
    }

    updateRisk(): void {
        console.log("value");
        console.log(this.form);
        const riskClient = this._teleMarketing
            .putTeleMarketing(
                this.form.value,
                this.idClient,
                this.idCampaing,
                this.idAdvisor
            )
            .subscribe(arg => {
                alert("Telemarketing was updated");
            });
    }
    calculateRisk(): void {
        const riskClient = this._teleMarketing
            .getClientRisk(this.idClient.toString())
            .subscribe(arg => {
                this.form.controls["risk"].setValue(arg.risk);
            });
    }
}
