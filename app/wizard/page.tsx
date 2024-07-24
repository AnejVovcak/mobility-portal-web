'use client';

import React, {useState} from 'react';
import QuestionCard from '../ui/QuestionCard';
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
import {InTitleEnum} from '../lib/definitions/InTitleEnum';
import {OutTitleEnum} from '../lib/definitions/OutTitleEnum';
import {isEu} from '../lib/utils/isEu';
import {NatMig} from "@/app/lib/definitions/nationality";

export default function WizardPage() {
    const numOfQuestions = 8;
    const [index, setIndex] = useState(0);
    const [selectedOutCountry, setSelectedOutCountry] = useState<CountryCode | undefined>(undefined);
    const [selectedInCountry, setSelectedInCountry] = useState<CountryCode | undefined>(undefined);
    const [secondment, setSecondment] = useState<SecondmentEnum>(SecondmentEnum.NO_SECONDMENT);
    const [selectedTime, setSelectedTime] = useState<MigTime | undefined>(undefined);
    const [nat, setNat] = useState<String | undefined>(undefined);
    const [inTitle, setInTitle] = useState<InTitleEnum | undefined>(undefined);
    const [outTitle, setOutTitle] = useState<OutTitleEnum | undefined>(undefined);
    const [currentlyEmployed, setCurrentlyEmployed] = useState<CountryCode | undefined>(undefined);
    const [empl, setEmpl] = useState<Empl | undefined>(undefined);
    const [empl0EQEmpl1Enum, setEmpl0EQEmpl1Enum] = useState<Empl0EQEmpl1Enum | undefined>(undefined);
    const [insured, setInsured] = useState<CountryCode | undefined>(undefined);
    const [taxResidencyArr, setTaxResidenceArr] = useState<Tax[] | undefined>(undefined);
    const [showAnswers, setShowAnswers] = useState(false);
    const [content, setContent] = useState<any>(null);

    const getInCountiesOptions = () => {
        let countries = { ...supportedCountries };
        delete countries[selectedOutCountry!];
        return countries;
    };

    const getTaxResidenceOptions = () => {
        return {
            [selectedOutCountry!]: supportedCountries[selectedOutCountry!],
            [selectedInCountry!]: supportedCountries[selectedInCountry!]
        };
    };

    const generateMigBody = () => {
        let secondmentArr = [secondment, 'ALL SECONDMENT'];
        let outCountryArr = [selectedOutCountry, 'ALL COUNTRIES'];
        if (isEu(selectedOutCountry!))
            outCountryArr.push('ALL EU');
        let inCountryArr = [selectedInCountry, 'ALL COUNTRIES'];
        if (isEu(selectedInCountry!))
            inCountryArr.push('ALL EU');
        let outTitleArr = outTitle ? [outTitle] :undefined;
        let inTitleArr = inTitle ? [inTitle] :undefined
        let timeArr = [selectedTime, 'ALL DURATIONS'];
        let natArr:NatMig[] = [NatMig.AllNationalities];
        if (isEu(nat!)){
            natArr.push(NatMig.EuCitizens)
        } else {
            natArr.push(NatMig.NonEuCitizens)
            if(outTitleArr?.includes(OutTitleEnum.ResearcherPermit)){
                natArr.push(NatMig.NonEuCitizenWithResearcherPermit)
            } else {
                natArr.push(NatMig.NonEuCitizensWithoutResearcherPermit)

                if (outTitleArr?.includes(OutTitleEnum.SchengenVisa)){
                    natArr.push(NatMig.NonEuCitizenWithoutResearcherPermitButWithSchengenVisa)
                }
            }
        }

        if(nat === 'BEL'){
            natArr.push(NatMig.Belgians)
        } else {
            natArr.push(NatMig.NonBelgians)
        }

        return {
            secondment: secondmentArr,
            outCountry: outCountryArr,
            inCountry: inCountryArr,
            outTitle: outTitleArr,
            inTitle: inTitleArr,
            time: timeArr,
            nationality: natArr,
        };
    };

    const renderQuestion = (i: number) => {
        switch (i) {
            case 0:
                return (
                    <WhereAreYouFrom
                        countries={supportedCountries}
                        onSelect={(country) => setSelectedOutCountry(country)}
                    />
                );
            case 1:
                return (
                    <WhereAreYouGoing
                        countries={getInCountiesOptions()}
                        onSelect={(country) => setSelectedInCountry(country)}
                        onSelectSecondment={(secondment) => setSecondment(secondment)}
                    />
                );
            case 2:
                return (
                    <HowLongAreYouStayingIn
                        country={selectedInCountry!}
                        countryName={supportedCountries[selectedInCountry!]}
                        onSelect={(time) => setSelectedTime(time)}
                    />
                );
            case 3:
                return (
                    <WhatIsYourNationality
                        onNationalitySelect={(nationality: any) => setNat(nationality)}
                        onSubquestionSelect={(inTitle: any, outTitle: any) => {
                            setInTitle(inTitle);
                            setOutTitle(outTitle);
                            console.log(inTitle, outTitle);
                        }}
                        countryName={supportedCountries[selectedInCountry!]}
                        inCountry={selectedInCountry!}
                        outCountry={selectedOutCountry!}
                        time={selectedTime!}
                        secondment={secondment!}
                    />
                );
            case 4:
                return (
                    <WhereAreYouCurrentlyEmployed
                        outCountry={selectedOutCountry!}
                        inCountry={selectedInCountry!}
                        countries={supportedCountries}
                        onSelect={(country) => setCurrentlyEmployed(country)}
                    />
                );
            case 5:
                return (
                    <WhereAreYouGoingToBeEmployed
                        countries={supportedCountries}
                        outCountry={selectedOutCountry!}
                        inCountry={selectedInCountry!}
                        currentlyEmployed={currentlyEmployed}
                        onSelectEmpl={(empl) => setEmpl(empl)}
                        onSelectTripType={(empl0EQEmpl1Enum) => setEmpl0EQEmpl1Enum(empl0EQEmpl1Enum)}
                    />
                );
            case 6:
                return (
                    <WhereAreYouInsured
                        countries={supportedCountries}
                        onSelect={(country) => setInsured(country)}
                    />
                );
            case 7:
                return (
                    <WhatIsYourTaxResidence
                        inCountry={selectedInCountry!}
                        outCountry={selectedOutCountry!}
                        countries={getTaxResidenceOptions()}
                        onSelect={(taxResidencyArr?: Tax[]) => setTaxResidenceArr(taxResidencyArr)}
                    />
                );
            default:
                return null;
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`/api/roadmap/mig`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(generateMigBody()),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log(data);
            setShowAnswers(true);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            {!showAnswers && (
                Array.from({ length: numOfQuestions }, (_, i) => (
                    <QuestionCard
                        key={i}
                        childComponent={renderQuestion(i)}
                        visible={index === i}
                        isFirst={i === 0}
                        isLast={i === numOfQuestions - 1}
                        onNext={() => setIndex(index + 1)}
                        onBack={() => setIndex(index - 1)}
                        onSubmit={handleSubmit}
                    />
                ))
            )}
            {showAnswers && <p>Answers</p>}
        </div>
    );
}
