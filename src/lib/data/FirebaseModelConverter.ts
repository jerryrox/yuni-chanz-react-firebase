import { Timestamp } from "firebase/firestore";
import { ModelConverter } from "yuni-chanz-react";

export default abstract class FirebaseModelConverter<T = any> extends ModelConverter<T> {
    
    /**
     * Adjusts certain functions' conversion data to be compatible with firebase function argument limitations.
     */
    adjustForFunctions() {
        this.encodeDate = (value) => {
            return value.toISOString();
        };
    }

    /**
     * Encodes the specified Date instance into a Firestore date representation.
     */
    encodeDate(value: Date): any {
        return Timestamp.fromDate(value);
    }

    decodeDate(value: any): Date | null {
        if(value instanceof Timestamp) {
            return value.toDate();
        }
        return super.decodeDate(value);
    }
}