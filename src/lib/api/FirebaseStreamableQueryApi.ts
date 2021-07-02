import { Bindable } from "bindable-data";
import { IStreamableQueryApi, ApiResponse } from "yuni-chanz-react";
import FirebaseApi from "./FirebaseApi";
import { FBQueryDocumentSnapshot, FBQuery, FBQuerySnapshot } from "./FirebaseTypes";

export default abstract class FirebaseStreamableQueryApi<T = any> extends FirebaseApi<T[]> implements IStreamableQueryApi<T> {
    
    readonly streamedData = new Bindable<T[]>([]);

    private streamCanceller: (() => void) | null = null;

    
    startStream() {
        this.stopStream();

        this.streamCanceller = this.getQuery().onSnapshot((snapshot) => this.onSnapshot(snapshot));
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
            const response = await query.get();
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