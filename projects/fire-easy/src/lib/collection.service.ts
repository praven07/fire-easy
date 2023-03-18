import {BaseService} from "./base.service";
import {FireEasyModel} from "./model";
import {
  AngularFirestore,
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
  QueryFn, QuerySnapshot
} from "@angular/fire/compat/firestore";
import {CollectionInterface} from "./interface";
import {lastValueFrom} from "rxjs";

export abstract class CollectionService<T extends FireEasyModel> extends BaseService<T> implements CollectionInterface<T> {

  protected collectionRef: CollectionReference;

  protected constructor(protected firestore: AngularFirestore, protected collectionPath: string) {
    super();

    this.collectionRef = firestore.collection(collectionPath).ref as CollectionReference<DocumentData>;
  }

  /**
   * Adds the provided data to the collection.
   * @param data
   */
  public async add(data: T): Promise<string> {

    try {
      const doc = await this.collectionRef.add(data.toJson());
      return doc.id;
    } catch (e) {
      throw e;
    }
  }

  public async update(data: T): Promise<void> {

    if (data.id == null) {
      throw Error("The provided data does not have an id.");
    }

    return this.collectionRef.doc(data.id).update(data.toJson());
  }

  public async delete(data: T): Promise<void> {

    if (data.id == null) {
      throw Error("The provided data does not have an id.");
    }

    return this.deleteById(data.id);
  }

  public deleteById(id: string): Promise<void> {

    return this.collectionRef.doc(id).delete();
  }

  public async getAll(): Promise<T[]> {

    const snapshot = await this.collectionRef.get();
    return this.snapshotToModel(snapshot as QuerySnapshot<any>);
  }

  public async query(queryFn?: QueryFn): Promise<T[]> {

    const snapshot = await lastValueFrom(this.firestore.collection(this.collectionPath, queryFn).get());
    return this.snapshotToModel(snapshot as QuerySnapshot<any>);
  }


  /**
   * This search method by default only searches in the tags array field in the document but a custom key can be
   * provided. Firestore does not have a native search feature so this is just a workaround.
   *
   * ex: tags: ["Peter", "Sam", "Samuel"]
   * search("Sa", "tags") return ["Sam", "Samuel"]
   * @param searchValue
   * @param key
   */
  public async search(searchValue: string, key: string = "tags"): Promise<T[]> {

    return this.query(ref => ref.where(key, 'array-contains', searchValue));
  }

  private snapshotToModel(snapshot: QuerySnapshot<any>): T[] {

    return snapshot.docs.map(doc => this.fromDocument(doc as DocumentSnapshot<any>));
  }

  protected abstract fromDocument(doc: DocumentSnapshot<any>): T;
}
