import { Auth } from "firebase/auth";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { IImage, IListImage } from "@/types";

export default class ImageController {
  private _firestore: Firestore;

  public constructor(firestore: Firestore) {
    this._firestore = firestore;
  }

  private _GetImagesCollection() {
    return collection(this._firestore, "images") as CollectionReference<IImage>;
  }

  public async GetImages(): Promise<IListImage[]> {
    const snapshot = await getDocs<IImage>(query(this._GetImagesCollection(), limit(11)));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  public async AddImage(image: IImage): Promise<void> {
    await addDoc(this._GetImagesCollection(), image);
  }

  public async RmImage(id: string, auth: Auth): Promise<string> {
    const targetRef = doc(this._firestore, "images", id) as DocumentReference<IImage>;

    const targetDoc = await getDoc(targetRef);
    if (targetDoc.data()?.author !== auth.currentUser?.email) throw new Error("Unauthorized access");

    await deleteDoc(targetRef);

    return targetRef.id;
  }
}
