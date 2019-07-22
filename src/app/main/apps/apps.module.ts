import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";

const routes = [
    {
        path: "dashboards/analytics",
        loadChildren:
            "./dashboards/analytics/analytics.module#AnalyticsDashboardModule"
    },
    {
        path: "dashboards/project",
        loadChildren:
            "./dashboards/project/project.module#ProjectDashboardModule"
    },
    {
        path        : 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule'
    },
    {
        path: "e-commerce",
        loadChildren: "./e-commerce/e-commerce.module#EcommerceModule"
    },
    {
        path: "academy",
        loadChildren: "./academy/academy.module#AcademyModule"
    },
    {
        path: "todo",
        loadChildren: "./todo/todo.module#TodoModule"
    },
    {
        path: "file-manager",
        loadChildren: "./file-manager/file-manager.module#FileManagerModule"
    },
    {
        path        : 'scrumboard',
        loadChildren: './scrumboard/scrumboard.module#ScrumboardModule'
    },
    {
        path: "client",
        loadChildren: "./clients/client.module#AppClientModule"
    },
    {
        path: "security",
        loadChildren: "./security/security.module#SecurityModule"
    },
    {
        path: "marketing",
        loadChildren: "./marketing/marketing.module#MarketingModule"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FuseSharedModule],
    declarations: []
})
export class AppsModule {}
