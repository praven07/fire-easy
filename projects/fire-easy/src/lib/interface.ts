import {DocumentSnapshot, QueryFn} from "@angular/fire/compat/firestore";

export interface CollectionInterface<T> {

  add(data: T): Promise<string>;

  update(data: T): Promise<void>;

  delete(data: T): Promise<void>;

  deleteById(id: string): Promise<void>;

  getAll(): Promise<T[]>;

  query(queryFn?: QueryFn): Promise<T[]>;
}
