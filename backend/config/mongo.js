import mongoose from 'mongoose'

export default function connectMongo(){
    mongoose.connect('mongodb://localhost/mongodb_coder', {
    useNewUrlParser: true
    }).catch(e => {
        const msg = 'ERRO! Não foi possível conectar ao MongoDB!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })
}