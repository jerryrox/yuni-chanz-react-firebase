import FirebaseApi from "./FirebaseApi";
import { Bindable } from "bindable-bloc";
import { FBDocumentSnapshot, FBDocumentReference } from "./FirebaseTypes";
import { IStreamableDataApi } from "yuni-chanz-react";

export default abstract class FirebaseStreamableDataApi<T> extends FirebaseApi<T | null> implements IStreamableDataApi<T> {
    
    readonly streamedData = new Bindable<T | null>(null);

    private streamCanceller: (() => void) | null = null;

    
    async request(): Promise<T | null> {
        const ref = this.getReference();
        const response = await ref.get();
        
        if(response.exists) {
            return this.parseData(response as FBDocumentSnapshot);
        }
        return null;
    }

    startStream() {
        this.stopStream();

        this.getReference().onSnapshot((snapshot) => this.onSnapshot(snapshot));
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
    protected abstract getReference(): FBDocumentReference;

    /**
     * Parses the specified document snapshot into model T.
     */
    protected abstract parseData(snapshot: FBDocumentSnapshot): T;

    /**
     * Event called when the new stream of data has been received.
     */
    private onSnapshot(snapshot: FBDocumentSnapshot) {
        this.streamedData.value = snapshot.exists ? this.parseData(snapshot) : null;
    }
}