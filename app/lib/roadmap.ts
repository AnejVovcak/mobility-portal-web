import clientPromise from "@/app/lib/mongodb";
import {User} from "@/app/lib/definitions";
import { escape } from "querystring";
import { CountryCode } from "./definitions/countries";
import { SecondmentEnum } from "./definitions/SecondmentEnum";
import { MigTime } from "./definitions/time";
import { OutTitleEnum } from "./definitions/OutTitleEnum";
import { InTitleEnum } from "./definitions/InTitleEnum";
import { NatMig } from '../lib/definitions/nationality';

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

export async function getRoadmapData(
    secondment: SecondmentEnum,
    outCountry: CountryCode,
    inCountry: CountryCode,
    outTitle: OutTitleEnum,
    inTitle: InTitleEnum,
    time: MigTime,
    nat: NatMig[]
):Promise<any> {
    try {
        const client = await clientPromise;
        const db = client.db('lawBrainerDevelopment');

        const collection = db.collection('mig');
        
        const filter = {
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

        const data = await collection.find(filter).sort(sort).toArray();
        return data;
    } catch (e) {
        console.error(e);
    }
}