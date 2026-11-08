import { ChartNoAxesCombined, CircleX, CreditCard, Edit, PiggyBank } from 'lucide-react';

import type { BankAccountType } from '../../../../app/entities/BankAccount';
import { formatCurrency } from '../../../../app/utils/formatCurrency';

import { Avatar, AvatarFallback } from '../../../components/ui/Avatar';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';

const TYPE_ICONS = {
    CHECKING: { icon: CreditCard },
    SAVING: { icon: PiggyBank },
    INVESTMENT: { icon: ChartNoAxesCombined },
};

type TProps = {
    accountName: string;
    balance: number;
    type: BankAccountType;
    color: string;
    onEdit: () => void;
    onDelete: () => void;
};

export default function BankAccountCard(props: TProps) {
    const { accountName, balance, type, color, onEdit, onDelete } = props;

    const Icon = TYPE_ICONS[type].icon;

    return (
        <div className="relative overflow-hidden flex flex-col justify-between h-56 border bg-white rounded-md p-4">
            <span className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: `#${color}` }} />
            <div className="flex justify-between items-start">
                <div>
                    <Avatar className="mb-4" color="secondary" size="lg">
                        <AvatarFallback className="bg-gray-300 text-gray-800">
                            <Icon />
                        </AvatarFallback>
                    </Avatar>
                    <Typography variant="body-lg" className="font-medium">
                        {accountName}
                    </Typography>
                </div>
                <div className="flex items-center">
                    <Button onClick={onEdit} size="icon" variant="ghost" color="secondary">
                        <Edit />
                    </Button>
                    <Button onClick={onDelete} size="icon" color="error" variant="ghost">
                        <CircleX />
                    </Button>
                </div>
            </div>
            <div>
                <Typography color="gray-700" variant="body-sm">
                    Actual balance
                </Typography>
                <Typography variant="body-lg">{formatCurrency(balance)}</Typography>
            </div>
        </div>
    );
}
