export interface FireEasyModel {

  /**
   * Firestore document id.
   */
  id?: string;

  /**
   * Return the models state into a json format.
   */
  toJson(): JSON;
}


export interface PaginationOptions {
  pageSize: number;

  orderBy: string;

  isAsc: boolean;
}
