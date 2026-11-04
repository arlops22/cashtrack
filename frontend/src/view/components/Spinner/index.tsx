import { cn } from '../../../app/utils/cn';
import {
    spinnerEffectsVariants,
    spinnerWrapperVariants,
    type SpinnerColor,
    type SpinnerThickness,
    type SpinnerVariant,
} from './spinner.variants';

type TProps = {
    variant?: SpinnerVariant;
    size?: number;
    thickness?: SpinnerThickness;
    color?: SpinnerColor;
    className?: string;
};

const Spinner = (props: TProps) => {
    const { variant = 'default', size = 55, color = 'white', thickness = 'thin', className } = props;

    return (
        <div className={cn(spinnerWrapperVariants({ variant }), className)}>
            <div
                className={cn(spinnerEffectsVariants({ color, thickness }))}
                style={{
                    height: size - 5,
                    width: size - 5,
                }}
            />
            <div
                className={cn(spinnerEffectsVariants({ color, thickness, effect: 'second' }))}
                style={{
                    height: size - 5,
                    width: size - 5,
                }}
            />
            <div
                className={cn(spinnerEffectsVariants({ color, thickness, effect: 'third' }))}
                style={{
                    height: size - 5,
                    width: size - 5,
                }}
            />
        </div>
    );
};
export default Spinner;
