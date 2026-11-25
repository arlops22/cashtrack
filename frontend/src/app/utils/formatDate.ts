import moment from 'moment';

export function formatDate(date: Date, format: string = 'DD/MM/YYYY') {
    return moment.utc(date).format(format);
}
