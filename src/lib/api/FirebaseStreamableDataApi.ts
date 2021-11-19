import FirebaseApi from "./FirebaseApi";
import { Bindable } from "bindable-data";
import { IStreamableDataApi, ApiResponse } from "yuni-chanz-react";
import { DocumentReference, DocumentSnapshot, getDoc, onSnapshot } from "firebase/firestore";

export default abstract class FirebaseStreamableDataApi<T> extends FirebaseApi<T> implements IStreamableDataApi<T> {
    
    readonly streamedData = new Bindable<T | null>(null);

    private streamCanceller: (() => void) | null = null;


    startStream() {
        this.stopStream();

        this.streamCanceller = onSnapshot(this.getReference(), (snapshot) => this.onSnapshot(snapshot));
    }

    stopStream() {
        if(this.streamCanceller !== null) {
            this.streamCanceller();
            this.streamCanceller = null;
        }
    }

    async request(): Promise<ApiResponse<T>> {
        try {
            const ref = this.getReference();
            const response = await getDoc(ref);
            return ApiResponse.success(this.parseData(response));
        }
        catch(e: any) {
            return ApiResponse.failed(e, this.getRequestErrorMessage());
        }
    }

    /**
     * Returns the error message for the default request implementation.
     */
    protected getRequestErrorMessage() {
        return "Error while requesting data.";
    }

    /**
     * Returns the query used for streaming.
     */
    protected abstract getReference(): DocumentReference;

    /**
     * Parses the specified document snapshot into model T.
     */
    protected abstract parseData(snapshot: DocumentSnapshot): T;

    /**
     * Event called when the new stream of data has been received.
     */
    private onSnapshot(snapshot: DocumentSnapshot) {
        this.streamedData.value = snapshot.exists() ? this.parseData(snapshot) : null;
    }
}