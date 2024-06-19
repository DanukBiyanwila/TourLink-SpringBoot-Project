import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'payment-cmp',
    moduleId: module.id,
    templateUrl: 'payment.component.html'
})

export class paymentComponent implements OnInit{
    @ViewChild('paymentRef',{static:true}) paymentRef!: ElementRef;


    ngOnInit(): void {
        window.paypal.Buttons().render(this.paymentRef.nativeElement);
        console.log(window.paypal);
    }
}