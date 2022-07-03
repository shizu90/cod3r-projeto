import mongoose from 'mongoose'

export const Stat = mongoose.model('Stat', {
    users: Number,
    categories: Number,
    articles: Number,
    createdAt: Date
})


export default function stats() {
    const getStat = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt': -1 }})
        .then(stat => {
            const defaultStat = {
                users: 0,
                categories: 0,
                articles: 0
            }
        
            res.json(stat || defaultStat)
        })
    }

    return { 
        getStat
    }
}