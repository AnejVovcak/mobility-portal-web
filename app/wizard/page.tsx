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

export default function WizardPage() {

    const numOfQuestions = 7;
    const [index, setIndex] = useState(0);
    const [selectedOutCountry, setSelectedOutCountry] = useState<CountryCode | undefined>(undefined);
    const [selectedInCountry, setSelectedInCountry] = useState<CountryCode | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<MigTime | undefined>(undefined);
    const [empl, setEmpl] = useState<Empl | undefined>(undefined); // TODO add ALL_IMPL
    const [notSupported, setNotSupported] = useState<boolean | undefined>(undefined);


    const getInCounties = () => {
        //return the supported countries for the second question (remove the country selected in the first question)
        let countries = {...supportedCountries};
        delete countries[selectedOutCountry];
        return countries;
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
                                countries: getInCounties(),
                                onSelect: (country) => setSelectedInCountry(country)
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
                                countries: supportedCountries,
                                onSelect: (country) => {
                                    if (country === undefined ||
                                        (country!==selectedOutCountry && country!==selectedInCountry)) {
                                        setNotSupported(true);
                                        return;
                                    }
                                    if (country == selectedOutCountry && country == selectedInCountry) {
                                        setEmpl(Empl.EMPL0_EQ_EMPL1)
                                        return;
                                    } else if (country == selectedOutCountry || country == selectedInCountry) {
                                        setEmpl(Empl.EMPL0_NEQ_EMPL1)
                                        return;
                                    }
                                }
                            })
                        ) : i === 5 ? (
                            WhereAreYouGoingToBeEmployed({
                                countries: supportedCountries,
                                onSelect: (country) => console.log(country)
                            })
                        ) : i === 6 ? (
                            WhereAreYouInsured({
                                countries: supportedCountries,
                                onSelect: (country) => console.log(country)
                            })
                        ) : (
                            WhatIsYourTaxResidence({
                                countries: supportedCountries,
                                onSelect: (country) => console.log(country)
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