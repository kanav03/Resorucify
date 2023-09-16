import { Db, MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI || "";
let db: Db;

async function initializeClient(): Promise<Db> {
    const client = await MongoClient.connect(uri);

    return client.db();
}

export default async (): Promise<Db> => {
    if (!db) {
        db = await initializeClient();
    }
    return db;
};
