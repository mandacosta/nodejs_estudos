import { Database } from "./database.js"
import {randomUUID} from 'node:crypto'
import {buildRoutePath} from "./utils/build-route-path.js"
let db = new Database

export const routes = [
    {
        method: 'GET',
        url: buildRoutePath('/users'),
        handler: (req, res) => {
            let users = db.select('users')
            return res.end(JSON.stringify(users))

        }
    },
    {
        method: 'POST',
        url: buildRoutePath('/users'),
        handler: (req, res) => {
            let {name, email} = req.body
            db.insert('users', {id: randomUUID(), name, email})
    
            return res.writeHead(201).end()

        }
    },
    {
        method: 'DELETE',
        url: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const {id} = req.params

            db.delete('users', id)
            
            return res.writeHead(204).end()
        }
    }
]