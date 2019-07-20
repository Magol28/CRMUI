import { Component, OnInit, NgModule } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-tele-marketing",
    templateUrl: "./tele-marketing.component.html",
    styleUrls: ["./tele-marketing.component.scss"]
})
export class TeleMarketingComponent implements OnInit {
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    constructor(private _formBuilder: FormBuilder) {}
    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ["", Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ["", Validators.required]
        });
    }
}
