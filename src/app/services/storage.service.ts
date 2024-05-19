import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Función para guardar la foto en Storage
  async subirImagen(fileUri: string): Promise<string> {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, 'fotos/' + new Date().getTime() + '.jpg');

    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }
}