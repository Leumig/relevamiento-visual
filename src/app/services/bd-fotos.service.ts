import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, orderBy } from '@angular/fire/firestore';
import { Foto } from '../models/foto';
import { doc, getDoc, getDocs, updateDoc, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BdFotosService {
  private PATH = 'fotos';

  constructor(private firestore: Firestore) {}

  // Función para guardar los datos de la foto en Firestore
  async guardarFoto(foto: Foto) {
    try {
      const fotosCollection = collection(this.firestore, this.PATH);
      const fotoData = {
        url: foto.url,
        nombre: foto.nombre,
        tipo: foto.tipo,
        fecha: foto.fecha,
        usuario: foto.usuario,
        votos: foto.votos,
        votantes: foto.votantes
      };

      const docRef = await addDoc(fotosCollection, fotoData);
      foto.id = docRef.id;
      console.log('Foto guardada en Firestore con ID:', foto.id);
    } catch (error) {
      console.error('Error al guardar la foto en Firestore:', error);
    }
  }

  // Función para obtener fotos de Firestore según su tipo y ordenadas por fecha
  async obtenerFotos(tipo?: string): Promise<Foto[]> {
    const col = collection(this.firestore, this.PATH);
    let q;
    
    if (tipo) {
      q = query(col, where('tipo', '==', tipo), orderBy('fecha', 'desc'));
    } else {
      q = query(col, orderBy('fecha', 'desc'));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => this.convertirAFoto(doc.data(), doc.id));
  }

  private convertirAFoto(doc: any, id?: string): Foto {
    return new Foto(
      doc.url,
      doc.nombre,
      doc.tipo,
      doc.fecha,
      doc.usuario,
      doc.votos || 0,
      doc.votantes || [],
      id
    );
  }


  // Función que incrementa en 1 los votos de una foto, y le agrega el usuario que la votó
  async votarFoto(fotoId: string, usuario: string): Promise<void> {
    const fotoDocRef = doc(this.firestore, `${this.PATH}/${fotoId}`);
    const fotoSnapshot = await getDoc(fotoDocRef);

    if (fotoSnapshot.exists()) {
      const fotoData = fotoSnapshot.data() as Foto;

      if (!fotoData.votantes) {
        fotoData.votantes = []; // Inicializo como un array vacío si es undefined
      }

      if (!fotoData.votantes.includes(usuario)) {
          fotoData.votantes.push(usuario);
          fotoData.votos += 1;

          await updateDoc(fotoDocRef, {
              votantes: fotoData.votantes,
              votos: fotoData.votos
          });

          console.log(`Foto ${fotoId} votada por ${usuario}`);
      } else {
          console.log(`El usuario ${usuario} ya ha votado esta foto`);
      }
    }
  }
}