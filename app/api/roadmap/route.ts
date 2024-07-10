import clientPromise from "@/app/lib/mongodb";

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db('test');

        const collection = db.collection('users');
        const users = await collection.find({}).toArray();

        return new Response(JSON.stringify({ users }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
