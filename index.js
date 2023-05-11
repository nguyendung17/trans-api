const { translate } = require('./google-translate-api/dist/cjs/index');
 

const express = require('express')
const app = express()
const port = 3000

app.get('/',async (req, res) => {
    if(!eq.query.lang || eq.query.text){
        res.send("")
        return 
    }
    const { text } = await translate(req.query.text, { to: req.query.lang });
    console.log(text) // => 'Hello World! How are you?'
    res.send(text)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})