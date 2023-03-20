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
