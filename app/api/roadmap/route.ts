import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log(body);

        const client = await clientPromise;
        const db = client.db('lawBrainerDevelopment');

        const collection = db.collection('mig');
        
        const filter = {
            $and: [
                { secondment: { $in: body.secondment } },
                { out_value: { $in: body.outCountry } },
                { in_value: { $in: body.inCountry } },
                { out_title: { $in: body.outTitle } },
                { in_title: { $in: body.inTitle } },
                { time: { $in: body.time } },
            ]
        };

        const sort = {
            title: 1,
            date: 1
        };

        const data = await collection.find(filter).sort(sort).toArray();

        return new Response(JSON.stringify({ data }), {
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