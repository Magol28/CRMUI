import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'dashboards',
                title    : 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type     : 'collapsable',
                icon     : 'dashboard',
                children : [
                    {
                        id   : 'analytics',
                        title: 'Analytics',
                        type : 'item',
                        url  : '/apps/dashboards/analytics'
                    },
                    {
                        id   : 'project',
                        title: 'Actividades Venta',
                        type : 'item',
                        url  : '/apps/dashboards/project'
                    }
                ]
            },
            {
                id       : 'calendar',
                title    : 'Calendar',
                translate: 'NAV.CALENDAR',
                type     : 'item',
                icon     : 'today',
                url      : '/apps/calendar'
            },
            {
                id       : 'e-commerce',
                title    : 'Products',
                translate: 'NAV.PRODUCTS',
                type     : 'collapsable',
                icon     : 'shopping_cart',
                children : [
                    {
                        id        : 'products',
                        title     : 'Products',
                        type      : 'item',
                        url       : '/apps/security/products',
                        exactMatch: true
                    },
                    {
                        id        : 'Product',
                        title     : 'Product ',
                        type      : 'item',
                        url       : '/apps/security/product/new',
                        exactMatch: true
                    }
                ]
            },
            {
                id       : 'file-manager',
                title    : 'File Manager',
                translate: 'NAV.FILE_MANAGER',
                type     : 'item',
                icon     : 'folder',
                url      : '/apps/file-manager'
            },
            {

                id       : 'Sales',
                title    : 'Sales',
              
                translate: 'NAV.SCRUMBOARD',
                type     : 'item',
                icon     : 'assessment',
                url      : '/apps/scrumboard'
            }
        ]
    },
    {
            
                id      : 'mployees',
                title   : 'Employees',
                type    : 'collapsable',
                icon    : 'lock',
                badge   : {
                    title: '2',
                    bg   : '#525e8a',
                    fg   : '#FFFFFF'
                },
                children: [
                    {
                        id   : 'Employees',
                        title: 'Employees',
                        type : 'item',
                        url  : '/apps/security/employees'
                    },
                    {
                        id   : 'Employee',
                        title: 'Employee',
                        type : 'item',
                        url  : '/apps/security/employee/new'
                    }
                ]
    },
    {
            
                id      : 'ser',
                title   : 'User',
                type    : 'collapsable',
                icon    : 'lock',
                badge   : {
                    title: '2',
                    bg   : '#525e8a',
                    fg   : '#FFFFFF'
                },
                children: [
                    {
                        id   : 'Users',
                        title: 'Users',
                        type : 'item',
                        url  : '/apps/security/users'
                    },
                    {
                        id   : 'User',
                        title: 'User',
                        type : 'item',
                        url  : '/apps/security/user/new'
                    }
                ]
    },
    {
            
        id      : 'Marketing',
        title   : 'Marketing',
        type    : 'collapsable',
        icon    : 'lock',
        badge   : {
            title: '4',
            bg   : '#525e8a',
            fg   : '#FFFFFF'
        },
        children: [
            {
                id   : 'Telemarketing',
                title: 'Telemarketing',
                type : 'item',
                url  : '/apps/marketing/telemarketing'
            },
            {
                id   : 'Campaing',
                title: 'Campaing',
                type : 'item',
                url  : '/apps/marketing/campaing'
            },
            {
                id   : 'clientCampaing',
                title: 'Client Campain',
                type : 'item',
                url  : '/apps/marketing/clientCampaing'
            },
            {
                id   : 'ReportCampaing',
                title: 'Report Campaing',
                type : 'item',
                url  : '/apps/marketing/ReportCampaing'
            },
            {
                id   : 'stateCampaing',
                title: 'State Campaing',
                type : 'item',
                url  : '/apps/marketing/stateCampaing'
            }

            
        ]
}
        
    
];
