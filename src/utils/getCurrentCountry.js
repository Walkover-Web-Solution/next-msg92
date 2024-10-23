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
        let countryy = params?.shortname;
        if (countryy?.toLowerCase() === 'br-pt') {
            countryy = 'br';
        }

        if (params?.shortname && params?.shortname !== 'global') {
            const countryDetails = countries.find((country) => country.shortname === countryy?.toUpperCase());
            return countryDetails;
        } else {
            const countryDetails = countries.find((country) => country.shortname === 'US');
            return countryDetails;
        }
    }
}
