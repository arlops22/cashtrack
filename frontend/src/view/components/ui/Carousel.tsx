import { useCallback, useEffect, useState, type ComponentProps, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';

import { cn } from '../../../app/utils/cn';

import Button from '../Button';

type CarouselApi = UseEmblaCarouselType[1];

type TProps = {
    selectedIndex?: number;
};

export function Carousel({ className, children, selectedIndex = 0 }: ComponentProps<'div'> & TProps) {
    const [startIndex] = useState(selectedIndex);

    const [carouselRef, api] = useEmblaCarousel({
        axis: 'x',
        align: 'center',
        containScroll: false,
        startIndex,
    });
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((api: CarouselApi) => {
        if (!api) return;
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = useCallback(() => {
        api?.scrollPrev();
    }, [api]);

    const scrollNext = useCallback(() => {
        api?.scrollNext();
    }, [api]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                scrollPrev();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                scrollNext();
            }
        },
        [scrollPrev, scrollNext],
    );

    useEffect(() => {
        if (!api) return;

        onSelect(api);
        api.on('reInit', onSelect);
        api.on('select', onSelect);

        return () => {
            api?.off('select', onSelect);
        };
    }, [api, onSelect]);

    useEffect(() => {
        if (!api) return;

        api.scrollTo(selectedIndex);
    }, [api, selectedIndex]);

    return (
        <div
            onKeyDownCapture={handleKeyDown}
            className={cn('relative', className)}
            role="region"
            aria-roledescription="carousel"
            data-slot="carousel"
        >
            <div ref={carouselRef} className="overflow-hidden mx-10" data-slot="carousel-content">
                <div className="flex -ml-4">{children}</div>
            </div>
            <Button
                data-slot="carousel-previous"
                variant="ghost"
                size="icon"
                color="secondary"
                className="absolute touch-manipulation inset-y-0 left-0 my-auto"
                disabled={!canScrollPrev}
                onClick={scrollPrev}
            >
                <ChevronLeft className="cn-rtl-flip" />
                <span className="sr-only">Previous slide</span>
            </Button>
            <Button
                data-slot="carousel-next"
                variant="ghost"
                size="icon"
                color="secondary"
                className="absolute touch-manipulation inset-y-0 right-0 my-auto"
                disabled={!canScrollNext}
                onClick={scrollNext}
            >
                <ChevronRight className="cn-rtl-flip" />
                <span className="sr-only">Next slide</span>
            </Button>
        </div>
    );
}
