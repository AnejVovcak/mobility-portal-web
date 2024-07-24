import nationalities from './nationalities.json';

export async function GET() {
    try {
        return new Response(JSON.stringify({nationalities}), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({message: 'Internal Server Error'}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}