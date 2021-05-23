import firebase from "firebase";
import { IApi } from "yuni-chanz-react";

export default abstract class FirebaseApi<T = any> implements IApi<T> {
    
    readonly firestore = firebase.firestore();

    readonly storage = firebase.storage();

    readonly functions = firebase.functions();

    readonly auth = firebase.auth();

    readonly messaging = firebase.messaging();

    readonly analytics = firebase.analytics();


    abstract request(): Promise<T>;
}