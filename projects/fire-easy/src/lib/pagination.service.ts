import {FireEasyModel, PaginationOptions} from "./model";
import {PaginationInterface} from "./interface";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CollectionService} from "./collection.service";

export abstract class PaginationService<T extends FireEasyModel> extends CollectionService<T> implements PaginationInterface<T> {

  protected constructor(firestore: AngularFirestore, collectionPath: string, protected options: PaginationOptions) {
    super(firestore, collectionPath);
  }

  public getFirst(): Promise<T[]> {
    return this.query((ref) => {
      return ref.orderBy(this.options.orderBy, this.options.isAsc ? "asc" : "desc").limit(this.options.pageSize);
    });
  }

  getNext(data: T): Promise<T[]> {
    return this.query((ref) => {
      return ref.orderBy(this.options.orderBy, this.options.isAsc ? "asc" : "desc")
        .startAfter(this.getFieldValue(data))
        .limit(this.options.pageSize);
    });
  }

  getPrevious(data: T): Promise<T[]> {
    return this.query((ref) => {
      return ref.orderBy(this.options.orderBy, (!this.options.isAsc) ? "asc" : "desc")
        .startAfter(this.getFieldValue(data))
        .limit(this.options.pageSize);
    });
  }

  /**
   * This should return an array of string values from the data. The value must be something unique enough that
   * firestore can use to identify to filter.
   *
   * ex: If the data is a User("name", "age", "dateOfBirth");
   *     You can return ["name", "dateOfBirth"].
   *
   * @param data
   * @protected
   */
  protected abstract getFieldValue(data: T): string[];
}
