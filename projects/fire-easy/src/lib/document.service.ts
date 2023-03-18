import {FireEasyModel} from "./model";
import {BaseService} from "./base.service";
import {
  AngularFirestore,
  DocumentReference,
  DocumentSnapshot,
} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {StreamInterface} from "./interface";


export abstract class DocumentService<T extends FireEasyModel> extends BaseService<T> implements StreamInterface<T> {

  protected documentReference: DocumentReference<any>;

  protected constructor(protected firestore: AngularFirestore, protected documentPath: string) {
    super();

    this.documentReference = firestore.doc(documentPath).ref;
  }

  public async set(data: T): Promise<void> {

    return await this.documentReference.set(data.toJson());
  }

  public async update(data: T): Promise<void> {

    return await this.documentReference.update(data.toJson());
  }

  public async delete(): Promise<void> {

    return await this.documentReference.delete();
  }

  public async get(): Promise<T> {

    try {
      const doc = await this.documentReference.get();
      return this.fromDocument(doc);
    } catch (e) {
      throw e;
    }
  }

  public stream(): Observable<T> {

    return this.firestore.doc(this.documentPath).snapshotChanges().pipe(
      map(snapshot => this.fromDocument(snapshot as any))
    );
  }

  protected abstract fromDocument(doc: DocumentSnapshot<any>): T;
}
