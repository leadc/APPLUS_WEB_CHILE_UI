export class Reserva{
    id: number;
    idPlanta: number;
    descripcionPlanta: string;
    observacionPlanta: string;
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
    codigo: string;
  
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
        this.codigo = data.codigo;
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

  export class RespuestaDisponibilidad {
    fechaActual: string;
    disponibilidad: Disponibilidad[];
  }

  export class DataForm1{
    regiones: Region[];
  }

  export class Region{
    id: number;
    nombre: string;
    plantas: Planta[];
  }

  export class Planta{
    id: number;
    nombre: string;
    observacion: string;
  }
