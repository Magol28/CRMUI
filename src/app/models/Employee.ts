import { Company } from './Company';

export class Employee{
    cedula: String;
    nombre: String;
    fecha_nacimiento: Date;
    fecha_ingreso: Date;
    fecha_salida: Date;
    direccion: String;
    telefono: String;
    email: String;
    sexo: String;
	empresa: Company;
}