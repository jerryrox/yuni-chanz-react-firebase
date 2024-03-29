import FirebaseModelConverter from "../lib/data/FirebaseModelConverter";
import { Timestamp } from "firebase/firestore";

class TestConverter extends FirebaseModelConverter {

    toModel(data: any) {
        return data;
    }

    toPlain(model: any) {
        return model;
    }
}

test("Firebase data encode functions", () => {
    const converter = new TestConverter();

    const timestamp = converter.encodeDate(new Date(2020, 1, 0));
    expect(timestamp.toMillis()).toBe(new Date(2020, 1, 0).getTime());
});

test("Firebase data decode functions", () => {
    const converter = new TestConverter();

    const timestamp = Timestamp.fromDate(new Date(2020, 1, 0));
    expect(converter.decodeDate(timestamp)?.getTime()).toBe(new Date(2020, 1, 0).getTime());
});