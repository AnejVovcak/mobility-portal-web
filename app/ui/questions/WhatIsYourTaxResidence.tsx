import {CountryCode} from "@/app/lib/definitions/countries";
import {Tax} from "@/app/lib/definitions/tax";

interface WhatIsYourTaxResidenceProps {
    inCountry: CountryCode;
    outCountry: CountryCode;
    countries: { [code: CountryCode]: string };
    onSelect: (taxResidencyArr?: Tax[]) => void;
}

export default function WhatIsYourTaxResidence(props: WhatIsYourTaxResidenceProps) {

    const onTaxSelect = (taxResidency: CountryCode) => {

        if(taxResidency == CountryCode.OTHER){
            props.onSelect(undefined);
            return;
        }

        let taxResidencyArr: Tax[] = [];
        if(taxResidency != CountryCode.BEL && (props.inCountry == CountryCode.BEL || props.outCountry == CountryCode.BEL)){
            taxResidencyArr.push(Tax.NonBelgium);
        }
        if(taxResidency != CountryCode.POR && (props.inCountry == CountryCode.POR || props.outCountry == CountryCode.POR)){
            taxResidencyArr.push(Tax.NonPortugal);
        }
        if(taxResidency != CountryCode.ROM && (props.inCountry == CountryCode.ROM || props.outCountry == CountryCode.ROM)){
            taxResidencyArr.push(Tax.NonRomania);
        }
        if(taxResidency != CountryCode.SLO && (props.inCountry == CountryCode.SLO || props.outCountry == CountryCode.SLO)){
            taxResidencyArr.push(Tax.NonSlovenia);
        }
        if(taxResidency != CountryCode.UK && (props.inCountry == CountryCode.UK || props.outCountry == CountryCode.UK)){
            taxResidencyArr.push(Tax.NonUnitedKingdom);
        }
        if(taxResidency != CountryCode.OTHER){
            taxResidencyArr.push(taxResidency as Tax);
        }
        taxResidencyArr.push(Tax.AllTax);
        props.onSelect(taxResidencyArr);
    }

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
                            <input type="radio" id={code + 'TAX'} name="country" value={code}
                                   onClick={() => onTaxSelect(code)}/>
                            <label htmlFor={code}>{name}</label>
                        </div>
                    );
                })}
            </form>

        </div>
    );
}