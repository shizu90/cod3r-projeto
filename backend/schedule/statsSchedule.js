import schedule from 'node-schedule'
import { Stat } from '../api/stat.js'

export default function statsSchedule(app) {    
    schedule.scheduleJob('*/1 * * * *', async function () {
        const userCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()

        const lastStat = await Stat.findOne({}, {}, { sort: { 'createdAt': -1 } })
        const stat = new Stat({
            users: userCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles

        if(changeUsers || changeCategories || changeArticles) {
            stat.save().then(() => console.log('[Stats] Estatísticas atualizada!'))
        }
    })
}