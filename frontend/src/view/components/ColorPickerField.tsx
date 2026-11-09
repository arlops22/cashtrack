import { useState } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import {
    ColorArea,
    ColorField,
    ColorPicker,
    ColorSlider,
    ColorSwatch,
    ColorSwatchPicker,
    ColorSwatchPickerItem,
    ColorThumb,
    Input,
    SliderTrack,
    parseColor,
    type Color,
} from 'react-aria-components';

import { cn } from '../../app/utils/cn';
import Button from './Button';

const DEFAULT_SWATCHES = ['#ef4444', '#f97316', '#EAD708', '#22c55e', '#3b82f6', '#CA3BF5', '#F53BCA'];

const thumbClass =
    'size-5 rounded-full border-2 border-white shadow-[0_0_0_1px_black,inset_0_0_0_1px_black] ' +
    'data-focus-visible:size-6';

type TProps = {
    value: string;
    onChange: (hex: string) => void;
    swatches?: string[];
    className?: string;
};

export default function ColorPickerField(props: TProps) {
    const { value, onChange, swatches = DEFAULT_SWATCHES, className } = props;

    function toHsb(value: string): Color {
        try {
            return parseColor(value).toFormat('hsb');
        } catch {
            return parseColor('#000000').toFormat('hsb');
        }
    }

    const [color, setColor] = useState(() => toHsb(value));

    if (toHsb(value).toString('hex') !== color.toString('hex')) {
        setColor(toHsb(value));
    }

    function handleChange(next: Color) {
        setColor(next);
        onChange(next.toString('hex'));
    }

    return (
        <PopoverPrimitive.Root>
            <PopoverPrimitive.Trigger asChild>
                <Button size="md" variant="outlined" color="secondary" className={cn('px-2', className)}>
                    <ColorSwatch color={value} className="size-6 rounded-md" />
                    <span>Select color</span>
                </Button>
            </PopoverPrimitive.Trigger>

            <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                    sideOffset={8}
                    align="start"
                    className="z-50 flex w-64 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
                >
                    <ColorPicker value={color} onChange={handleChange}>
                        <div className="flex flex-col gap-3">
                            <ColorArea
                                colorSpace="hsb"
                                xChannel="saturation"
                                yChannel="brightness"
                                className="h-40 w-full rounded-md"
                            >
                                <ColorThumb className={thumbClass} />
                            </ColorArea>

                            <ColorSlider colorSpace="hsb" channel="hue" aria-label="Hue">
                                <SliderTrack className="h-6 rounded-md">
                                    <ColorThumb className={cn(thumbClass, 'top-1/2')} />
                                </SliderTrack>
                            </ColorSlider>

                            <ColorField aria-label="Hex color">
                                <Input className="h-8 w-full rounded-md border border-gray-300 px-2 text-sm uppercase" />
                            </ColorField>

                            <ColorSwatchPicker className="flex flex-wrap gap-2" aria-label="Preset colors">
                                {swatches.map(swatch => (
                                    <ColorSwatchPickerItem
                                        key={swatch}
                                        color={swatch}
                                        className={cn(
                                            'cursor-pointer rounded-md outline-none',
                                            'data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-teal-900',
                                            'data-selected:outline-2 data-selected:outline-offset-2 data-selected:outline-black',
                                        )}
                                    >
                                        <ColorSwatch className="size-6 rounded-md" />
                                    </ColorSwatchPickerItem>
                                ))}
                            </ColorSwatchPicker>
                        </div>
                    </ColorPicker>
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
    );
}
