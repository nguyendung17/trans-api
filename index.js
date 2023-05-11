const { translate } = require('./google-translate-api/dist/cjs/index');
 

const express = require('express')
const app = express()
const port = 3000

app.get('/',async (req, res) => {
    try {
        if(!req.query.lang || !req.query.text){
            res.status(500);
            res.send("err")
            return 
        }
        const { text } = await translate(req.query.text, { to: req.query.lang });
        console.log(text) // => 'Hello World! How are you?'
        res.send(text)
    } catch (error) {
        res.status(500);
        console.log(error);
    }
   
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})