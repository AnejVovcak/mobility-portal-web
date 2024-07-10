import clientPromise from "@/app/lib/mongodb";
import {User} from "@/app/lib/definitions";

export async function fetchRoadmap():Promise<User[]> {
    try {
        const client = await clientPromise;
        const db = client.db('test');

        const collection = db.collection('users');
        return <User[]>collection.find({}).toArray();
    } catch (e) {
        console.error(e);
    }
}