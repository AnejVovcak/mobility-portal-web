import {useEffect, useState} from "react";
import Nationality, {NatMig} from "@/app/lib/definitions/nationality";
import {CountryCode} from "@/app/lib/definitions/countries";

interface WhatIsYourNationalityProps {
    inCountry: CountryCode;
    outCountry: CountryCode;
    countryName: string;
    onNationalitySelect: (nationality: NatMig) => void;
}

export default function WhatIsYourNationality(props: WhatIsYourNationalityProps) {
    const [nationalities, setNationalities] = useState<Nationality[]>([]);
    const euCountries = ['AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD', 'POL', 'POR', 'ROM', 'SVK', 'SLO', 'ESP', 'SWE']
    const [selectedNationality, setSelectedNationality] = useState<string | undefined>(undefined);
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('api/nationalities');
                const data = await response.json();
                setNationalities(data['nationalities']);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const isEu = (countryCode: string) => {
        return euCountries.includes(countryCode);
    }

    const isEEA = (countryCode: string) => {
        return countryCode === 'ISL' || countryCode === 'LIE' || countryCode === 'NOR' || countryCode === 'SWZ';
    }

    const onSelectNationality = (countryCode: string) => {
        const eu = isEu(countryCode);
        setSelectedNationality(countryCode);
        console.log(`Country ${countryCode} is in EU: ${eu}`);
        console.log(`Country ${props.outCountry} is in EU: ${isEu(props.outCountry)}`);
        console.log(`Country ${props.inCountry}`);

        if (eu) {
            props.onNationalitySelect(NatMig.EuCitizens);
            return;
        }
    }

    const onSelect = (e: string) => {
        console.log(e);
    }

    return (
        <div>
            <div>
                <label htmlFor="nationality">Select Nationality:</label>
                <select id="nationality" onChange={(e) => onSelectNationality(e.target.value)}>
                    <option value="">Select a country</option>
                    {nationalities.map((nationality) => (
                        <option key={nationality.alpha_3_code} value={nationality.alpha_3_code}>
                            {nationality.nationality}
                        </option>
                    ))}
                </select>
            </div>
            {selectedNationality &&
                !isEu(selectedNationality) &&
                !isEEA(selectedNationality) &&
                !(isEu(props.outCountry) &&
                (props.inCountry === CountryCode.UK || props.inCountry === CountryCode.OTHER)) &&
                <div>
                    <h2>Are you staying in {props.countryName} temporarily?</h2>
                    <div>
                        <input type="radio"
                               value="permanent"
                               onClick={() => onSelect('permanent')}/>
                        <label>No, my residence in {props.countryName} is permanent</label>
                    </div>
                    <div>
                        <input type="radio"
                               value="schengen"
                               onClick={() => onSelect('schengen')}/>
                        <label>Yes, based on my Schengen visa</label>
                    </div>
                    <div>
                        <input type="radio"
                               value="researcher"
                               onClick={() => onSelect('researcher')}/>
                        <label>Yes, based on my researcher permit</label>
                    </div>
                    <div>
                        <input type="radio"
                               value="temporary"
                               onClick={() => onSelect('temporary')}/>
                        <label>Yes, based on my temporary permit</label>
                    </div>
                    <div>
                        <input type="radio"
                               value="other"
                               onClick={() => onSelect('other')}/>
                        <label>Yes, based on my other temporary permit</label>
                    </div>
                    <div>
                        <input type="radio"
                               value="none"
                               onClick={() => onSelect('none')}/>
                        <label>Yes, but I do not need to obtain any visa or permit</label>
                    </div>
                </div>

            }
            {selectedNationality &&
                !isEu(selectedNationality) &&
                !isEEA(selectedNationality) &&
                (isEu(props.outCountry) &&
                (props.inCountry === CountryCode.UK || props.inCountry === CountryCode.OTHER)) &&
                <div>
                    <label>Do you already have a visa to enter in {props.countryName}?</label>
                    <div>
                        <input type="radio"
                               value="yes"
                               onClick={() => onSelect('yes')}/>
                        <label>Yes</label>
                    </div>
                    <div>
                        <input type="radio"
                               value="not_needed"
                               onClick={() => onSelect('not_needed')}/>
                        <label>No, but I don't need to obtain one</label>
                    </div>
                    <div>
                        <input type="radio"
                               value="no_need"
                               onClick={() => onSelect('no_need')}/>
                        <label>No, but I need to get one</label>
                    </div>
                </div>
            }
        </div>

    );
};