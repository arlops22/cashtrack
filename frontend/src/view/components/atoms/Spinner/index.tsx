import { spinnerVariants, type SpinnerColor, type SpinnerVariant } from './spinner.variants';
import { cn } from '../../../../app/utils/cn';

interface IProps {
    variant?: SpinnerVariant;
    size?: number;
    color?: SpinnerColor;
    className?: string;
}

const Spinner = (props: IProps) => {
    const { variant = 'default', size = 55, color = 'white', className } = props;

    const styles = {
        wrapper: {
            base: 'h-full flex items-center justify-center',
            variant: {
                default: 'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2',
                fixed: '',
                backgrounded: '',
                static: '',
            },
        },
        effects: {
            base: 'rounded-full border-[3px] border-transparent border-solid box-border border-l-[3px]',
            effect_1: 'absolute animate-rotate 1s',
            effect_2: 'absolute animate-rotateOpacity1',
            effect_3: 'animate-rotateOpacity2',
        },
    };

    return (
        <div className={cn(styles.wrapper.base, spinnerVariants({ variant }), className)}>
            <div
                className={cn(styles.effects.base, styles.effects.effect_1, spinnerVariants({ color }))}
                style={{
                    height: size - 5,
                    width: size - 5,
                }}
            />
            <div
                className={cn(styles.effects.base, styles.effects.effect_2, spinnerVariants({ color }))}
                style={{
                    height: size - 5,
                    width: size - 5,
                }}
            />
            <div
                className={cn(styles.effects.base, styles.effects.effect_3, spinnerVariants({ color }))}
                style={{
                    height: size - 5,
                    width: size - 5,
                }}
            />
        </div>
    );
};
export default Spinner;
