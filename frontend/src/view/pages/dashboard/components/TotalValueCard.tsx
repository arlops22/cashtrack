import type { ReactNode } from 'react';
import Typography from '../../../components/Typography';
import { Avatar, AvatarFallback } from '../../../components/ui/Avatar';
import { formatCurrency } from '../../../../app/utils';

type TProps = {
    label: string;
    value: number;
    icon: ReactNode;
};

export default function TotalValueCard({ label, value, icon }: TProps) {
    return (
        <div className="h-36 w-full flex flex-col justify-between bg-white border rounded-md p-4">
            <Avatar size="lg" color="secondary">
                <AvatarFallback>{icon}</AvatarFallback>
            </Avatar>
            <div>
                <Typography variant="body-sm" color="gray-700">
                    {label}
                </Typography>
                <Typography variant="body-lg" color={value > 0 ? 'primary' : 'destructive'} className="font-medium">
                    {formatCurrency(value, 'exceptZero')}
                </Typography>
            </div>
        </div>
    );
}
