import {CountryCode} from "@/app/lib/definitions/countries";
import {useState} from "react";
import {Empl0EQEmpl1Enum} from "@/app/lib/definitions/Empl0EQEmpl1Enum";
import { Empl } from "@/app/lib/definitions/empl";

interface WhereAreYouGoingToBeEmployedProps {
    outCountry: CountryCode;
    inCountry: CountryCode;
    currentlyEmployed: CountryCode | undefined;
    countries: { [key in CountryCode]: string };
    onSelectEmpl: (empl?: Empl) => void;
    onSelectTripType: (tripType: Empl0EQEmpl1Enum) => void;
}

export default function WhereAreYouGoingToBeEmployed(props: WhereAreYouGoingToBeEmployedProps) {
    const [goingToBeEmployed, setGoingToBeEmployed] = useState<CountryCode | undefined>(undefined);

    const handleSelect = (country: CountryCode) => {
        if (props.currentlyEmployed === props.outCountry && country === props.currentlyEmployed) {
            props.onSelectEmpl(Empl.EMPL0_EQ_EMPL1);
        }
        else if (props.currentlyEmployed === props.outCountry && country === props.inCountry) {
            props.onSelectEmpl(Empl.EMPL0_NEQ_EMPL1);
            props.onSelectTripType(Empl0EQEmpl1Enum.ALL_EMPL0_NEQ_EMPL1);
        }
        else {
            props.onSelectEmpl(undefined);
        }

        setGoingToBeEmployed(country);
    }

    return (
        <div>
            <h2>Where are you going to be employed?</h2>

            {/* Loop through the countries and use radio form */}
            <form>
                <div>
                    {Object.entries(props.countries).map((country: [CountryCode, string]) => {
                        const code = country[0]
                        const name = country[1];
                        return (
                            <div key={code}>
                                <input type="radio" id={code + 'EMPLFUTURE'} name="country" value={code}
                                       onClick={() => handleSelect(code)}/>
                                <label htmlFor={code}>{name}</label>
                            </div>
                        );
                    })}
                    <div>
                        <input type="radio" id={'not' + 'EMPLFUTURE'} name="country" value={'not'}
                               onClick={() => props.onSelectEmpl(undefined)}/>
                        <label htmlFor={'not'}>I am not employed</label>
                    </div>
                </div>
                {props.currentlyEmployed && props.currentlyEmployed == props.outCountry &&
                    goingToBeEmployed && goingToBeEmployed == props.outCountry &&
                    <div>
                        <h2> I am going to be ...</h2>
                        <div>
                            <input type="radio" id={'same' + 'EMPLFUTURE'} name="travel"
                                   onClick={() => props.onSelectTripType(Empl0EQEmpl1Enum.BUSINESS_TRIP)}/>
                            <label htmlFor={'same'}>sent on a business trip</label>
                        </div>
                        <div>
                            <input type="radio" id={'diff' + 'EMPLFUTURE'} name="travel"
                                   onClick={() => props.onSelectTripType(Empl0EQEmpl1Enum.POSTED_WORKER)}/>
                            <label htmlFor={'diff'}>posted abroad</label>
                        </div>
                    </div>
                }
            </form>

        </div>
    );
}