import express from 'express'
import cors from 'cors'
import 'dotenv/config'

//Initialize Express
const app = express()

//Port
const port = 3000



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})