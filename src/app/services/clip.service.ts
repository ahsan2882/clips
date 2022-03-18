import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { IClip } from '../models/clip.model';

@Injectable({
  providedIn: 'root'
})
export class ClipService {
  public clipCollection: AngularFirestoreCollection<IClip>

  constructor(
    private db: AngularFirestore
  ) {
    this.clipCollection = db.collection('clips')
  }

  createClip(data: IClip) {
    return this.clipCollection.add(data)
  }
}