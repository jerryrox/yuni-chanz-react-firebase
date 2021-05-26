import { Bindable } from "bindable-bloc";
import { IStreamableQueryApi } from "yuni-chanz-react";
import FirebaseApi from "./FirebaseApi";
import { FBQueryDocumentSnapshot, FBQuery, FBQuerySnapshot } from "./FirebaseTypes";

export default abstract class FirebaseStreamableQueryApi<T = any> extends FirebaseApi<T[]> implements IStreamableQueryApi<T> {
    
    readonly streamedData = new Bindable<T[]>([]);

    private streamCanceller: (() => void) | null = null;

    
    startStream() {
        this.stopStream();

        this.getQuery().onSnapshot((snapshot) => this.onSnapshot(snapshot));
    }

    stopStream() {
        if(this.streamCanceller !== null) {
            this.streamCanceller();
            this.streamCanceller = null;
        }
    }

    /**
     * Returns the query used for streaming.
     */
    protected abstract getQuery(): FBQuery;

    /**
     * Parses the specified document snapshot into model T.
     */
    protected abstract parseData(snapshot: FBQueryDocumentSnapshot): T;

    /**
     * Event called when the new stream of data has been received.
     */
    private onSnapshot(querySnapshot: FBQuerySnapshot) {
        this.streamedData.value = querySnapshot.docs.map((doc) => {
            return this.parseData(doc);
        });
    }
}