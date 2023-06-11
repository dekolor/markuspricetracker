# markuspricetracker
A price tracker for Ikea's iconic chair: Markus.

### How does it work?
It sends a discord webhook whenever the product's price changes (checks every 5 seconds). Simply just put your webhook URL in the **hook** variable and run the script.

It *should* also work with any product on the Ikea's website, but i only tested it on the .ro website and with the Markus chair anyway. Your mileage may vary.

### Great, how do i install/run this?
1. Clone the repo
2. Run `npm install`
3. Run `node main.js`
4. Done!

You can also run this in the background by using something like [pm2](https://github.com/Unitech/pm2) or [nodemon](https://github.com/remy/nodemon).

![god's throne](https://www.ikea.com/ro/ro/images/products/markus-scaun-rotativ-vissle-gri-inchis__0724714_pe734597_s5.jpg?f=xl)
