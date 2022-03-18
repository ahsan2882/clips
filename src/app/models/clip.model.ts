import firebase from "firebase/compat/app";
import { QueryDocumentSnapshot } from "@angular/fire/compat/firestore";

export interface IClip{
  uid: string;
  displayName: string;
  title: string;
  fileName: string;
  url: string;
  timestamp: firebase.firestore.FieldValue,
  docID?: string;
}
