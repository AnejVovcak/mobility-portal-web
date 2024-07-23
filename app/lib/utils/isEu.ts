export const euCountries = ['AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD', 'POL', 'POR', 'ROM', 'SVK', 'SLO', 'ESP', 'SWE']

export const isEu = (countryCode: string) => {
	return euCountries.includes(countryCode);
}