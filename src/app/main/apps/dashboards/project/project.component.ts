import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as shape from 'd3-shape';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { SalesService } from '../../scrumboard/services/sales.service';
/* import { ScrumboardService } from 'app/main/apps/scrumboard/scrumboard.service';
import { ScrumboardCardDialogComponent } from 'app/main/apps/scrumboard/board/dialogs/card/card.component';  */

@Component({
    selector     : 'project-dashboard',
    templateUrl  : './project.component.html',
    styleUrls    : ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProjectDashboardComponent implements OnInit
{
    form: FormGroup;
    form1: FormGroup;
    form2: FormGroup;
    form3: FormGroup;
    form4: FormGroup;
    form5: FormGroup;

    tasks=[];
    meetings=[];
    communications=[];
    quotations=[];
    services=[];
    calls=[];
    mails=[];

    nameUser = "Cristina";

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private activateR: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _sales: SalesService
        )
    {
    }

    ngOnInit(): void
    {
        this.form = this._formBuilder.group({           
            description: ['']
        });

        this.form1 = this._formBuilder.group({
            topic: [''],
            description1: [''],
            date: [''],
            assistants: [''],
            duration: [''],
            place: [''],
            observation: ['']
        });

        this.form2 = this._formBuilder.group({
            subject: [''],
            description2: [''],
            date2: [''],
            observation2: [''],
            phone: [''],
            state: ['']
        });

        this.form3 = this._formBuilder.group({
            services: [''],
            amount: [''],
            services1: [''],
            amount1: ['']
        });

        this.form4 = this._formBuilder.group({
            idService: [''],
            description4: [''],
            unitValue: ['']
        });

        this.form5 = this._formBuilder.group({
            subject5: [''],
            description5: [''],
            observation5: [''],
            mail: [''],
        });
        

        this.activateR.params.subscribe(params => {
            const cedula = params['id'];
            this._sales.getTaskBySale(cedula).subscribe(data=>{
                console.log(data.tasks)
               this.tasks=data.tasks;
            })
            this._sales.getMeetingsBySale(cedula).subscribe(data=>{
                console.log(data.tasks)
               this.meetings=data.tasks;
            })
            this._sales.getCommunicationsBySale(cedula).subscribe(data=>{
                console.log(data.tasks)
               this.communications=data.tasks;
            })
            this._sales.getCallsBySale(cedula).subscribe(data=>{
                console.log(data.communication)
               this.calls=data.communication;
            })
            this._sales.getQuotationsBySale(cedula).subscribe(data=>{
                console.log(data.quotations)
               this.quotations=data.quotations || [];
            })
            this._sales.getServices(cedula).subscribe(data=>{
                console.log(data.services)
               this.services=data.services;
            })
            this._sales.getMailsBySale(cedula).subscribe(data=>{
                console.log(data.communication)
               this.mails=data.communication;
            })
            
        });
    }

    addTask(): void
    {            
        this.activateR.params.subscribe(params => {
            const cedula = params['id'];
            console.log(cedula);
            const data = 
            {task: {            
                description: this.form.getRawValue().description,
                realized: true
            }};
            
            this._sales.postTask(cedula, data).subscribe(data => {
                console.log(data);

            });
        });        
    }

    addMeeting(): void
    {            
        console.log("entro por fin");
        this.activateR.params.subscribe(params => {
            const cedula = params['id'];
            console.log(cedula);
            const data = 
            {meeting: {            
                topic: this.form1.getRawValue().topic,
                description: this.form1.getRawValue().description1,
                date: this.form1.getRawValue().date,
                assistants: [this.form1.getRawValue().assistants],
                duration: this.form1.getRawValue().duration,
                place: this.form1.getRawValue().place,
                observation: this.form1.getRawValue().observation
            }};
            
            this._sales.postMeeting(cedula, data).subscribe(data => {
                console.log(data);

            });
        });        
    }

    addCall(): void
    {            
        console.log("entro por fin");
        this.activateR.params.subscribe(params => {
            const cedula = params['id'];
            console.log(cedula);
            const data = 
            {communication: {            
                subject: this.form2.getRawValue().subject,
                description: this.form2.getRawValue().description2,
                date: this.form2.getRawValue().date2,
                type: "call",
                place: this.form2.getRawValue().place,
                observation: this.form2.getRawValue().observation2,
                call: {
                    phone: this.form2.getRawValue().phone,
                    state: this.form2.getRawValue().state
                }
            }};
            
            this._sales.postCall(cedula, data).subscribe(data => {
                console.log(data);

            });
        });        
    }

    addMail(): void
    {            
        console.log("entro por fin");
        this.activateR.params.subscribe(params => {
            const cedula = params['id'];
            console.log(cedula);
            const data = 
            {communication: {            
                subject: this.form5.getRawValue().subject5,
                description: this.form5.getRawValue().description5,
                date: new Date(),
                type: "mail",
                observation: this.form5.getRawValue().observation5,
                email: {
                    attachment: [],
                    to: this.form5.getRawValue().mail,
                    subject: this.form5.getRawValue().subject5,
                    html: "<h1>"+this.form5.getRawValue().description5+"</h1>",
                }
            }};
            
            this._sales.postMail(cedula, data).subscribe(data => {
                console.log(data);

            });
        });        
    }

    addService(): void
    {            
            const data = 
            {service: 
                {            
                idService: this.form4.getRawValue().idService,
                description: this.form4.getRawValue().description4,
                unitValue: this.form4.getRawValue().unitValue
            }};
            
            this._sales.postService(data).subscribe(data => {
                console.log(data);

            });      
    }

    addQuote(): void
    {            
        console.log("entro por fin");
        this.activateR.params.subscribe(params => {
            const cedula = params['id'];            
            console.log(cedula);
            let id1 = "5d1975fddc397631d863fedc";
            let id2 = "5d34ed1d466f52392414d545";
            for(var i=0; i<this.services.length; i++){
                console.log(this.services[i]._id);
                if(this.services[i].idService == this.form3.getRawValue().service){
                    id1 = this.services[i]._id;
                }
                if(this.services[i].idService == this.form3.getRawValue().service1){
                    id2 = this.services[i]._id;
                }
            }
            const data = 
            {quotation: {            
                offers: [{
                    services: [
                        {
                            _id: id1,
                            amount: this.form3.getRawValue().amount,
                        },
                        {
                            _id: id2,
                            amount: this.form3.getRawValue().amount1,
                        }
                    ]
                }],
                description: "cotizacion"     
            },

            company: [{
                name: "Suso",
                ruc: "17104141484",
                address: "Sangolqui",
                phone: "0993848556",
                mail: "cudiaza@gmail.com"
            },
            {
                name: "Multiservicios Industriales",
                ruc: "1708467524",
                address: "Amaguania",
                phone: "0997097891",
                mail: "marcelo96mh@hotmail.com"
            }]

        };
            
            this._sales.postCotizacion(cedula, data).subscribe(data => {
                console.log(data);
            });
        });        
    }

    aceptQuote(): void{
        this.activateR.params.subscribe(params => {
            const cedula = params['id'];            
            this._sales.putSale(cedula).subscribe(data => {
                console.log(data);
            });
        });    
    }

    closeSale(): void{
        this.activateR.params.subscribe(params => {
            const cedula = params['id'];            
            this._sales.putSaleClose(cedula).subscribe(data => {
                console.log(data);
            });
        });    
    }

    cancelSale(): void{
        this.activateR.params.subscribe(params => {
            const cedula = params['id'];            
            this._sales.putSaleCancel(cedula).subscribe(data => {
                console.log(data);
            });
        });    
    }
}


