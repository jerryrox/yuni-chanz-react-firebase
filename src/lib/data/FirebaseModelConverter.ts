import { FBTimestamp } from "../api/FirebaseTypes";
import firebase from "firebase";
import { ModelConverter } from "yuni-chanz-react";

export default abstract class FirebaseModelConverter<T = any> extends ModelConverter<T> {
    
    /**
     * Encodes the specified Date instance into a Firestore date representation.
     */
    encodeDate(value: Date): FBTimestamp {
        return firebase.firestore.Timestamp.fromDate(value);
    }

    decodeDate(value: any): Date | null {
        if(value instanceof firebase.firestore.Timestamp) {
            return value.toDate();
        }
        return super.decodeDate(value);
    }
}