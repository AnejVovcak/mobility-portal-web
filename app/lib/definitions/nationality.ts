export default interface Nationality {
    alpha_3_code: string;
    nationality: string;
}

export enum NatMig {
    AllNationalities = 'ALL NATIONALITIES',
    Belgians = 'BELGIANS',
    EuCitizens = 'EU CITIZENS',
    NonBelgians = 'NON-BELGIANS',
    NonEuCitizenWithResearcherPermit = 'NON-EU CITIZEN WITH RESEARCHER PERMIT',
    NonEuCitizenWithoutResearcherPermitButWithSchengenVisa = 'NON-EU CITIZEN WITHOUT RESEARCHER PERMIT BUT WITH SCHENGEN VISA',
    NonEuCitizens = 'NON-EU CITIZENS',
    NonEuCitizensWithoutResearcherPermit = 'NON-EU CITIZENS WITHOUT RESEARCHER PERMIT'
}