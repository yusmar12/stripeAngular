import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { StripeService } from 'src/app/services/stripe.service';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  cardError: string;
  card: any;
  action: string;
  able: boolean;

  constructor( private ngZone: NgZone,
               private stripeService: StripeService ) {
    this.action = "Pagar";
    this.able = true;
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.onChange.bind(this));
  }

  onChange($event) {
    if($event.error) {
      this.ngZone.run(() => this.cardError = $event.error.message );
    } else {
      this.ngZone.run(() => this.cardError = null );
    }
  }
  async onClick(): Promise<void> {
    this.able = false;
    this.action = "Procesando...";
    const { token, error } = await stripe.createToken(this.card);
    if( token ) {
      const response = await this.stripeService.charge(100, token.id)
      console.log( response );
      this.action = "Éxito!";
      this.able = true;
    } else {
      this.ngZone.run(() => this.cardError = null );
      this.action = "Pagar";
      this.able = true;
    }
  }
}
