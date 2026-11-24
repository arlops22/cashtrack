import { Calendar } from './ui/Calendar';

type TProps = { value?: Date; onChange(date: Date): void };

export function DatePicker({ value, onChange }: TProps) {
    return <Calendar mode="single" required selected={value} onSelect={onChange} defaultMonth={value} />;
}
