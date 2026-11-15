import moment from 'moment';

export function formatDate(date: Date, format: string = 'DD/MM/YYYY') {
    return moment(date).format(format);
}
