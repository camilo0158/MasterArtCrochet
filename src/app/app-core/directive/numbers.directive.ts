import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[appNumbersOnly]'
})
export class NumbersDirective {
    constructor(readonly elementRef: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event: any) {
        this.validateValue(event);
    }

    @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
        this.validateValue(event);
    }

    validateValue(event: any) {
        const initalValue = this.elementRef.nativeElement.value;
        this.elementRef.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        if (initalValue !== this.elementRef.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
