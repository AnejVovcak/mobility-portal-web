import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log(body);

        const client = await clientPromise;
        const db = client.db('lawBrainerProduction');
        const collection = db.collection('socSecDev');

        const filter = {
            $and: [
                body.outCountry.length > 0 ? { out_value: { $in: body.outCountry } } : {},
                body.inCountry.length > 0 ? { in_value: { $in: body.inCountry } } : {},
                body.empl.length > 0 ? { empl: { $in: body.empl } } : {},
                body.if_empl0_eq_empl1.length > 0 ? { if_empl0_eq_empl1: { $in: body.if_empl0_eq_empl1 } } : {},
            ].filter(condition => Object.keys(condition).length > 0) // Remove empty objects
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