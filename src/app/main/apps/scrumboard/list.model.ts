import { FuseUtils } from '@fuse/utils';

export class List
{
    id: string;
    name: string;
    sales: any[];
    

    /**
     * Constructor
     *
     * @param list
     */
    constructor(list)
    {
        this.id = list.id || FuseUtils.generateGUID();
        this.name = list.name || '';
        this.sales = [];
    }
}
