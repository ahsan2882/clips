import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { IClip } from '../models/clip.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClipService {
  public clipCollection: AngularFirestoreCollection<IClip>

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.clipCollection = db.collection('clips')
  }

  createClip(data: IClip):Promise<DocumentReference<IClip>> {
    return this.clipCollection.add(data)
  }

  getUserClips() {
    return this.auth.user.pipe(
      switchMap(user => {
        if (!user) {
          return of([])
        }
        const query = this.clipCollection.ref.where(
          'uid', '==', user.uid
        )
        return query.get()
      })
    )
  }
}
