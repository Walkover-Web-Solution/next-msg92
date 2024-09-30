import countries from '@/data/countries.json';
export default function GetCountryDetails(params) {
    if (params.type === 'name') {
        const countryDetails = countries.find((country) => country.name === params.name);
        if (countryDetails) {
            return countryDetails;
        }
    }
    if (params.type === 'shortname') {
        const countryDetails = countries.find((country) => country.shortname === params.shortname.toUpperCase());
        if (countryDetails) {
            return countryDetails;
        }
    }
}
