'use client';

import React from 'react';
import {useState} from 'react';
import CustomCard from '../ui/CustomCard';
import WhereAreYouFrom from '../ui/questions/WhereAreYouFrom';
import {CountryCode, supportedCountries} from "@/app/lib/definitions/countries";
import WhereAreYouGoing from "@/app/ui/questions/WhereAreYouGoing";
import HowLongAreYouStayingIn from "@/app/ui/questions/HowLongAreYouStayingIn";

export default function WizardPage() {

    const numOfQuestions = 3;
    const [index, setIndex] = useState(0);
    const [selectedOutCountry, setSelectedOutCountry] = useState<CountryCode | undefined>(undefined);
    const [selectedInCountry, setSelectedInCountry] = useState<CountryCode | undefined>(undefined);

    //function for the next button
    const handleNext = () => {
        setIndex(index + 1);
    };

    //function for the back button
    const handleBack = () => {
        setIndex(index - 1);
    };

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
                            WhereAreYouGoing({countries: getInCounties(), onSelect: (country) => setSelectedInCountry(country)})
                        ) : HowLongAreYouStayingIn({
                            country: selectedInCountry!,
                            countryName: supportedCountries[selectedInCountry],
                            onSelect: (time) => void (0)
                        })
                    }
                    visible={index === i}
                    isFirst={i === 0}
                    isLast={i === numOfQuestions - 1}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            ))}
        </div>
    );
}