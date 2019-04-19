const express = require('express');
const nonce = require('nonce');
const app = express();

const forwardingAddress = 'https://6f26722e.ngrok.io';
const apiKey = '4efc1f884b4330b727597b593913a32a';
const scopes = 'write_orders,read_customers';

app.listen(3000, () => console.log('Example app listening on port 3000!'));

console.log('hey ho');
app.get('/shopify', (req, res) => {
    const shop = req.query.shop;
    console.log(shop);

    if (shop) {
        const state = nonce();
        const redirectUri = forwardingAddress + '/shopify/callback';
        console.log(redirectUri);
        const installUrl = 'https://' + shop +
            '/admin/oauth/authorize?client_id=' + apiKey +
            '&scope=' + scopes +
            '&state=' + state +
            '&redirect_uri=' + redirectUri;

        res.cookie('state', state);
        console.log('Marta');
        res.redirect(installUrl);
    } else {
        return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
    }
});

