import express from 'express'
import middlewares from './config/middlewares.js'
import db from './config/db.js'
import routes from './config/routes.js'
import connectMongo from './config/mongo.js'
import statsSchedule from './schedule/statsSchedule.js'


const app = express()
connectMongo()
app.db = db

middlewares(app)
statsSchedule(app)
routes(app)

app.get('/health', (req, res) => {
    res.sendStatus(200)
})

app.listen(3000, () => {
    console.log('Servidor executando na porta 3000...')
})