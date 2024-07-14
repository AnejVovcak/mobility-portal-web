'use client';

import React from 'react';
import {useState} from 'react';
import CustomCard from '../ui/CustomCard';
import WhereAreYouFrom from '../ui/questions/WhereAreYouFrom';
import {CountryCode, supportedCountries} from "@/app/lib/definitions/countries";
import WhereAreYouGoing from "@/app/ui/questions/WhereAreYouGoing";
import HowLongAreYouStayingIn from "@/app/ui/questions/HowLongAreYouStayingIn";
import {MigTime} from "@/app/lib/definitions/time";
import WhatIsYourNationality from "@/app/ui/questions/WhatIsYourNationality";

export default function WizardPage() {

    const numOfQuestions = 4;
    const [index, setIndex] = useState(0);
    const [selectedOutCountry, setSelectedOutCountry] = useState<CountryCode | undefined>(undefined);
    const [selectedInCountry, setSelectedInCountry] = useState<CountryCode | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<MigTime | undefined>(undefined);


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
                        ) : (
                            WhatIsYourNationality({onNationalitySelect: (nationality: any) => console.log(nationality)})
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