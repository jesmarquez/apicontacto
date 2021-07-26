//file models/contacto.ts

import {BasicContacto, Contacto } from "../types/contacto";
import {db} from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const findAll = (callback: Function) => {
    const queryString = `
      SELECT 
        p.* 
      FROM contacto AS p`
  
    db.query(queryString, (err, result) => {
      if (err) {callback(err)}
  
      const rows = <RowDataPacket[]> result;
      const contactos: Contacto[] = [];
  
      rows.forEach(row => {
        const contacto: Contacto =  {
          id: row.id,
          nombre: row.nombre,
          apellido: row.apellido,
          celular: row.celular,
          correo: row.correo,
          area: row.area,
          mensaje: row.mensaje,
          creado: row.creado,
          actualizado: row.actualizado
        }
        contactos.push(contacto);
      });
      callback(null, contactos);
    });
  }

  export const create = (contacto: Contacto, callback: Function) => {
    const queryString = "INSERT INTO contacto (nombre, apellido, correo, celular, area, creado, actualizado, mensaje) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    let datenow = Date.now();
    let datenowstr = datenow.toString();
    db.query(
      queryString,
      [contacto.nombre, contacto.apellido, contacto.correo, contacto.celular, contacto.area, datenowstr, datenowstr, contacto.mensaje],
      (err, result) => {
        if (err) {callback(err)};
  
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
  };
