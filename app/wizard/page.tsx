'use client';

import React, {useState, useEffect} from 'react';
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
import { count } from 'console';

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
    const [contentMig, setContentMig] = useState<Array<{ content: string }>>([]);
    const [contentSocSec, setContentSocSec] = useState<Array<{ content: string }>>([]);
    const [contentTax, setContentTax] = useState<Array<{ content: string }>>([]);
    /* const [notSupported, setNotSupported] = useState<Array<{ boolean }>([false, false, false, false, false, false, false]); */
    //notSupported is a map: int -> boolean
    const [notSupported, setNotSupported] = useState<Map<number, boolean>>(new Map());

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

    const generateBody = () => {
        let secondmentArr:string[] = [secondment, SecondmentEnum.ALL_SECONDMENT];
        let outCountryArr:string[] = [selectedOutCountry!, 'ALL COUNTRIES'];
        if (isEu(selectedOutCountry!))
            outCountryArr.push('ALL EU');
        let inCountryArr:string[] = [selectedInCountry!, 'ALL COUNTRIES'];
        if (isEu(selectedInCountry!))
            inCountryArr.push('ALL EU');
        let outTitleArr:string[] = outTitle ? [outTitle] :[];
        let inTitleArr:string[] = inTitle ? [inTitle] :[]
        let timeArr:string[] = [selectedTime!, 'ALL DURATIONS'];
        let natArr:NatMig[] = [NatMig.AllNationalities];
        let emplArr:Empl[] = [Empl.ALL_EMPL];
        let empl0EQEmpl1EnumArr:Empl0EQEmpl1Enum[] = [Empl0EQEmpl1Enum.ALL_EMPL];
        let taxArr:Tax[] = taxResidencyArr || []

        if(empl) emplArr.push(empl)
        if (empl0EQEmpl1Enum) empl0EQEmpl1EnumArr.push(empl0EQEmpl1Enum)

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

        let insArr:string[] = [insured!, 'ALL COUNTRIES'];
        if (isEu(insured!))
            insArr.push('ALL EU');

        return {
            secondment: secondmentArr || [],
            outCountry: outCountryArr || [],
            inCountry: inCountryArr || [],
            outTitle: outTitleArr || [],
            inTitle: inTitleArr || [],
            time: timeArr || [],
            nationality: natArr || [],
            empl: emplArr || [],
            if_empl0_eq_empl1: empl0EQEmpl1EnumArr || [],
            tax: taxArr || [],
            insured: insArr || []
        };
    };

    const generateMockData = () => {
        return {
            secondment: [SecondmentEnum.NO_SECONDMENT, SecondmentEnum.ALL_SECONDMENT],
            outCountry: [CountryCode.POR, 'ALL COUNTRIES','ALL EU'],
            inCountry: [CountryCode.SLO, 'ALL COUNTRIES','ALL EU'],
            outTitle: outTitle ? [outTitle] : [],
            inTitle: inTitle ? [inTitle] : [],
            time: [MigTime.LessThan90Days, 'ALL DURATIONS'],
            nationality: [NatMig.EuCitizens, NatMig.AllNationalities,NatMig.EuCitizens,NatMig.NonBelgians],
            empl: [Empl.ALL_EMPL],
            if_empl0_eq_empl1: [Empl0EQEmpl1Enum.ALL_EMPL,Empl0EQEmpl1Enum.ALL_EMPL0_NEQ_EMPL1],
            tax: [Tax.AllTax],
            insured: [CountryCode.BEL, 'ALL COUNTRIES','ALL EU']
        }
    }

    const renderQuestion = (i: number) => {
        switch (i) {
            case 0:
                return (
                    <WhereAreYouFrom
                        countries={supportedCountries}
                        onSelect={(country) :void => {
                            setSelectedOutCountry(country)
                            /* setNotSupported(country === CountryCode.OTHER) */
                            //setNotSupported where number is 0 to true
                            setNotSupported(new Map(notSupported).set(0, country === CountryCode.OTHER))
                        }}
                    />
                );
            case 1:
                return (
                    <WhereAreYouGoing
                        countries={getInCountiesOptions()}
                        /* onSelect={(country) => setSelectedInCountry(country)} */
                        onSelect={(country) => {
                            setSelectedInCountry(country)
                            /* setNotSupported(country === CountryCode.OTHER) */
                            //setNotSupported where number is 1 to true
                            setNotSupported(new Map(notSupported).set(1, country === CountryCode.OTHER))
                        }}
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
                        onNationalitySelect={(nationality: any) => {
                            setNat(nationality)
                            setNotSupported(new Map(notSupported).set(2, false))
                        }}
                        onSubquestionSelect={(inTitle: any, outTitle: any) => {
                            setInTitle(inTitle);
                            setOutTitle(outTitle);
                            console.log(inTitle, outTitle);
                            /* setNotSupported(inTitle === undefined || outTitle === undefined) */
                            //setNotSupported where number is 3 to true
                            setNotSupported(new Map(notSupported).set(3, inTitle === undefined || outTitle === undefined))
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
                        /* onSelect={(country) => setCurrentlyEmployed(country)} */
                        onSelect={(country) => {
                            setCurrentlyEmployed(country)
                            /* setNotSupported(country === CountryCode.OTHER) */
                            //setNotSupported where number is 4 to true
                            setNotSupported(new Map(notSupported).set(4, country === CountryCode.OTHER))
                        }}
                    />
                );
            case 5:
                return (
                    <WhereAreYouGoingToBeEmployed
                        countries={supportedCountries}
                        outCountry={selectedOutCountry!}
                        inCountry={selectedInCountry!}
                        currentlyEmployed={currentlyEmployed}
                        /* onSelectEmpl={(empl) => setEmpl(empl)} */
                        onSelectEmpl={(empl) => {
                            setEmpl(empl)
                            /* setNotSupported(empl === undefined) */
                            //setNotSupported where number is 5 to true
                            setNotSupported(new Map(notSupported).set(5, empl === undefined))
                        }}
                        onSelectTripType={(empl0EQEmpl1Enum) => setEmpl0EQEmpl1Enum(empl0EQEmpl1Enum)}
                    />
                );
            case 6:
                return (
                    <WhereAreYouInsured
                        countries={supportedCountries}
                        /* onSelect={(country) => setInsured(country)} */
                        onSelect={(country) => {
                            setInsured(country)
                            /* setNotSupported(country === CountryCode.OTHER) */
                            //setNotSupported where number is 6 to true
                            setNotSupported(new Map(notSupported).set(6, country === CountryCode.OTHER))
                        }}
                    />
                );
            case 7:
                return (
                    <WhatIsYourTaxResidence
                        inCountry={selectedInCountry!}
                        outCountry={selectedOutCountry!}
                        countries={getTaxResidenceOptions()}
                        /* onSelect={(taxResidencyArr?: Tax[]) => setTaxResidenceArr(taxResidencyArr)} */
                        onSelect={(taxResidencyArr?: Tax[]) => {
                            setTaxResidenceArr(taxResidencyArr)
                            /* setNotSupported(taxResidencyArr === undefined) */
                            //setNotSupported where number is 7 to true
                            setNotSupported(new Map(notSupported).set(7, taxResidencyArr === undefined))
                        }}
                    />
                );
            default:
                return null;
        }
    };

    const handleSubmit = async () => {
        try {
            const responseMig = await fetch(`/api/roadmap/mig`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(generateMockData()),
            });
            const responseSocSec = await fetch(`/api/roadmap/socSec`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(generateMockData()),
            });
            const responseTax = await fetch(`/api/roadmap/tax`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(generateMockData()),
            });

            if (!responseMig.ok) throw new Error('Network response was not ok');
            if (!responseSocSec.ok) throw new Error('Network response was not ok');
            if (!responseTax.ok) throw new Error('Network response was not ok');

            const dataMig = await responseMig.json();
            const dataSocSec = await responseSocSec.json();
            const dataTax = await responseTax.json();

            console.log(dataSocSec);
            setContentMig(dataMig.data);
            setContentSocSec(dataSocSec.data);
            setContentTax(dataTax.data);
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

            {showAnswers && contentMig.length > 0 && contentSocSec.length > 0 && !Array.from(notSupported.values()).some(value => value === true) && (
                <div>
                    <h1 className="text-red-600 font-bold">Filters:</h1>
                    <pre>{JSON.stringify(generateBody(), null, 2)}</pre>
                </div>
            )}

            {showAnswers && contentMig.length > 0 && !Array.from(notSupported.values()).some(value => value === true) && (
                <div>
                    <h1 className="text-red-600 font-bold">Mig:</h1>
                    {contentMig.map((item, index) => (
                        <div key={index} dangerouslySetInnerHTML={{ __html: item.content }} />
                    ))}
                </div>
            )}

            {showAnswers && contentSocSec.length > 0 && !Array.from(notSupported.values()).some(value => value === true) && (
                <div>
                    <h1 className="text-red-600 font-bold">SocSec:</h1>
                    {contentSocSec.map((item, index) => (
                        <div key={index} dangerouslySetInnerHTML={{ __html: item.content }} />
                    ))}
                </div>
            )}

            {showAnswers && contentTax.length > 0 && !Array.from(notSupported.values()).some(value => value === true) && (
                <div>
                    <h1 className="text-red-600 font-bold">Tax:</h1>
                    {contentTax.map((item, index) => (
                        <div key={index} dangerouslySetInnerHTML={{ __html: item.content }} />
                    ))}
                </div>
            )}

            {showAnswers && Array.from(notSupported.values()).some(value => value === true) && (
                <div>
                    <h1 className="text-red-600 font-bold">We are sorry, this version does not cover this situation yet</h1>
                </div>
            )}
            {/* <button onClick={handleSubmit}>mock</button> */}
        </div>
    );
}
