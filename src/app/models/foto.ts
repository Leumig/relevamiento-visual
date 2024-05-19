import { Timestamp } from "firebase/firestore";

export class Foto {
  id?: string; // ID opcional, Firebase lo genera automáticamente
  url: string;
  nombre: string;
  tipo: string;
  fecha: Timestamp;
  usuario: string;
  votos: number;
  votantes: string[];

  constructor(url: string, nombre: string, tipo: string, fecha: Timestamp,
     usuario: string, votos: number, votantes: string[] = [], id?: string) {
    this.url = url;
    this.nombre = nombre;
    this.tipo = tipo;
    this.fecha = fecha;
    this.usuario = usuario;
    this.votos = votos;
    this.votantes = votantes;
    this.id = id;
  }
}