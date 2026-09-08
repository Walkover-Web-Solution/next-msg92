function getCssVariable(variableName, fallbackValue = '') {
    if (typeof window === 'undefined' || !document.documentElement) {
        return fallbackValue;
    }
    const computedStyle = getComputedStyle(document.documentElement);
    const value = computedStyle ? computedStyle.getPropertyValue(variableName).trim() : '';
    return value || fallbackValue;
}

function loadJsPdfScript() {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
            reject(new Error('Window is undefined'));
            return;
        }
        if (window.jspdf && window.jspdf.jsPDF) {
            resolve(window.jspdf.jsPDF);
            return;
        }
        const existingScript = document.getElementById('jspdfScript');
        if (existingScript) {
            existingScript.addEventListener('load', () => {
                if (window.jspdf && window.jspdf.jsPDF) resolve(window.jspdf.jsPDF);
                else reject(new Error('jsPDF failed to load'));
            });
            existingScript.addEventListener('error', reject);
            return;
        }
        const script = document.createElement('script');
        script.id = 'jspdfScript';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
            if (window.jspdf && window.jspdf.jsPDF) resolve(window.jspdf.jsPDF);
            else reject(new Error('jsPDF loaded without namespace'));
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function drawRoundedRect(
    context,
    positionX,
    positionY,
    width,
    height,
    radius,
    fillStyle,
    strokeStyle,
    strokeWidth = 1
) {
    context.beginPath();
    context.moveTo(positionX + radius, positionY);
    context.lineTo(positionX + width - radius, positionY);
    context.quadraticCurveTo(positionX + width, positionY, positionX + width, positionY + radius);
    context.lineTo(positionX + width, positionY + height - radius);
    context.quadraticCurveTo(positionX + width, positionY + height, positionX + width - radius, positionY + height);
    context.lineTo(positionX + radius, positionY + height);
    context.quadraticCurveTo(positionX, positionY + height, positionX, positionY + height - radius);
    context.lineTo(positionX, positionY + radius);
    context.quadraticCurveTo(positionX, positionY, positionX + radius, positionY);
    context.closePath();
    if (fillStyle) {
        context.fillStyle = fillStyle;
        context.fill();
    }
    if (strokeStyle) {
        context.strokeStyle = strokeStyle;
        context.lineWidth = strokeWidth;
        context.stroke();
    }
}

export async function generateCostComparisonPdf({
    hello,
    competitorResult,
    savings,
    competitor,
    plan,
    agents,
    currency,
    formatCurrency,
    footnote,
}) {
    if (typeof window === 'undefined') return;

    try {
        const jsPDF = await loadJsPdfScript();
        if (!jsPDF) return;

        const sanitizeText = (inputString) =>
            String(inputString || '')
                .replace(/by\s+MSG91/gi, '')
                .replace(/MSG91/gi, '')
                .trim();

        const todayDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const competitorName = sanitizeText(competitor?.name || 'Competitor');
        const planName = sanitizeText(plan?.name || 'Basic');
        const cleanFootnote = sanitizeText(footnote);

        const canvas = document.createElement('canvas');
        canvas.width = 1600;
        canvas.height = 2260;
        const context = canvas.getContext('2d');

        context.fillStyle = getCssVariable('--white-color', '#ffffff');
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = getCssVariable('--text-primary', '#111827');
        context.font = 'bold 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText('Support Cost Comparison Analytics', 80, 90);

        context.fillStyle = getCssVariable('--indigo-color', '#4f46e5');
        context.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText(`Hello vs ${competitorName}`, 80, 130);

        drawRoundedRect(
            context,
            1200,
            55,
            320,
            50,
            8,
            getCssVariable('--border-lite-color', '#f3f4f6'),
            getCssVariable('--border-color', '#e5e7eb'),
            1
        );
        context.fillStyle = getCssVariable('--text-medium-gray', '#4b5563');
        context.font = '500 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.textAlign = 'center';
        context.fillText(`Generated on ${todayDate}`, 1360, 87);
        context.textAlign = 'left';

        context.strokeStyle = getCssVariable('--border-color', '#e5e7eb');
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(80, 160);
        context.lineTo(1520, 160);
        context.stroke();

        drawRoundedRect(
            context,
            80,
            190,
            1440,
            180,
            12,
            getCssVariable('--bg-lite-gray', '#f9fafb'),
            getCssVariable('--border-color', '#e5e7eb'),
            1
        );

        const parameters = [
            {
                label: 'MONTHLY CONVERSATIONS',
                value: (hello?.tickets || 0).toLocaleString(),
                positionX: 120,
                positionY: 240,
            },
            { label: 'SUPPORT AGENTS', value: String(agents || 1), positionX: 600, positionY: 240 },
            {
                label: 'AI RESOLUTION RATE',
                value: `${hello?.aiRate || 0}% (${(hello?.aiResolved || 0).toLocaleString()} resolved)`,
                positionX: 1080,
                positionY: 240,
            },
            { label: 'HELLO PLAN', value: planName, positionX: 120, positionY: 320 },
            {
                label: 'COMPETITOR',
                value: competitorResult?.selectedPlanName
                    ? `${competitorName} (${sanitizeText(competitorResult.selectedPlanName)})`
                    : competitorName,
                positionX: 600,
                positionY: 320,
            },
            { label: 'CURRENCY', value: currency || 'USD', positionX: 1080, positionY: 320 },
        ];

        parameters.forEach((parameter) => {
            context.fillStyle = getCssVariable('--text-secondary', '#6b7280');
            context.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            context.fillText(parameter.label, parameter.positionX, parameter.positionY);

            context.fillStyle = getCssVariable('--text-primary', '#111827');
            context.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            context.fillText(parameter.value, parameter.positionX, parameter.positionY + 28);
        });

        const cardYPosition = 400;
        const cardWidth = 453;
        const cardHeight = 200;

        drawRoundedRect(
            context,
            80,
            cardYPosition,
            cardWidth,
            cardHeight,
            14,
            getCssVariable('--blue-lite-bg', '#eff6ff'),
            getCssVariable('--blue-lite-border', '#bfdbfe'),
            1
        );
        context.fillStyle = getCssVariable('--blue-dark-text', '#1e40af');
        context.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText('With Hello You Pay', 110, cardYPosition + 50);
        context.font = '900 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText(formatCurrency(hello?.total || 0), 110, cardYPosition + 115);
        context.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText('per month', 110, cardYPosition + 155);

        drawRoundedRect(
            context,
            573,
            cardYPosition,
            cardWidth,
            cardHeight,
            14,
            getCssVariable('--slate-dark-bg', '#0f172a'),
            null
        );
        context.fillStyle = getCssVariable('--white-color', '#ffffff');
        context.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText(`With ${competitorName} You Pay`, 603, cardYPosition + 50);
        context.font = '900 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText(formatCurrency(competitorResult?.total || 0), 603, cardYPosition + 115);
        context.fillStyle = getCssVariable('--slate-lite-text', '#cbd5e1');
        context.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText('per month', 603, cardYPosition + 155);

        drawRoundedRect(
            context,
            1066,
            cardYPosition,
            cardWidth,
            cardHeight,
            14,
            getCssVariable('--emerald-lite-bg', '#ecfdf5'),
            getCssVariable('--emerald-lite-border', '#a7f3d0'),
            1
        );
        context.fillStyle = getCssVariable('--emerald-dark-text', '#065f46');
        context.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText('You Save With Hello', 1096, cardYPosition + 50);
        context.font = '900 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText(formatCurrency(savings?.saving || 0), 1096, cardYPosition + 115);
        context.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText(
            `${formatCurrency(savings?.yearly || 0)}/year · ${savings?.percent || 0}% less`,
            1096,
            cardYPosition + 155
        );

        const tableYPosition = 630;
        const tableWidth = 1440;
        drawRoundedRect(
            context,
            80,
            tableYPosition,
            tableWidth,
            640,
            14,
            getCssVariable('--white-color', '#ffffff'),
            getCssVariable('--border-color', '#e5e7eb'),
            1
        );

        context.fillStyle = getCssVariable('--text-primary', '#111827');
        context.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText(`Cost Breakdown (${currency || 'USD'})`, 110, tableYPosition + 45);

        drawRoundedRect(
            context,
            81,
            tableYPosition + 70,
            tableWidth - 2,
            50,
            0,
            getCssVariable('--border-lite-color', '#f3f4f6'),
            null
        );
        context.fillStyle = getCssVariable('--text-dark-gray', '#374151');
        context.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText('COST ELEMENT', 110, tableYPosition + 102);

        context.fillStyle = getCssVariable('--indigo-color', '#4f46e5');
        context.textAlign = 'right';
        context.fillText(`HELLO (${planName.toUpperCase()})`, 1050, tableYPosition + 102);

        context.fillStyle = getCssVariable('--text-dark-gray', '#374151');
        context.fillText(competitorName.toUpperCase(), 1490, tableYPosition + 102);
        context.textAlign = 'left';

        const getBaseSubDescription = () => {
            if (competitorResult?.basePlanCost > 0) return competitorResult?.selectedPlanName || 'Base Subscription';
            return '—';
        };

        const getSeatDescription = () => {
            if (['seat', 'seat_res', 'seat_tiered'].includes(competitorResult?.model)) {
                return `${agents} × ${formatCurrency(competitorResult?.perAgent || 0)}`;
            }
            if (competitorResult?.model === 'base_seat' || competitorResult?.model === 'base_seat_tiered') {
                const extraSeats = Math.max(0, agents - (competitorResult?.includedSeats || 0));
                return extraSeats > 0
                    ? `${extraSeats} extra × ${formatCurrency(competitorResult?.extraSeatFee || competitorResult?.extraSeat || 0)}`
                    : 'Within included seats';
            }
            if (competitorResult?.model === 'zenvia_tiered') {
                const extraUsers = Math.max(0, agents - (competitorResult?.includedUsers || 0));
                return extraUsers > 0
                    ? `${extraUsers} extra × ${formatCurrency(competitorResult?.extraUserFee || 0)}`
                    : 'Within included seats';
            }
            return '—';
        };

        const rows = [
            {
                title: 'Base Subscription',
                subtitle: `Hello: ${(hello?.includedTickets || 0).toLocaleString()} tickets included`,
                helloValue: formatCurrency(hello?.base || 0),
                helloColor: getCssVariable('--indigo-color', '#4f46e5'),
                competitorValue:
                    competitorResult?.basePlanCost > 0 ? formatCurrency(competitorResult.basePlanCost) : '—',
                competitorDescription: getBaseSubDescription(),
            },
            {
                title: 'Seat Charges',
                subtitle: 'Hello: Unlimited free agents',
                helloValue: `${formatCurrency(0)} (Free)`,
                helloColor: getCssVariable('--emerald-success-text', '#059669'),
                competitorValue: [
                    'seat',
                    'seat_res',
                    'base_seat',
                    'seat_tiered',
                    'base_seat_tiered',
                    'zenvia_tiered',
                ].includes(competitorResult?.model)
                    ? formatCurrency(competitorResult?.agentSeatsCost || 0)
                    : '—',
                competitorDescription: getSeatDescription(),
            },
            {
                title: 'AI Seat Copilot / Add-on',
                subtitle: 'Hello: Included in plan',
                helloValue: `${formatCurrency(0)} (Included)`,
                helloColor: getCssVariable('--emerald-success-text', '#059669'),
                competitorValue: competitorResult?.aiSeatCost > 0 ? formatCurrency(competitorResult.aiSeatCost) : '—',
                competitorDescription:
                    competitorResult?.aiSeatCost > 0
                        ? `${agents} × ${formatCurrency(competitorResult?.aiPerAgent || 0)}`
                        : '—',
            },
            {
                title: 'Ticket Usage / Overage',
                subtitle: `Hello: ${formatCurrency(hello?.extraPerTicket || 0)} per extra ticket`,
                helloValue: hello?.extraCost > 0 ? formatCurrency(hello.extraCost) : formatCurrency(0),
                helloColor: getCssVariable('--text-primary', '#111827'),
                competitorValue:
                    (competitorResult?.model === 'base_conv' || competitorResult?.model === 'base_conv_tiered') &&
                    competitorResult?.usageCost > 0
                        ? formatCurrency(competitorResult?.usageCost || 0)
                        : (competitorResult?.includedConvs || competitor?.includedConvs) &&
                            (competitorResult?.includedConvs || competitor?.includedConvs) !== Infinity &&
                            (hello?.tickets || 0) > (competitorResult?.includedConvs || competitor?.includedConvs)
                          ? 'Contact sales'
                          : '—',
                competitorDescription:
                    (competitorResult?.model === 'base_conv' || competitorResult?.model === 'base_conv_tiered') &&
                    competitorResult?.usageCost > 0
                        ? `${(hello?.tickets || 0).toLocaleString()} × ${formatCurrency(competitorResult?.perConv || 0)}`
                        : (competitorResult?.includedConvs || competitor?.includedConvs) &&
                            (competitorResult?.includedConvs || competitor?.includedConvs) !== Infinity &&
                            (hello?.tickets || 0) > (competitorResult?.includedConvs || competitor?.includedConvs)
                          ? `${(hello?.tickets || 0).toLocaleString()} > ${(competitorResult?.includedConvs || competitor?.includedConvs).toLocaleString()} included · Contact sales`
                          : (competitorResult?.includedConvs || competitor?.includedConvs) &&
                              (competitorResult?.includedConvs || competitor?.includedConvs) !== Infinity
                            ? `Within ${(competitorResult?.includedConvs || competitor?.includedConvs).toLocaleString()} included quota`
                            : '—',
            },
            {
                title: 'AI Bot Resolutions',
                subtitle: 'Hello: Included in plan',
                helloValue: `${formatCurrency(0)} (Included)`,
                helloColor: getCssVariable('--emerald-success-text', '#059669'),
                competitorValue:
                    competitorResult?.aiResolutionsCost > 0
                        ? formatCurrency(competitorResult.aiResolutionsCost)
                        : competitorResult?.perResolution === 0 || competitorResult?.model === 'base_seat_tiered'
                          ? formatCurrency(0)
                          : '—',
                competitorDescription:
                    competitorResult?.aiResolutionsCost > 0
                        ? competitorResult?.model === 'zenvia_tiered'
                            ? `${Math.max(0, (hello?.aiResolved || 0) - (competitorResult?.includedCredits || 0)).toLocaleString()} extra × ${formatCurrency(competitorResult?.extraCreditFee || 0)}`
                            : `${(hello?.aiResolved || 0).toLocaleString()} × ${formatCurrency(competitorResult?.perResolution || 0)}`
                        : competitorResult?.perResolution === 0 || competitorResult?.model === 'base_seat_tiered'
                          ? 'Included in plan'
                          : '—',
            },
        ];

        let rowYPosition = tableYPosition + 140;
        rows.forEach((row) => {
            context.strokeStyle = getCssVariable('--border-lite-color', '#f3f4f6');
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(81, rowYPosition);
            context.lineTo(1519, rowYPosition);
            context.stroke();

            context.fillStyle = getCssVariable('--text-primary', '#111827');
            context.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            context.fillText(row.title, 110, rowYPosition + 32);

            context.fillStyle = getCssVariable('--text-secondary', '#6b7280');
            context.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            context.fillText(row.subtitle, 110, rowYPosition + 56);

            context.textAlign = 'right';
            context.fillStyle = row.helloColor;
            context.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            context.fillText(row.helloValue, 1050, rowYPosition + 44);

            context.fillStyle = getCssVariable('--text-primary', '#111827');
            context.fillText(row.competitorValue, 1490, rowYPosition + 34);

            context.fillStyle = getCssVariable('--text-secondary', '#6b7280');
            context.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            context.fillText(row.competitorDescription, 1490, rowYPosition + 56);
            context.textAlign = 'left';

            rowYPosition += 85;
        });

        drawRoundedRect(
            context,
            81,
            rowYPosition,
            tableWidth - 2,
            75,
            0,
            getCssVariable('--bg-lite-gray', '#f9fafb'),
            null
        );
        context.strokeStyle = getCssVariable('--border-color', '#e5e7eb');
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(81, rowYPosition);
        context.lineTo(1519, rowYPosition);
        context.stroke();

        context.fillStyle = getCssVariable('--text-primary', '#111827');
        context.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText('Total Monthly Cost', 110, rowYPosition + 46);

        context.textAlign = 'right';
        context.fillStyle = getCssVariable('--indigo-color', '#4f46e5');
        context.font = '900 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText(formatCurrency(hello?.total || 0), 1050, rowYPosition + 46);

        context.fillStyle = getCssVariable('--text-primary', '#111827');
        context.font = '900 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText(formatCurrency(competitorResult?.total || 0), 1490, rowYPosition + 46);
        context.textAlign = 'left';

        const bannerYPosition = 1300;
        drawRoundedRect(
            context,
            80,
            bannerYPosition,
            1440,
            130,
            14,
            getCssVariable('--emerald-color', '#10b981'),
            null
        );

        context.fillStyle = getCssVariable('--white-color', '#ffffff');
        context.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText('Your monthly saving with Hello', 120, bannerYPosition + 50);

        context.fillStyle = getCssVariable('--emerald-lite-bg', '#ecfdf5');
        context.font = '18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText(
            `${formatCurrency(competitorResult?.total || 0)} − ${formatCurrency(hello?.total || 0)} = ${formatCurrency(savings?.saving || 0)}`,
            120,
            bannerYPosition + 92
        );

        context.textAlign = 'right';
        context.fillStyle = getCssVariable('--white-color', '#ffffff');
        context.font = '900 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText(`${formatCurrency(savings?.saving || 0)}/mo`, 1480, bannerYPosition + 56);

        context.fillStyle = getCssVariable('--emerald-lite-bg', '#ecfdf5');
        context.font = '18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        context.fillText(
            `${formatCurrency(savings?.yearly || 0)} saved per year · ${savings?.percent || 0}% lower`,
            1480,
            bannerYPosition + 92
        );
        context.textAlign = 'left';

        if (cleanFootnote) {
            context.strokeStyle = getCssVariable('--border-lite-color', '#f3f4f6');
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(80, 1460);
            context.lineTo(1520, 1460);
            context.stroke();

            context.fillStyle = getCssVariable('--text-muted', '#9ca3af');
            context.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            context.fillText(cleanFootnote, 80, 1490);
        }

        const imageData = canvas.toDataURL('image/jpeg', 0.95);
        const pdfDocument = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const imageWidth = 210;
        const imageHeight = (canvas.height * imageWidth) / canvas.width;

        pdfDocument.addImage(imageData, 'JPEG', 0, 0, imageWidth, imageHeight);

        const formattedCurrency = (currency || 'USD').toLowerCase();
        const pdfFileName = `hello_comparison_${formattedCurrency}.pdf`;

        pdfDocument.save(pdfFileName);
    } catch (error) {
        console.error('PDF export failed:', error);
    }
}
