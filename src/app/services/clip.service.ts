import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { IClip } from '../models/clip.model';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';


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
      }),
      map(snapshot => (snapshot as QuerySnapshot<IClip>).docs)
    )
  }
}
