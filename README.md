# FireEasy

An Angular library for firebase. It simplifies the use of the angular fire library. It abstracts away the unnecessary code and makes it easy to setup a backend connection with firebase.

### Installation

```sh
npm i fire-easy --save
```

### Usages

### 1. Create Model
Here is a sample model for client. Every model is **required** to have a `toJson()` and a `static fromDocument(doc)` method.

`toJson()` - This method should return an object that contains the content of the class to be stored in firestore.

`fromDocument(doc)` - It must take in a document and return a model of the class.
```ts
import {FireEasyModel} from "fire-easy";


export class Client implements FireEasyModel {

  id: string;
  name: string;
  email: string;

  public static fromDocument(doc: DocumentSnapshot<any>): Client {

    const client = Object.assign(new Client(), doc.data()) as Client;
    client.id = doc.id;
    return client;
  }

  public toJson(): Object {
    return {
      name: this.name,
      email: this.email,
    };
  }
}

```

### 2. Create Service

`://firestore-collection-path-placeholder` - This is the path to the collection where you want it to be stored.

```ts
import {CollectionService} from "fire-easy";

@Injectable()
export class ClientsService extends CollectionService<Client> {

  public constructor(public override firestore: AngularFirestore) {
    super(firestore, "://firestore-collection-path-placeholder");
  }

  protected fromDocument(doc: DocumentSnapshot<any>): Client {
    return Client.fromDocument(doc);
  }
}
```


### 3. Using in the component

All you have to do now is use it in you componet just like any other service.



## Pagination Feature Usage

**class:** `PaginationService`

This library makes pagination through the collection very simple. All you have to do is extend your service to `PaginationService`.

```ts
import {PaginationService} from "fire-easy";

export class ClientsService extends PaginationService<Client> {}

```

`PaginationService` extends `CollectionService` so you get all the functionality of `CollectionService` plus the pagination feature.

**PaginationOptions**
This is a configuration interface for the `PaginationService`.
```ts
export interface PaginationOptions {
  pageSize: number;

  orderBy: string;

  isAsc: boolean;
}
```

**Methods**


| Method            | Description                                |
|-------------------|--------------------------------------------|
| `getFirst()`      | This returns the first set of documents    |
| `getNext()`       | This returns the next set of documents     |
| `getPrevious()`   | This returns the previous set of documents |


## Stream Feature Usage

**class:** `CollectionStreamService`

```ts
import {StreamService} from "fire-easy";

export class ClientsService extends StreamService<Client> {}

```
The `CollectionStreamService` extends `CollectionService`. This class has only one method `stream()` which make a realtime connection to the firestore collection.


## Document Feature Usage

**class:** `DocumentService`

```ts
import {DocumentService} from "fire-easy";

export class ClientService extends DocumentService<Client> {}

```
`DocumentService` is similar to `CollectionService` the only difference is `CollectionService` is for firestore collection and `DocumentService` is for a single firestore document.

