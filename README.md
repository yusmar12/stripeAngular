# stripePayPalAngular
Integración de pagos mediante PayPal y Stripe en Angular 10

Para el caso de pago mediante PayPal, se integró el botón de PayPal únicamente. Esto se implementó de manera básica y en modo Test.
Para cambiar de Test a live, seguir instrucciones de la documentación de PayPal

Para el caso de pago mediante Stripe, se integraron diversas implementaciones que están divididas en los componentes del proyecto, es decir, cada componente tiene una implementación diferente.
1. Intent-elements. Solo se ocupa el pequeño formulario que proporciona Stripe. El pago se hace mediante PaymentIntent. Esta implementación es llamada: Custom payment flow. Se sugió  esta documentación: https://stripe.com/docs/payments/integration-builder.
2. Elements. De igual manera, solo se ocupa el formulario que propociona Stripe, pero el pago no se realiza mediante PaymenIntent sino mediante una llamada a una API.
3. Stripe. Esta opción redirige a la página alojada en Stripe y prediseñada por la compañía. Las opciones de diseño se pueden personalizar desde su perfil de Stripe. Documentación: https://stripe.com/docs/checkout/integration-builder
4. Intent-element-separated. Para este caso, se deseaba implementar el formulario tomando cada input por separado. Esto daría lugar a una mayor personalización. No obstante, hasta el momento, no funciona. En próximos commits tal vez se subirá esta parte implementada.
