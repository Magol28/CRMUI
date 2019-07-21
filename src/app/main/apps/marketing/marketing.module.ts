import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatRippleModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { AgmCoreModule } from "@agm/core";
import { MatSliderModule } from "@angular/material/slider";

import { FuseSharedModule } from "@fuse/shared.module";
import { FuseWidgetModule } from "@fuse/components/widget/widget.module";
import { MatRadioModule } from "@angular/material/radio";
import { EcommerceOrdersComponent } from "app/main/apps/e-commerce/orders/orders.component";
import { EcommerceOrdersService } from "app/main/apps/e-commerce/orders/orders.service";
import { EcommerceOrderComponent } from "app/main/apps/e-commerce/order/order.component";
import { EcommerceOrderService } from "app/main/apps/e-commerce/order/order.service";
import { CampaingComponent } from "./campaing/campaing.component";
import { TeleMarketingComponent } from "./tele-marketing/tele-marketing.component";
import { MatStepperModule } from "@angular/material";
import { Campaing2Component } from "./campaing2/campaing2.component";
import { ReportCampaingComponent } from "./report-campaing/report-campaing.component";
import { ClientCampaingComponent } from "./client-campaing/client-campaing.component";
import { StateCampaingComponent } from "./state-campaing/state-campaing.component";
import { ClientCampaingService } from "./services/client-campaing.service";
import { StateCampaingIdComponent } from "./state-campaing-id/state-campaing-id.component";

const routes: Routes = [
    {
        path: "camp/:id",
        component: CampaingComponent,
        resolve: {
            data: EcommerceOrderService
        }
    },
    {
        path: "telemarketing",
        component: TeleMarketingComponent
    },
    {
        path: "campaing",
        component: Campaing2Component
    },
    {
        path: "clientCampaing",
        component: ClientCampaingComponent
    },
    {
        path: "ReportCampaing",
        component: ReportCampaingComponent
    },
    {
        path: "stateCampaing",
        component: StateCampaingComponent
    },
    {
        path: "stateCampaingDetail/:id",
        component: StateCampaingIdComponent
    }
];

@NgModule({
    declarations: [
        CampaingComponent,
        EcommerceOrdersComponent,
        EcommerceOrderComponent,
        TeleMarketingComponent,
        Campaing2Component,
        ReportCampaingComponent,
        ClientCampaingComponent,
        StateCampaingComponent,
        StateCampaingIdComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatRadioModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatSliderModule,
        NgxChartsModule,
        MatStepperModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8"
        }),

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers: [
        EcommerceOrdersService,
        EcommerceOrderService,
        ClientCampaingService
    ]
})
export class MarketingModule {}
