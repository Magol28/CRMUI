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
                        title: 'Project',
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
                title    : 'PRODUCTS',
                translate: 'NAV.PRODUCTS',
                type     : 'collapsable',
                icon     : 'shopping_cart',
                children : [
                    {
                        id        : 'products',
                        title     : 'Products',
                        type      : 'item',
                        url       : '/apps/e-commerce/products',
                        exactMatch: true
                    },
                    {
                        id        : 'productDetail',
                        title     : 'Product Detail',
                        type      : 'item',
                        url       : '/apps/e-commerce/products/1/printed-dress',
                        exactMatch: true
                    },
                    {
                        id        : 'orders',
                        title     : 'Orders',
                        type      : 'item',
                        url       : '/apps/e-commerce/orders',
                        exactMatch: true
                    },
                    {
                        id        : 'orderDetail',
                        title     : 'Order Detail',
                        type      : 'item',
                        url       : '/apps/e-commerce/orders/1',
                        exactMatch: true
                    }
                ]
            },
            {
                id       : 'academy',
                title    : 'Academy',
                translate: 'NAV.ACADEMY',
                type     : 'item',
                icon     : 'school',
                url      : '/apps/academy'
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
                id       : 'contacts',
                title    : 'Contacts',
                translate: 'NAV.CONTACTS',
                type     : 'item',
                icon     : 'account_box',
                url      : '/apps/contacts'
            },
            {
                id       : 'to-do',
                title    : 'To-Do',
                translate: 'NAV.TODO',
                type     : 'item',
                icon     : 'check_box',
                url      : '/apps/todo',
                badge    : {
                    title: '3',
                    bg   : '#FF6F00',
                    fg   : '#FFFFFF'
                }
            },
            {
                id       : 'scrumboard',
                title    : 'Scrumboard',
                translate: 'NAV.SCRUMBOARD',
                type     : 'item',
                icon     : 'assessment',
                url      : '/apps/scrumboard'
            }
        ]
    },
    {
            
                id      : 'employees',
                title   : 'employees',
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
            
                id      : 'Profile',
                title   : 'Profile',
                type    : 'collapsable',
                icon    : 'lock',
                badge   : {
                    title: '2',
                    bg   : '#525e8a',
                    fg   : '#FFFFFF'
                },
                children: [
                    {
                        id   : 'Profiles',
                        title: 'Profiles',
                        type : 'item',
                        url  : '/apps/security/profiles'
                    },
                    {
                        id   : 'Profile',
                        title: 'Profile',
                        type : 'item',
                        url  : '/apps/security/profile/new'
                    }
                ]
    },
    {
            
                id      : 'User',
                title   : 'user',
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
