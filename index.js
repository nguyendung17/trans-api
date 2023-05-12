
const fs = require('fs');
const { translate } = require('bing-translate-api');

const langs = JSON.parse(fs.readFileSync("./lang.json"), "utf-8");

const express = require('express')
const app = express()
const port = 3000
const Cached = {};
async function trans(text, lang) {
    let key = `${text}_${lang}`;
    if( Cached[key] ){
        console.log("Cached");
        return Cached[key];
    } 
    return new Promise((ok, nok) => {
        translate(text, null, lang).then(result => {
            Cached[key] = result;
            ok(result);
        }).catch(err => {
           nok(err);
        });
    })

}

app.get('/', async (req, res) => {
    try {
        let { lang, text } = req.query;
        if (!lang || !text) {
            res.status(500);
            res.send("err")
            return
        }

        if (langs.filter((it) => { return it.code == lang }).length == 0) {
            res.status(500).send("No Support code: " + lang, 500)
            return;
        }

        res.send(await trans(text,lang))


    } catch (error) {
        res.status(500);
        console.log(error);
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})