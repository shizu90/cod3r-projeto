import dotenv from 'dotenv'
import passport from 'passport'
import passportJwt, { ExtractJwt, Strategy } from 'passport-jwt'

dotenv.config()
const secret = process.env.AUTH_SECRET

export default function passportAuth(app) {
    const params = {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('users')
        .where({id: payload.id})
        .first()
        .then(user => done(null, user ? {...payload} : false))
        .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }

}