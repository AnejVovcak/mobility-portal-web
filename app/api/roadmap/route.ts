import clientPromise from "@/app/lib/mongodb";

export async function GET(
    req: Request,
    res: Response,
){
    //const { secondment, outCountry, inCountry, outTitle, inTitle, time, nat } = req.query;

    try {
        const client = await clientPromise;
        const db = client.db('lawBrainerDevelopment');

        const collection = db.collection('mig');
        
        /* const filter = {
            $and: [
                { secondment: secondment },
                { outCountry: outCountry },
                { inCountry: inCountry },
                { outTitle: outTitle },
                { inTitle: inTitle },
                { time: time },
                { nat: { $in: nat } }
            ]
        };

        const sort = {
            title: 1,
            date: 1
        };

        const data = await collection.find(filter).sort(sort).toArray(); */

        //get all data
        const data = await collection.find({}).toArray();

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