import React from 'react';
import { MdLaunch } from 'react-icons/md';

export default function PlansActions({ hasCalculableServices, hasCompareData, onCalculateClick, onCompareClick }) {
    if (!hasCalculableServices && !hasCompareData) return null;

    return (
        <div className='mt-8 flex flex-wrap items-center justify-center gap-6'>
            {hasCalculableServices && (
                <button
                    type='button'
                    onClick={onCalculateClick}
                    className='inline-flex items-center gap-2 text-sm font-medium capitalize text-indigo-600 hover:text-indigo-700'
                >
                    <MdLaunch className='text-base' aria-hidden />
                    Calculate Price
                </button>
            )}
            {hasCompareData && (
                <button
                    type='button'
                    onClick={onCompareClick}
                    className='inline-flex items-center gap-2 text-sm font-medium capitalize text-indigo-600 hover:text-indigo-700'
                >
                    <MdLaunch className='text-base' aria-hidden />
                    Compare plans
                </button>
            )}
        </div>
    );
}
