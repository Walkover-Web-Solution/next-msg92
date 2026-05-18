import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchGstDetails, GstApiError } from '../SignupUtils/gstApi';
import { GST_DEBOUNCE_MS } from '../SignupUtils/gstConstants';
import { normalizeGstin, parseGstLookupResponse, validateGstinFormat } from '../SignupUtils/gstUtils';

/**
 * @typedef {Object} UseGstLookupOptions
 * @property {Function} dispatch - signup context dispatch
 * @property {Function} onAutofill - ({ address, postalCode, stateName, cityName, gstNo }) => void
 * @property {Function} [prefillGstCountryData] - async (stateName, cityName) => void
 * @property {string} [initialGstNo]
 */

/**
 * GSTIN input, validation, debounced lookup, and cache
 * @param {UseGstLookupOptions} options
 */
export function useGstLookup({ dispatch, onAutofill, prefillGstCountryData, initialGstNo = '' }) {
    const [gstNumber, setGstNumber] = useState(initialGstNo || '');
    const [validationError, setValidationError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const debounceRef = useRef(null);
    const abortRef = useRef(null);
    const cacheRef = useRef(new Map());
    const inFlightGstinRef = useRef(null);

    const clearPendingLookup = useCallback(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
            debounceRef.current = null;
        }
        if (abortRef.current) {
            abortRef.current.abort();
            abortRef.current = null;
        }
    }, []);

    const applyAutofill = useCallback(
        async (data) => {
            onAutofill({
                address: data.address || '',
                postalCode: data.postalCode || '',
                gstNo: data.gstNo,
            });

            dispatch({
                type: 'SET_COMPANY_DETAILS',
                payload: { gstNo: data.gstNo },
            });

            if (prefillGstCountryData && (data.stateName || data.cityName)) {
                await prefillGstCountryData(data.stateName, data.cityName);
            }
        },
        [dispatch, onAutofill, prefillGstCountryData]
    );

    const runLookup = useCallback(
        async (gstin, { skipCache = false, skipDebounce = false } = {}) => {
            const normalized = normalizeGstin(gstin);
            const validation = validateGstinFormat(normalized);

            if (!validation.readyForLookup) {
                setValidationError(validation.message);
                return;
            }

            setValidationError('');

            if (!skipCache && cacheRef.current.has(normalized)) {
                dispatch({ type: 'CLEAR_ERROR' });
                await applyAutofill(cacheRef.current.get(normalized));
                return;
            }

            if (inFlightGstinRef.current === normalized) {
                return;
            }

            clearPendingLookup();
            abortRef.current = new AbortController();
            inFlightGstinRef.current = normalized;

            setIsLoading(true);
            dispatch({ type: 'CLEAR_ERROR' });

            try {
                const apiBody = await fetchGstDetails(normalized, abortRef.current.signal);
                const parsed = parseGstLookupResponse(apiBody, normalized);

                if (parsed.type === 'inactive') {
                    setValidationError(parsed.message);
                    return;
                }

                if (parsed.type === 'api_error') {
                    if (parsed.message) {
                        dispatch({ type: 'SET_ERROR', payload: parsed.message });
                    }
                    return;
                }

                cacheRef.current.set(normalized, parsed.data);
                await applyAutofill(parsed.data);
            } catch (error) {
                if (error?.name === 'AbortError') {
                    return;
                }

                if (error instanceof GstApiError && error.message) {
                    dispatch({ type: 'SET_ERROR', payload: error.message });
                }
            } finally {
                if (inFlightGstinRef.current === normalized) {
                    inFlightGstinRef.current = null;
                }
                setIsLoading(false);
            }
        },
        [applyAutofill, clearPendingLookup, dispatch]
    );

    const handleGstNumberChange = useCallback(
        (rawValue) => {
            const normalized = normalizeGstin(rawValue);
            setGstNumber(normalized);

            dispatch({
                type: 'SET_COMPANY_DETAILS',
                payload: { gstNo: normalized || null },
            });

            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
                debounceRef.current = null;
            }

            if (abortRef.current) {
                abortRef.current.abort();
                abortRef.current = null;
                inFlightGstinRef.current = null;
                setIsLoading(false);
            }

            const validation = validateGstinFormat(normalized);
            setValidationError(validation.message);

            if (!validation.readyForLookup) {
                return;
            }

            debounceRef.current = setTimeout(() => {
                runLookup(normalized, { skipDebounce: true });
            }, GST_DEBOUNCE_MS);
        },
        [dispatch, runLookup]
    );

    useEffect(() => {
        return () => {
            clearPendingLookup();
        };
    }, [clearPendingLookup]);

    return {
        gstNumber,
        validationError,
        isLoading,
        handleGstNumberChange,
    };
}
