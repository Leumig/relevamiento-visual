import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Firestore, collection, query, where, getDocs, doc, collectionData } from '@angular/fire/firestore';
import { addDoc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BdUsuariosService {
  private PATH = 'usuarios';

  constructor(private firestore: Firestore) {}

  // Función para guardar un nuevo usuario en la BD
  async guardar(usuario: Usuario): Promise<void> {
    try {
      const col = collection(this.firestore, this.PATH);
      const docRef = await addDoc(col, {
        correo: usuario.correo,
        nombreUsuario: usuario.nombreUsuario,
        perfil: usuario.perfil,
        sexo: usuario.sexo,
        creditos: usuario.creditos
      });
      usuario.id = docRef.id; // Guardo el ID generado por Firestore en el objeto Usuario
    } catch (error) {
      console.error('Error guardando usuario en Firestore:', error);
    }
  }

  // Función para obtener un usuario específico por correo
  async getUsuarioPorCorreo(correo: string): Promise<Usuario | undefined> {
    const col = collection(this.firestore, this.PATH);
    const q = query(col, where('correo', '==', correo.toLowerCase()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return this.convertirAUsuario(doc.data(), doc.id);
    }

    return undefined;
  }

  // Función para convertir datos de Firestore a objeto Usuario
  private convertirAUsuario(doc: any, id?: string): Usuario {
    return new Usuario(
      doc.correo,
      '', // La clave la omito
      doc.nombreUsuario,
      doc.perfil,
      doc.sexo,
      doc.creditos,
      id
    );
  }

  // Función para actualizar los créditos de un usuario
  async updateUsuario(usuario: Usuario): Promise<void> {
    if (!usuario.id) {
      console.error('Error: El usuario no tiene un ID.');
      return;
    }

    try {
      const userDocRef = doc(this.firestore, `${this.PATH}/${usuario.id}`);
      await updateDoc(userDocRef, { creditos: usuario.creditos });
    } catch (error) {
      console.error('Error actualizando usuario en Firestore:', error);
    }
  }
}
