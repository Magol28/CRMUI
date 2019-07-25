import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from "@angular/forms";
import { Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { StateCampaingService } from "../services/state-campaing.service";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
@Component({
    selector: "app-state-campaing-id",
    templateUrl: "./state-campaing-id.component.html",
    styleUrls: ["./state-campaing-id.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class StateCampaingIdComponent implements OnInit {
    selected = "";
    opcionSeleccionado: string = "S";
    disableSelect = new FormControl(false);
    form: FormGroup;
    resources: any[];
    selectedOptions = [];
    selectedOption;
    flatCampaign: boolean = false;
    flatEmail: boolean = false;
    flatCampaignError: boolean = false;
    flatEmailError: boolean = false;

    constructor(
        private activateR: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _campaing: StateCampaingService,
        private router: Router
    ) {}
    campaing: StateCampaing[] = [
        { id: "S", name: "Start" },
        { id: "ST", name: "Stopped" },
        { id: "R", name: "Removed" },
        { id: "C", name: "Completed" },
        { id: "P", name: "Pending" },
        { id: "LB", name: "Limited by budget" }
    ];

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            id: ["", Validators.required],
            location: ["", this.disableSelect],
            provincia: [""],
            canton: [""],
            products: [""],
            budget: [""],
            gender_range: [""],
            name: ["", Validators.required],
            description: [""],
            age_range: [""],
            earning_range: [""]
        });
        this.activateR.params.subscribe(params => {
            // tslint:disable-next-line:no-unused-expression
            const idCampaing = params["id"];
            var gender = "";
            //this.selected = "S";
            const data = this._campaing.getID(idCampaing).subscribe(arg => {
                this.form.controls["id"].disable();
                this.form.controls["location"].disable();
                this.form.controls["provincia"].disable();
                this.form.controls["canton"].disable();
                this.form.controls["products"].disable();
                this.form.controls["budget"].disable();
                this.form.controls["gender_range"].disable();
                this.form.controls["name"].disable();
                this.form.controls["description"].disable();
                this.form.controls["age_range"].disable();
                this.form.controls["earning_range"].disable();
                if (arg.gender_range == "M" || arg.gender_range == "m") {
                    gender = "male";
                } else {
                    gender = "female";
                }
                console.log(this.selected);

                this.selected = arg.stage;

                this.form.setValue({
                    id: arg.id,
                    location: arg.location,
                    provincia: arg.location.province,
                    canton: arg.location.province,
                    products: arg.products,
                    budget: arg.budget,
                    gender_range: gender,
                    name: arg.name,
                    description: arg.description,
                    age_range: arg.age_range,
                    earning_range: arg.earning_range
                });
                console.log(this.form.controls["id"].value);
            });
        });
    }

    onNgModelChange($event): void {
        console.log($event);
        this.selectedOption = $event;
    }
    sendEmail(): void {
        this._campaing.getEmail(this.form.value.id).subscribe(
            data => {
                this.flatEmail = true;
                this.flatEmailError = false;

                this.flatCampaign = false;
                this.flatCampaignError = false;
            },
            error => {
                this.flatEmail = false;
                this.flatEmailError = true;

                this.flatCampaign = false;
                this.flatCampaignError = false;
            }
        );
    }

    updateState(): void {
        this._campaing.putStage(this.form.value, this.selected).subscribe(
            data => {
                this.flatCampaign = true;
                this.flatCampaignError = false;

                this.flatEmail = false;
                this.flatEmailError = false;
            },
            error => {
                this.flatCampaign = false;
                this.flatCampaignError = true;

                this.flatEmail = false;
                this.flatEmailError = false;
            }
        );
    }
}
