export function formatCurrency(
    value: number,
    signDisplay: keyof Intl.NumberFormatOptionsSignDisplayRegistry = 'never',
) {
    return Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
        signDisplay,
    }).format(value);
}
