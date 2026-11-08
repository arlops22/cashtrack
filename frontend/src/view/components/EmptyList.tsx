import Button from './Button';
import Typography from './Typography';

type TProps = {
    title: string;
    description: string;
    actionLabel: string;
    onClickAction: () => void;
};

export default function EmptyList(props: TProps) {
    const { title, description, actionLabel, onClickAction } = props;

    return (
        <div className="border rounded-md border-dashed border-gray-400 h-96 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <Typography variant="h6" as="p" className="mb-1 text-center">
                    {title}
                </Typography>
                <Typography as="p" className="mb-4 text-center max-w-80 w-full">
                    {description}
                </Typography>
                <Button size="md" onClick={onClickAction}>
                    {actionLabel}
                </Button>
            </div>
        </div>
    );
}
