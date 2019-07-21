import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from "@angular/forms";
import { Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { StateCampaingService } from "../services/state-campaing.service";

@Component({
    selector: "app-state-campaing-id",
    templateUrl: "./state-campaing-id.component.html",
    styleUrls: ["./state-campaing-id.component.scss"]
})
export class StateCampaingIdComponent implements OnInit {
    selected = "Unavailable";
    disableSelect = new FormControl(false);
    form: FormGroup;
    resources: any[];
    selectedOptions = [];
    selectedOption;

    constructor(
        private activateR: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _campaing: StateCampaingService
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            id: [""],
            name: ["", Validators.required],
            description: [""]
        });
        this.activateR.params.subscribe(params => {
            // tslint:disable-next-line:no-unused-expression
            const idCampaing = params["id"];

            const data = this._campaing.getID(idCampaing).subscribe(arg => {
                this.form.setValue({
                    id: arg.id,
                    name: arg.name,
                    description: arg.description
                });
                console.log(this.form.controls["id"].value);
            });
        });
    }

    onNgModelChange($event): void {
        console.log($event);
        this.selectedOption = $event;
    }
}
