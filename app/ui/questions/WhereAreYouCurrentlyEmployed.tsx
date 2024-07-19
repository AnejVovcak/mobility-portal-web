import {CountryCode} from "@/app/lib/definitions/countries";

interface WhereAreYouCurrentlyEmployedProps {
    outCountry: CountryCode;
    inCountry: CountryCode;
    countries: { [key in CountryCode]: string };
    onSelect: (country?: CountryCode) => void;
}

export default function WhereAreYouCurrentlyEmployed(props: WhereAreYouCurrentlyEmployedProps) {
    const handleSelect = (country: CountryCode) => {
        if (country === CountryCode.OTHER || (country !== props.outCountry && country !== props.inCountry)) {
            props.onSelect(undefined);
        } else {
            props.onSelect(country);
        }
    }

    return (
        <div>
            <h2>Where are you currently employed?</h2>

            {/* Loop through the countries and use radio form */}
            <form>
                {Object.entries(props.countries).map((country: [CountryCode, string]) => {
                    const code = country[0]
                    const name = country[1];
                    return (
                        <div key={code}>
                            <input type="radio" id={code + 'EMPLNOW'} name="country" value={code}
                                   onClick={() => handleSelect(code)}/>
                            <label htmlFor={code}>{name}</label>
                        </div>
                    );
                })}
                <div>
                    <input type="radio" id={'not' + 'EMPLNOW'} name="country" value={'not'}
                           onClick={() => props.onSelect(undefined)}/>
                    <label htmlFor={'not'}>I am not employed</label>
                </div>
            </form>

        </div>
    );
}