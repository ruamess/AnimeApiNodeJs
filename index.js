const express = require('express')
require('dotenv').config()
const sequelize = require('./db')
const router = require('./router/router')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json({ limit: '100000mb' }))

app.use(cors())
app.use(express.json())
app.use('/', router)


const start = async () => {
    try {
        await sequelize.authenticate(),
            await sequelize.sync(),
            app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
    } catch (e) {
        console.log(e)

    }
}


start()






