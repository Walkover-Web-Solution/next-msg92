import countries from '@/data/countries.json';
export default function GetCountryDetails(params) {
    if (params.type === 'name' && params?.shortname !== 'global') {
        if (params?.name) {
            const countryDetails = countries.find((country) => country.name === params.name);
            return countryDetails;
        } else {
            const countryDetails = countries.find((country) => country.name === 'United States');
            return countryDetails;
        }
    }

    if (params.type === 'shortname') {
        if (params?.shortname && params?.shortname !== 'global') {
            const countryDetails = countries.find((country) => country.shortname === params.shortname.toUpperCase());
            return countryDetails;
        } else {
            const countryDetails = countries.find((country) => country.shortname === 'US');
            return countryDetails;
        }
    }
}
