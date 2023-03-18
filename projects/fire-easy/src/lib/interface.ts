import {QueryFn} from "@angular/fire/compat/firestore";

export interface CollectionInterface<T> {

  add(data: T): Promise<string>;
  update(data: T): Promise<void>;

  delete(data: T): Promise<void>;

  deleteById(id: string): Promise<void>;

  getAll(): Promise<T[]>;

  search(searchValue: string, key: string): Promise<T[]>;

  query(queryFn?: QueryFn): Promise<T[]>;
}


export interface PaginationInterface<T> {

  getFirst(): Promise<T[]>;
  getNext(data: T): Promise<T[]>;
  getPrevious(data: T): Promise<T[]>;
}
