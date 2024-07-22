import {useEffect, useState} from "react";
import Nationality, {NatMig} from "@/app/lib/definitions/nationality";
import {CountryCode} from "@/app/lib/definitions/countries";
import { InTitleEnum } from "@/app/lib/definitions/InTitleEnum";
import { OutTitleEnum } from "@/app/lib/definitions/OutTitleEnum";
import { MigTime } from "@/app/lib/definitions/time";
import { SecondmentEnum } from "@/app/lib/definitions/SecondmentEnum";

interface WhatIsYourNationalityProps {
    inCountry: CountryCode;
    outCountry: CountryCode;
    time: MigTime;
    secondment: SecondmentEnum;
    countryName: string;
    onNationalitySelect: (nationality: NatMig) => void;
    onSubquestionSelect: (inTitle?: InTitleEnum, outTitle?: OutTitleEnum) => void;
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

    const onSelectSchengenVisa = () => {
        if (props.inCountry === (CountryCode.ROM || CountryCode.BEL || CountryCode.ITA || CountryCode.SLO) &&
            props.time === MigTime.LessThan90Days) {
            props.onSubquestionSelect(InTitleEnum.SchengenVisa, OutTitleEnum.SchengenVisa);
        } else if (props.inCountry === (CountryCode.ROM || CountryCode.BEL || CountryCode.ITA || CountryCode.SLO) &&
            props.time === MigTime.MoreThan90Days) {
            props.onSubquestionSelect(InTitleEnum.ResearcherPermit, OutTitleEnum.SchengenVisa);
        } else if (props.inCountry === CountryCode.POR &&
            props.time === MigTime.LessThan90Days) {
            props.onSubquestionSelect(InTitleEnum.SchengenVisa, OutTitleEnum.SchengenVisa);
        } else if (props.inCountry === CountryCode.POR &&
            props.time === MigTime.MoreThan90DaysLessThanAYear) {
            props.onSubquestionSelect(InTitleEnum.ResearcherPermit, OutTitleEnum.SchengenVisa);
        } else if (props.inCountry === CountryCode.POR &&
            props.time === MigTime.MoreThanAYear) {
            props.onSubquestionSelect(InTitleEnum.ResearcherPermitWithResidenceVisa, OutTitleEnum.SchengenVisa);
        } else if (props.inCountry === CountryCode.UK) {
            props.onSubquestionSelect(InTitleEnum.ResearcherPermit, OutTitleEnum.AllOutTitle);
        }
    }

    const onSelectResearcherPermit = () => {
        if (props.inCountry === (CountryCode.ROM || CountryCode.BEL || CountryCode.ITA || CountryCode.SLO)) {
            props.onSubquestionSelect(InTitleEnum.AllInTitle, OutTitleEnum.AllOutTitle);
        } else if (props.inCountry === CountryCode.POR) {
            props.onSubquestionSelect(InTitleEnum.ResearcherPermit, OutTitleEnum.ResearcherPermit);
        } else if (props.inCountry === CountryCode.UK) {
            props.onSubquestionSelect(InTitleEnum.AllInTitle, OutTitleEnum.AllOutTitle);
        }
    }

    const onSelectNoNeed = () => {
        if (props.inCountry === (CountryCode.ROM || CountryCode.BEL || CountryCode.ITA || CountryCode.SLO) &&
            props.time === MigTime.LessThan90Days) {
            props.onSubquestionSelect(InTitleEnum.SchengenVisa, OutTitleEnum.NoSchengenVisa);
        } else if (props.inCountry === (CountryCode.ROM || CountryCode.BEL || CountryCode.ITA || CountryCode.SLO) &&
            props.time === MigTime.MoreThan90Days) {
            props.onSubquestionSelect(InTitleEnum.ResearcherPermit, OutTitleEnum.NoSchengenVisa);
        } else if (props.inCountry === CountryCode.POR &&
            props.time === MigTime.LessThan90Days) {
            props.onSubquestionSelect(InTitleEnum.SchengenVisa, OutTitleEnum.NoSchengenVisa);
        } else if (props.inCountry === CountryCode.POR &&
            props.time === MigTime.MoreThan90DaysLessThanAYear) {
            props.onSubquestionSelect(InTitleEnum.ResearcherPermit, OutTitleEnum.NoSchengenVisa);
        } else if (props.inCountry === CountryCode.POR &&
            props.time === MigTime.MoreThanAYear) {
            props.onSubquestionSelect(InTitleEnum.ResearcherPermitWithResidenceVisa, OutTitleEnum.NoSchengenVisa);
        }
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
                               name="visa"
                               value="permanent"
                               onClick={() => props.onSubquestionSelect(undefined, undefined)}/>
                        <label>No, my residence in {props.countryName} is permanent</label>
                    </div>
                    <div>
                        <input type="radio"
                               name="visa"
                               value="schengen"
                               onClick={() => onSelectSchengenVisa()}/>
                        <label>Yes, based on my Schengen visa</label>
                    </div>
                    <div>
                        <input type="radio"
                               name="visa"
                               value="researcher"
                               onClick={() => onSelectResearcherPermit()}/>
                        <label>Yes, based on my researcher permit</label>
                    </div>
                    <div>
                        <input type="radio"
                               name="visa"
                               value="temporary"
                               onClick={() => props.onSubquestionSelect(undefined, undefined)}/>
                        <label>Yes, based on my temporary permit</label>
                    </div>
                    <div>
                        <input type="radio"
                               name="visa"
                               value="other"
                               onClick={() => props.onSubquestionSelect(undefined, undefined)}/>
                        <label>Yes, based on my other temporary permit</label>
                    </div>
                    <div>
                        <input type="radio"
                               name="visa"
                               value="none"
                               onClick={() => props.onSubquestionSelect(undefined, undefined)}/>
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
                               name="visa"
                               value="yes"
                               onClick={() => props.onSubquestionSelect(undefined, undefined)}/>
                        <label>Yes</label>
                    </div>
                    <div>
                        <input type="radio"
                               name="visa"
                               value="not_needed"
                               onClick={() => props.onSubquestionSelect(undefined, undefined)}/>
                        <label>No, but I don't need to obtain one</label>
                    </div>
                    <div>
                        <input type="radio"
                               name="visa"
                               value="no_need"
                               onClick={() => onSelectNoNeed()}/>
                        <label>No, but I need to get one</label>
                    </div>
                </div>
            }
        </div>

    );
};