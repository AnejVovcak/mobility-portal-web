'use client';

import React, {useState} from 'react';
import CustomCard from '../ui/CustomCard';
import WhereAreYouFrom from '../ui/questions/WhereAreYouFrom';
import {CountryCode, supportedCountries} from "@/app/lib/definitions/countries";
import WhereAreYouGoing from "@/app/ui/questions/WhereAreYouGoing";
import HowLongAreYouStayingIn from "@/app/ui/questions/HowLongAreYouStayingIn";
import {MigTime} from "@/app/lib/definitions/time";
import WhatIsYourNationality from "@/app/ui/questions/WhatIsYourNationality";
import WhereAreYouCurrentlyEmployed from "@/app/ui/questions/WhereAreYouCurrentlyEmployed";
import WhereAreYouGoingToBeEmployed from "@/app/ui/questions/WhereAreYouGoingToBeEmployed";
import WhereAreYouInsured from "@/app/ui/questions/WhereAreYouInsured";
import WhatIsYourTaxResidence from "@/app/ui/questions/WhatIsYourTaxResidence";
import {Empl} from "@/app/lib/definitions/empl";
import {Empl0EQEmpl1Enum} from "@/app/lib/definitions/Empl0EQEmpl1Enum";
import {Tax} from "@/app/lib/definitions/tax";
import {SecondmentEnum} from "@/app/lib/definitions/SecondmentEnum";

export default function WizardPage() {

    const numOfQuestions = 8;
    const [index, setIndex] = useState(0);
    const [selectedOutCountry, setSelectedOutCountry] = useState<CountryCode | undefined>(undefined);
    const [selectedInCountry, setSelectedInCountry] = useState<CountryCode | undefined>(undefined);
    const [secondment, setSecondment] = useState<SecondmentEnum | undefined>(SecondmentEnum.NO_SECONDMENT);
    const [selectedTime, setSelectedTime] = useState<MigTime | undefined>(undefined);
    const [currentlyEmployed, setCurrentlyEmployed] = useState<CountryCode | undefined>(undefined);
    const [empl, setEmpl] = useState<Empl | undefined>(undefined); // TODO add ALL_IMPL
    const [empl0EQEmpl1Enum, setEmpl0EQEmpl1Enum] = useState<Empl0EQEmpl1Enum | undefined>(undefined);
    const [insured, setInsured] = useState<CountryCode | undefined>(undefined);
    const [taxResidencyArr, setTaxResidenceArr] = useState<Tax[] | undefined>(undefined);


    const getInCountiesOptions = () => {
        //return the supported countries for the second question (remove the country selected in the first question)
        let countries = {...supportedCountries};
        delete countries[selectedOutCountry];
        return countries;
    }

    const getTaxResidenceOptions = () => {
        return {
            [selectedOutCountry!]: supportedCountries[selectedOutCountry!],
            [selectedInCountry!]: supportedCountries[selectedInCountry!]
        }
    }

    return (
        <div>
            {Array.from({length: numOfQuestions}, (_, i) => (
                <CustomCard
                    key={i}
                    childComponent={
                        i === 0 ? (
                            WhereAreYouFrom({
                                countries: supportedCountries,
                                onSelect: (country) => setSelectedOutCountry(country)
                            })
                        ) : i === 1 ? (
                            WhereAreYouGoing({
                                countries: getInCountiesOptions(),
                                onSelect: (country) => setSelectedInCountry(country),
                                onSelectSecondment: (secondment) => setSecondment(secondment)
                            })
                        ) : i === 2 ? (
                            HowLongAreYouStayingIn({
                                country: selectedInCountry!,
                                countryName: supportedCountries[selectedInCountry],
                                onSelect: (time) => setSelectedTime(time)
                            })
                        ) : i === 3 ? (
                            WhatIsYourNationality({
                                onNationalitySelect: (nationality: any) => console.log(nationality),
                                countryName: supportedCountries[selectedInCountry],
                                inCountry: selectedInCountry!,
                                outCountry: selectedOutCountry!
                            })
                        ) : i === 4 ? (
                            WhereAreYouCurrentlyEmployed({
                                outCountry: selectedOutCountry!,
                                inCountry: selectedInCountry!,
                                countries: supportedCountries,
                                onSelect: (country) => {
                                    setCurrentlyEmployed(country)
                                }
                            })
                        ) : i === 5 ? (
                            WhereAreYouGoingToBeEmployed({
                                countries: supportedCountries,
                                outCountry: selectedOutCountry!,
                                inCountry: selectedInCountry!,
                                currentlyEmployed: currentlyEmployed,
                                onSelectEmpl:
                                    (empl0EQEmpl1Enum) => setEmpl(empl0EQEmpl1Enum),
                                onSelectTripType:
                                    (empl) => setEmpl0EQEmpl1Enum(empl)
                            })
                        ) : i === 6 ? (
                            WhereAreYouInsured({
                                countries: supportedCountries,
                                onSelect: (country) => setInsured(country)
                            })
                        ) : (
                            WhatIsYourTaxResidence({
                                inCountry: selectedInCountry!,
                                outCountry: selectedOutCountry!,
                                countries: getTaxResidenceOptions(),
                                onSelect: (taxResidencyArr?: Tax[]) => setTaxResidenceArr(taxResidencyArr)
                            })
                        )
                    }
                    visible={index === i}
                    isFirst={i === 0}
                    isLast={i === numOfQuestions - 1}
                    onNext={() => setIndex(index + 1)}
                    onBack={() => setIndex(index - 1)}
                />
            ))}
        </div>
    );
}