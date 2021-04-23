
export class Reserva{
    id: number;
    idPlanta: number;
    descripcionPlanta: string;
    fecha: string;
    hora: string;
    patente: string;
    nombre: string;
    apellido: string;
    rut: string;
    telefono: string;
    email: string;
    idComoNosConocio: string;
    idComuna: string;
    agregarAlCalendario: boolean;
  
    constructor(data?: any){
      if (data) { 
        this.id = data.id;
        this.idPlanta = data.idPlanta;
        this.descripcionPlanta = data.descripcionPlanta;
        this.fecha = data.fecha;
        this.hora = data.hora;
        this.patente = data.patente;
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.rut = data.rut;
        this.telefono = data.telefono;
        this.email = data.email;
        this.idComoNosConocio = data.idComoNosConocio;
        this.idComuna = data.idComuna;
        this.agregarAlCalendario = data.agregarAlCalendario;
      }
    }
  }
  
  export class Disponibilidad{
    fecha: string;
    horasDisponibles: HorasDisponibles[]; 
  }
  
  export class HorasDisponibles{
    hora: string;
    cantidad: number;
  }
  
  export class BusquedaDeDisponibilidad{
    fechaDesde: string;
    fechaHasta: string;
    centro: string;
  
    constructor(data?: any){
      if (data) { 
        this.fechaDesde = data?.fechaDesde;
        this.fechaHasta = data?.fechaHasta;
        this.centro = data?.centro;
      }
    }
  }
