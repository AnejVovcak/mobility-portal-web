import {useEffect, useState} from "react";
import Nationality, {NatMig} from "@/app/lib/definitions/nationality";

interface WhatIsYourNationalityProps {
    onNationalitySelect: (nationality:NatMig) => void;
}
export default function WhatIsYourNationality(props: WhatIsYourNationalityProps) {
    const [nationalities,setNationalities] = useState<Nationality[]>([]);
    const euCountries = ['AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE'];

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

    const onSelect = (countryCode: string) => {
        const eu = isEu(countryCode);
        console.log(`Country ${countryCode} is in EU: ${eu}`);

        if (eu) {
            props.onNationalitySelect(NatMig.EuCitizens);
            return;
        }

    }

    return (
        <div>
            <label htmlFor="nationality">Select Nationality:</label>
            <select id="nationality">
                <option value="">Select a country</option>
                {nationalities.map((nationality) => (
                    <option key={nationality.alpha_3_code} value={nationality.alpha_3_code}
                            onClick={()=>onSelect(nationality.alpha_3_code)}>
                        {nationality.nationality}
                    </option>
                ))}
            </select>

        </div>
    );
};