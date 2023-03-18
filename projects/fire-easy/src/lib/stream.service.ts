import {FireEasyModel} from "./model";
import {StreamInterface} from "./interface";
import {map, Observable} from "rxjs";
import {CollectionService} from "./collection.service";

export abstract class CollectionStreamService<T extends FireEasyModel> extends CollectionService<T> implements StreamInterface<T[]> {

  /**
   * This is just a base stream method. It streams all the entire collection.
   * I would recommend writing a stream override and adding filters.
   */
  public stream(): Observable<T[]> {
    return this.firestore.collection(this.collectionPath).snapshotChanges().pipe(
      map((snapshot => this.snapshotToModel(snapshot as any))),
    );
  }
}
