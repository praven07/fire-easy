export interface FireEasyModel {

  /**
   * Firestore document id.
   */
  id?: string;

  /**
   * Return the models state in an object format.
   */
  toJson(): Object;
}


export interface PaginationOptions {
  pageSize: number;

  orderBy: string;

  isAsc: boolean;
}
