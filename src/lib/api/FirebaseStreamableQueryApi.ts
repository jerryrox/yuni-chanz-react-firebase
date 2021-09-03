import { Bindable } from "bindable-data";
import { Query, QueryDocumentSnapshot, QuerySnapshot, onSnapshot, getDocs } from "firebase/firestore";
import { IStreamableQueryApi, ApiResponse } from "yuni-chanz-react";
import FirebaseApi from "./FirebaseApi";

export default abstract class FirebaseStreamableQueryApi<T = any> extends FirebaseApi<T[]> implements IStreamableQueryApi<T> {
    
    readonly streamedData = new Bindable<T[]>([]);

    private streamCanceller: (() => void) | null = null;

    
    startStream() {
        this.stopStream();

        this.streamCanceller = onSnapshot(this.getQuery(), (snapshot) => this.onSnapshot(snapshot));
    }

    stopStream() {
        if(this.streamCanceller !== null) {
            this.streamCanceller();
            this.streamCanceller = null;
        }
    }

    async request(): Promise<ApiResponse<T[]>> {
        try {
            const query = this.getQuery();
            const response = await getDocs(query);
            const data = response.docs.map((doc) => this.parseData(doc));
            return ApiResponse.success(data);
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
    protected abstract getQuery(): Query;

    /**
     * Parses the specified document snapshot into model T.
     */
    protected abstract parseData(snapshot: QueryDocumentSnapshot): T;

    /**
     * Event called when the new stream of data has been received.
     */
    private onSnapshot(querySnapshot: QuerySnapshot) {
        this.streamedData.value = querySnapshot.docs.map((doc) => {
            return this.parseData(doc);
        });
    }
}