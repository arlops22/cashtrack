import i18n from '../i18n';

export function formatCurrency(
    value: number,
    signDisplay: keyof Intl.NumberFormatOptionsSignDisplayRegistry = 'never',
) {
    return Intl.NumberFormat(i18n.resolvedLanguage, {
        style: 'currency',
        currency: 'BRL',
        signDisplay,
    }).format(value);
}
