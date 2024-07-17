import {CountryCode} from "@/app/lib/definitions/countries";

interface WhatIsYourTaxResidenceProps {
    countries: { [key in CountryCode]: string };
    onSelect: (country: CountryCode) => void;
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
                                   onClick={() => props.onSelect(code)}/>
                            <label htmlFor={code}>{name}</label>
                        </div>
                    );
                })}
            </form>

        </div>
    );
}