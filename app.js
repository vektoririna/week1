import pug from 'pug';

export default (express, bodyParser, createReadStream, writeFileSync, crypto, http, m, User, puppeteer) => {
    const app = express();
    const urlencodedParser = bodyParser.urlencoded({ extended: false });
    const json_parser = bodyParser.json();

    app
    .use((r, res, next) => r.res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS,DELETE"}) && next())
    .use(bodyParser.urlencoded({ extended: true }))
    .all('/req/', (req, res) => {
        const addr = req.method === 'POST' ? req.body.addr : req.query.addr;

        http.get(addr, (r, b = '') => {
            r
            .on('data', d => b += d)
            .on('end', () => res.send(b));
        });
    })
    .get('/login/', (req, res) => res.send('sorokina_irina'))
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res))
    .get('/sha1/:input/', (req, res) => res.send(crypto.createHash('sha1').update(req.params.input).digest('hex')))
    
    .get('/test/', urlencodedParser, async (req, res) => {

        const browser = await puppeteer.launch({args: ['--no-sandbox']});
        const page = await browser.newPage();
        await page.goto(req.query.URL);
        await page.click('#bt');
        const input = await page.$('#inp');
        let value = await page.evaluate(inp => inp.value, input);
        res.send(value);

        res.send(url);
        
    })
    
    .all('/*', r => r.res.send('sorokina_irina'));

    return app;
}
