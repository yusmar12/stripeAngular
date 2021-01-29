import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypalElemt', { static: true }) paypalElement: ElementRef;

  constructor() { }

  ngOnInit(): void {
     paypal
        .Buttons({
          style: {
            color: "blue",
            shape: "pill",
            label: "pay",
            height: 40,
            layout: "horizontal",
          },
          // Set up the transaction
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "Compra",
                  amount: {
                    value: '0.01',
                  },
                },
              ],
            });
          },
// 
          // Finalize the transaction
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              console.log("Do it successfully");
            });
          },
        })
        .render(this.paypalElement.nativeElement);
  }
}
