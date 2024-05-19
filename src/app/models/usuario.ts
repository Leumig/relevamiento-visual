export class Usuario {
  correo: string;
  clave: string;
  nombreUsuario: string;
  perfil: string;
  sexo: string;
  creditos: number;
  public id?: string  // Campo opcional para almacenar el ID de Firestore

  constructor(correo: string, clave: string, nombreUsuario: string, perfil: string, sexo: string, creditos: number, id?: string) {
    this.correo = correo;
    this.clave = clave;
    this.nombreUsuario = nombreUsuario;
    this.perfil = perfil;
    this.sexo = sexo;
    this.creditos = creditos;
    this.id = id;
  }
}