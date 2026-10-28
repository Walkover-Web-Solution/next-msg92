import { useEffect } from 'react';
import { sendExperimentEvent } from '@/utils/experimentEvents';

// Records that the assigned variant actually rendered (exposure), separately from assignment.
export default function ExperimentExposure({ experiment }) {
    useEffect(() => {
        if (!experiment?.track) return;
        sendExperimentEvent({
            type: 'exposure',
            exp: experiment.id,
            version: experiment.version,
            arm: experiment.arm,
            path: window.location.pathname,
        });
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'experiment_exposure',
            experiment_id: experiment.id,
            experiment_version: experiment.version,
            experiment_arm: experiment.arm,
        });
    }, [experiment?.id, experiment?.version, experiment?.arm, experiment?.track]);

    if (!experiment?.preview) return null;
    return (
        <div
            className='fixed bottom-4 left-4 z-50 rounded bg-primary px-3 py-2 text-sm text-white shadow'
            role='status'
        >
            Preview: {experiment.id} · arm {experiment.arm} · not tracked
        </div>
    );
}
