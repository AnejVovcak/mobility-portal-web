import {CountryCode} from "@/app/lib/definitions/countries";
import {Tax} from "@/app/lib/definitions/tax";

interface WhatIsYourTaxResidenceProps {
    countries: { [code: CountryCode]: string };
    onSelect: (country?: Tax) => void;
}

export default function WhatIsYourTaxResidence(props: WhatIsYourTaxResidenceProps) {
    return (
        <div>
            <h2>Where is your tax residence?</h2>

            {/* Loop through the countries and use radio form */}
            <form>
                {Object.entries(props.countries).map((country: [CountryCode, string]) => {
                    const code = country[0]
                    const name = country[1];
                    return (
                        <div key={code}>
                            <input type="radio" id={code + 'EMPLNOW'} name="country" value={code}
                                   onClick={() => props.onSelect(undefined)}/>
                            <label htmlFor={code}>{name}</label>
                        </div>
                    );
                })}
            </form>

        </div>
    );
}