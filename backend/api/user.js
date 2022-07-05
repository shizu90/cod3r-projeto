import bcrypt from 'bcrypt'
import validation from './validation.js'

export default function user(app){
    const {existsOrError, notExistsOrError, equalsOrError} =  validation()
    
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    const saveUser = async (req, res) => {
        const user = {...req.body}
        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userFromDB = await app.db("users").where({email: user.email}).first()
            if(!user.id) notExistsOrError(userFromDB, 'Usuário já cadastrado')
            
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword
        if(user.id){
            app.db('users')
            .update(user)
            .where({id: user.id})
            .whereNull('deletedAt')
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }else{
            app.db('users')
            .insert(user)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }

    const getUsers = (req, res) => {
        app.db('users')
        .select('id', 'name', 'email', 'admin')
        //.whereNull('deletedAt')
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err))
    }

    const getUserById = (req, res) => {
        app.db('users')
        .select('id', 'name', 'email', 'admin')
        .where({id: req.params.id})
        .whereNull('deletedAt')
        .first()
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err))
    }

    const removeUser = async (req, res) => {
        try {
            const articles = await app.db('articles')
            .where({ userId: req.params.id })
            notExistsOrError(articles, 'Usuário possui artigos')

            const rowsDeleted = await app.db('users')
            .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Usuário não foi encontrado')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { saveUser, getUsers, getUserById, removeUser }
}