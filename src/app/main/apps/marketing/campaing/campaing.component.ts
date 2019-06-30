import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatSliderModule } from "@angular/material/slider";
import { fuseAnimations } from "@fuse/animations";

import { orderStatuses } from "app/main/apps/e-commerce/order/order-statuses";
import { Order } from "app/main/apps/e-commerce/order/order.model";
import { EcommerceOrderService } from "app/main/apps/e-commerce/order/order.service";

@Component({
    selector: "app-campaing",
    templateUrl: "./campaing.component.html",
    styleUrls: ["./campaing.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CampaingComponent implements OnInit, OnDestroy {
    form: FormGroup;
    order: Order;
    orderStatuses: any;
    statusForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EcommerceOrderService} _ecommerceOrderService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _ecommerceOrderService: EcommerceOrderService,
        private _formBuilder: FormBuilder
    ) {
        // Set the defaults
        this.order = new Order();
        this.orderStatuses = orderStatuses;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to update order on changes
        this._ecommerceOrderService.onOrderChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(order => {
                this.order = new Order(order);
            });

        this.statusForm = this._formBuilder.group({
            newStatus: [""]
        });

        this.form = this._formBuilder.group({
            name: ["", Validators.required],
            description: ["", Validators.required]
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update status
     */
    updateStatus(): void {
        const newStatusId = Number.parseInt(
            this.statusForm.get("newStatus").value
        );

        if (!newStatusId) {
            return;
        }

        const newStatus = this.orderStatuses.find(status => {
            return status.id === newStatusId;
        });

        newStatus["date"] = new Date().toString();

        this.order.status.unshift(newStatus);
    }
}
