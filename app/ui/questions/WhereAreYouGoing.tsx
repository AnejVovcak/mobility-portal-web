'use client';

import {CountryCode} from "@/app/lib/definitions/countries";
import {useState} from "react";
import {SecondmentEnum} from "@/app/lib/definitions/SecondmentEnum";

interface WhereAreYouGoingProps {
    countries: { [key in CountryCode]: string };
    onSelect: (country?: CountryCode) => void;
    onSelectSecondment: (secondment: SecondmentEnum) => void;
}

export default function WhereAreYouGoing(props: WhereAreYouGoingProps) {

    const [romania, setRomania] = useState<boolean>(false);
    const [uk, setUk] = useState<boolean>(false);

    const onSelectCountry = (code: CountryCode) => {
        if(code == CountryCode.OTHER) {
            props.onSelect(undefined);
            return;
        }

        props.onSelect(code);

        if(code == CountryCode.ROM){
            setRomania(true);
        }

        if(code == CountryCode.UK){
            setUk(true);
        }      
    }

    const onSelectRom = (opt: string) => {
        if(opt == 'yes'){
            props.onSelect(CountryCode.ROM);
        } else {
            props.onSelect(undefined);
        }
    }

    const onSelectUk = (opt: string) => {
        if(opt == 'yes'){
            props.onSelectSecondment(SecondmentEnum.SECONDMENT);
        } else {
            props.onSelectSecondment(SecondmentEnum.NO_SECONDMENT);
        }
    }

    return (
        <div>
            <h2>Where are you going?</h2>

            {/* Loop through the countries and use radio form */}
            <form>
                {Object.entries(props.countries).map((country: [CountryCode, string]) => {
                    const code = country[0];
                    const name = country[1];
                    return (
                        <div key={code}>
                            <input type="radio" id={code + 'OUT'} name="country" value={code}
                                   onClick={() => onSelectCountry(code)}/>
                            <label htmlFor={code}>{name}</label>
                        </div>
                    );
                })}

                {romania &&
                    <div>
                        <h2>Are you legally residing in Romania?</h2>
                        <div>
                            <input type="radio"
                                   value="yes"
                                   onClick={() => onSelectRom('yes')}/>
                            <label>Yes</label>
                        </div>
                        <div>
                            <input type="radio"
                                   value="not_needed"
                                   onClick={() => onSelectRom('not_needed')}/>
                            <label>No, but I don't need to obtain one</label>
                        </div>
                    </div>
                }

                {uk &&
                    <div>
                        <h2>Were you seconded to the UK?</h2>
                        <div>
                            <input type="radio"
                                   value="yes"
                                   onClick={() => onSelectUk('yes')}/>
                            <label>Yes</label>
                        </div>
                        <div>
                            <input type="radio"
                                   value="not_needed"
                                   onClick={() => onSelectUk('no')}/>
                            <label>No</label>
                        </div>
                    </div>
                }
            </form>

        </div>
    );
}