import { MdClose, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import CountrySearchSelect from '../components/CountrySearchSelect';

export default function WelcomeDetailsForm({
    fullName,
    setFullName,
    companyName,
    setCompanyName,
    handleFullNameBlur,
    countries,
    selectedCountry,
    handleCountryChange,
    services,
    selectedServices,
    handleServiceClick,
    sourceData,
    source,
    otherSource,
    setOtherSource,
    handleSourceChange,
    isAddressOpen,
    setIsAddressOpen,
    gstNumber,
    handleGstNumberChange,
    isGstLoading,
    gstValidationError,
    address,
    setAddress,
    postalCode,
    setPostalCode,
    selectedCountryId,
    selectedStateId,
    selectedCityId,
    stateOptions,
    cityOptions,
    isLoadingCountries,
    isLoadingStates,
    isLoadingCities,
    handleStateChange,
    handleCityChange,
}) {
    return (
        <div className='cont gap-8 max-w-[640px] w-full'>
            <div className='cont gap-4'>
                <div className='flex flex-col sm:flex-row gap-4 min-w-0'>
                    <div className='flex flex-col gap-1 w-full min-w-0'>
                        <label className='text-sm text-gray-700'>
                            Full Name
                            <span className='text-red-500'> *</span>
                        </label>
                        <input
                            className='input input-bordered w-full'
                            name='Name'
                            type='text'
                            required
                            placeholder='John Doe'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            onBlur={handleFullNameBlur}
                            aria-label='Full Name'
                        />
                    </div>
                    <div className='flex flex-col gap-1 w-full min-w-0'>
                        <label className='text-sm text-gray-700'>
                            Company Name
                            <span className='text-red-500'> *</span>
                        </label>
                        <input
                            className='input input-bordered w-full'
                            name='companyName'
                            type='text'
                            required
                            placeholder='Walkover'
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            aria-label='Company Name'
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-1 w-full min-w-0'>
                    <label className='text-sm text-gray-700'>
                        Country
                        <span className='text-red-500'> *</span>
                    </label>
                    <CountrySearchSelect
                        countries={countries}
                        value={selectedCountry}
                        onChange={(country) => handleCountryChange(country ? [country] : [])}
                        placeholder='Search country...'
                        className='!max-w-none'
                    />
                </div>
            </div>

            <div className='cont gap-2'>
                <h2 className='text-lg font-medium text-gray-700'>Which service are you interested in?</h2>
                <div className='flex flex-wrap gap-2'>
                    {Object.entries(services).map(([key, value]) => (
                        <div
                            onClick={() => handleServiceClick(key)}
                            key={key}
                            className={`border w-fit px-2 py-1 rounded text-sm flex items-center gap-1 cursor-pointer ${
                                selectedServices.includes(key) ? 'bg-green-100' : 'hover:bg-green-50'
                            }`}
                        >
                            <span className='text-gray-700'>{value}</span>
                            {selectedServices.includes(key) && (
                                <button aria-label={`Remove ${value}`}>
                                    <MdClose />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className='cont gap-2'>
                <h2 className='text-lg font-medium text-gray-700'>Where did you hear about us?</h2>
                <select
                    className='select select-bordered w-full'
                    onChange={(e) => handleSourceChange(e.target.value)}
                    value={source}
                    aria-label='Source'
                >
                    <option value=''>Select</option>
                    {sourceData?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {source === 'other' && (
                    <input
                        className='input input-bordered w-full'
                        type='text'
                        placeholder='Please specify'
                        value={otherSource}
                        onChange={(e) => setOtherSource(e.target.value)}
                        aria-label='Other source'
                    />
                )}
            </div>

            <div className='cont gap-3'>
                <div className='cont gap-1'>
                    <div className='flex flex-col'>
                        <button
                            className='flex items-center gap-2 cursor-pointer w-fit'
                            onClick={() => setIsAddressOpen(!isAddressOpen)}
                            aria-expanded={isAddressOpen}
                            aria-label='Toggle company details section'
                        >
                            <h2 className='text-lg font-medium text-gray-700'>Company details (Optional)</h2>
                            <MdOutlineKeyboardArrowDown
                                className={`text-gray-500 text-2xl transition-all duration-100 ${
                                    isAddressOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <p className='text-sm text-gray-500'>(This info will be used for billing purpose)</p>
                    </div>
                    <div className={`flex-col gap-3 overflow-hidden ${isAddressOpen ? 'flex' : 'hidden'}`}>
                        <div className='flex flex-col gap-1 w-full'>
                            <label className='text-sm text-gray-700'>GST Number</label>
                            <input
                                className='input input-bordered w-full'
                                type='text'
                                placeholder='29AAWCS1086R2Z2'
                                value={gstNumber}
                                onChange={(e) => handleGstNumberChange(e.target.value)}
                                aria-label='GST Number'
                            />
                            {isGstLoading && <p className='text-xs text-gray-500'>Fetching GST details...</p>}
                            {gstValidationError && <p className='text-xs text-red-600'>{gstValidationError}</p>}
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            <label className='text-sm text-gray-700'>House / Building / Apartment</label>
                            <input
                                className='input input-bordered w-full'
                                type='text'
                                placeholder='405 - 406, Capt. C. S. Naidu Arcade, Old Palasia'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                aria-label='Address'
                            />
                        </div>
                        <div className='flex flex-col sm:flex-row gap-3 min-w-0'>
                            <div className='flex flex-col gap-1 w-full min-w-0'>
                                <label className='text-sm text-gray-700'>Postal Code</label>
                                <input
                                    className='input input-bordered w-full'
                                    type='text'
                                    placeholder='452009'
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    aria-label='Postal code'
                                />
                            </div>
                            <div className='flex flex-col gap-1 w-full min-w-0'>
                                <label className='text-sm text-gray-700'>Country</label>
                                <select
                                    className='select select-bordered w-full min-w-0'
                                    value={selectedCountryId != null ? String(selectedCountryId) : ''}
                                    onChange={(e) => {
                                        const country = countries.find((c) => String(c.id) === e.target.value);
                                        handleCountryChange(country ? [country] : []);
                                    }}
                                    disabled={isLoadingCountries}
                                    aria-label='Country'
                                >
                                    <option value='' disabled>
                                        {isLoadingCountries ? 'Loading countries...' : 'Select Country'}
                                    </option>
                                    {countries.map((country) => (
                                        <option key={country.id} value={String(country.id)}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row gap-3 min-w-0'>
                            <div className='flex flex-col gap-1 w-full min-w-0'>
                                <label className='text-sm text-gray-700'>State</label>
                                <select
                                    className='select select-bordered w-full min-w-0'
                                    value={selectedStateId != null ? String(selectedStateId) : ''}
                                    onChange={(e) => {
                                        const stateOpt = stateOptions.find(
                                            (state) => String(state.id) === e.target.value
                                        );
                                        handleStateChange(stateOpt ? [stateOpt] : []);
                                    }}
                                    disabled={!selectedCountryId || isLoadingStates}
                                    aria-label='State'
                                >
                                    <option value='' disabled>
                                        {isLoadingStates ? 'Loading states...' : 'Select State'}
                                    </option>
                                    {stateOptions.map((state) => (
                                        <option key={state.id} value={String(state.id)}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex flex-col gap-1 w-full min-w-0'>
                                <label className='text-sm text-gray-700'>City</label>
                                <select
                                    className='select select-bordered w-full min-w-0'
                                    value={selectedCityId != null ? String(selectedCityId) : ''}
                                    onChange={(e) => {
                                        const cityOpt = cityOptions.find((city) => String(city.id) === e.target.value);
                                        handleCityChange(cityOpt ? [cityOpt] : []);
                                    }}
                                    disabled={!selectedStateId || isLoadingCities}
                                    aria-label='City'
                                >
                                    <option value='' disabled>
                                        {isLoadingCities ? 'Loading cities...' : 'Select City'}
                                    </option>
                                    {cityOptions.map((city) => (
                                        <option key={city.id} value={String(city.id)}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
