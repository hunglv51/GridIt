import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: "[selecting-cell]",
})

export class CellDirective{
    constructor(public viewContainerRef: ViewContainerRef){};

    
}
