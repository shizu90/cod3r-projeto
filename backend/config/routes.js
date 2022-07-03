import user from "../api/user.js"
import category from "../api/category.js"
import article from "../api/articles.js"
import auth from "../api/auth.js"
import passportAuth from "./passport.js"
import authAdmin from "./admin.js"
import stats from "../api/stat.js"

export default function routes(app){
    const {saveUser, getUsers, getUserById, removeUser} = user(app)
    const {saveCategory, removeCategory, getCategories, getById, getCategoryTree} = category(app)
    const {saveArticle, removeArticle, getArticles, getArticleById, getByCategory} = article(app)
    const {getStat} = stats()
    const {signin, validateToken} = auth(app)
    const {authenticate} = passportAuth(app)

    app.post('/signup', saveUser)
    app.post('/signin', signin)
    app.post('/validateToken', validateToken)

    app.route('/users')
    .all(authenticate())
    .post(authAdmin(saveUser))
    .get(authAdmin(getUsers))

    app.route('/users/:id')
    .all(authenticate())
    .put(authAdmin(saveUser))
    .get(authAdmin(getUserById))
    .delete(authAdmin(removeUser))

    app.route('/categories')
    .all(authenticate())
    .get(authAdmin(getCategories))
    .post(authAdmin(saveCategory))

    app.route('/categories/tree')
    .all(authenticate())
    .get(getCategoryTree)

    app.route('/categories/:id')
    .all(authenticate())
    .get(getById)
    .put(authAdmin(saveCategory))
    .delete(authAdmin(removeCategory))

    app.route('/articles')
    .all(authenticate())
    .get(authAdmin(getArticles))
    .post(authAdmin(saveArticle))

    app.route('/articles/:id')
    .all(authenticate())
    .get(getArticleById)
    .put(authAdmin(saveArticle))
    .delete(authAdmin(removeArticle))
    
    app.route('/categories/:id/articles')
    .all(authenticate())
    .get(getByCategory)

    app.route('/stats')
    .all(authenticate())
    .get(getStat)

}