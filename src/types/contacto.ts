//file types/contacto.ts

export interface BasicContacto {
    id: number,
  }
  
  export interface Contacto extends BasicContacto {
    nombre: string,
    apellido: string,
    correo: string,
    celular: string,
    area: string,
    creado: Date,
    actualizado: Date,
    mensaje: string
  }