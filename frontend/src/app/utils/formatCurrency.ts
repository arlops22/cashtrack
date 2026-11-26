import i18n from '../i18n';

function getCurrency(language?: string) {
    return language?.startsWith('en') ? 'USD' : 'BRL';
}

export function formatCurrency(
    value: number,
    signDisplay: keyof Intl.NumberFormatOptionsSignDisplayRegistry = 'never',
) {
    const locale = i18n.resolvedLanguage;
    const currency = getCurrency(locale);

    return Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        signDisplay,
    }).format(value);
}
