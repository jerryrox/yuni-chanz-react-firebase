import { Timestamp } from "firebase/firestore";
import { ModelConverter } from "yuni-chanz-react";

export default abstract class FirebaseModelConverter<T = any> extends ModelConverter<T> {
    
    /**
     * Encodes the specified Date instance into a Firestore date representation.
     */
    encodeDate(value: Date): Timestamp {
        return Timestamp.fromDate(value);
    }

    decodeDate(value: any): Date | null {
        if(value instanceof Timestamp) {
            return value.toDate();
        }
        return super.decodeDate(value);
    }
}