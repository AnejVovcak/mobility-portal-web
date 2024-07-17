
export enum CountryCode {
	POR = 'POR',
	SLO = 'SLO',
	ROM = 'ROM',
	ITA = 'ITA',
	UK = 'UK',
	BEL = 'BEL',
	OTHER = 'OTHER',
}
export const supportedCountries: { [key in CountryCode]: string } = {
	[CountryCode.POR]: 'Portugal',
	[CountryCode.SLO]: 'Slovenia',
	[CountryCode.ROM]: 'Romania',
	[CountryCode.ITA]: 'Italy',
	[CountryCode.UK]: 'United Kingdom',
	[CountryCode.BEL]: 'Belgium',
	[CountryCode.OTHER]: 'Other',
};