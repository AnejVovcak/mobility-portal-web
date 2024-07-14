'use client';

import {CountryCode} from "@/app/lib/definitions/countries";
import {MigTime} from "@/app/lib/definitions/time";

interface HowLongAreYouStayingInProps {
    countryName: string;
    country: CountryCode;
    onSelect: (time: MigTime) => void;
}

export default function HowLongAreYouStayingIn(props: HowLongAreYouStayingInProps) {
    return (
        <div>
            <h2>How long are you staying in {props.countryName}?</h2>

            <form>
                {([CountryCode.ROM, CountryCode.SLO, CountryCode.BEL, CountryCode.ITA] as CountryCode[]).includes(props.country) ? (
                    <div>
                        <input type="radio" id={MigTime.LessThan90Days} name="duration" value={MigTime.LessThan90Days}
                               onClick={() => props.onSelect(MigTime.LessThan90Days)}/>
                        <label htmlFor={MigTime.LessThan90Days}>Less than 90 days</label>
                        <input type="radio" id={MigTime.MoreThan90Days} name="duration" value={MigTime.MoreThan90Days}
                               onClick={() => props.onSelect(MigTime.MoreThan90Days)}/>
                        <label htmlFor={MigTime.MoreThan90Days}>More than 90 days</label>
                    </div>
                ) : ([CountryCode.UK] as CountryCode[]).includes(props.country) ?
                    (
                        <div>
                            <input type="radio" id={MigTime.LessThan6Months} name="duration"
                                   value={MigTime.LessThan6Months}
                                   onClick={() => props.onSelect(MigTime.LessThan6Months)}/>
                            <label htmlFor={MigTime.LessThan6Months}>Less than 6 months</label>
                            <input type="radio" id={MigTime.MoreThan6Months} name="duration"
                                   value={MigTime.MoreThan6Months}
                                   onClick={() => props.onSelect(MigTime.MoreThan6Months)}/>
                            <label htmlFor={MigTime.MoreThan6Months}>More than 6 months</label>
                        </div>
                    ) : (
                        <div>
                            <input type="radio" id={MigTime.LessThan90Days} name="duration"
                                   value={MigTime.LessThan90Days}
                                   onClick={() => props.onSelect(MigTime.LessThan90Days)}/>
                            <label htmlFor={MigTime.LessThan90Days}>Less than 90 days</label>
                            <input type="radio" id={MigTime.MoreThan90DaysLessThanAYear} name="duration"
                                   value={MigTime.MoreThan90DaysLessThanAYear}
                                   onClick={() => props.onSelect(MigTime.MoreThan90DaysLessThanAYear)}/>
                            <label htmlFor={MigTime.MoreThan90DaysLessThanAYear}>More than 90 days but less than a
                                year</label>
                            <input type="radio" id={MigTime.MoreThanAYear} name="duration"
                                   value={MigTime.MoreThanAYear}
                                   onClick={() => props.onSelect(MigTime.MoreThanAYear)}/>
                            <label htmlFor={MigTime.MoreThanAYear}>More than a year</label>
                        </div>
                    )
                }
            </form>
        </div>
    )
}