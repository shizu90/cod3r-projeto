import config from '../knexfile.js'
import knex from 'knex'

knex(config['production']).migrate.latest([config['production']])

export default knex(config['production'])