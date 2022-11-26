import express from 'express'
import { resolve } from 'path'

const app = express();
app.use('/',
    express.static(
        resolve(
            './dist'
        )
    )
)

app.listen(5137, () => { console.log('React running'); })