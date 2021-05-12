import express from 'express';
import puppeteer from 'puppeteer';

const app = express();

const cors = function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app
.use(cors)
.get('/login/', (req, res) => {
    res.send('surkovaes');
})
.get('/test/', async (req, res) => {
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.goto(req.query.URL);
    await page.click('#bt');
    const input = await page.$('#inp');
    let value = await page.evaluate(inp => inp.value, input);
    res.send(value);
})
.use((req, res) => {
    res.send('surkovaes');
});

app.listen(process.env.PORT);
