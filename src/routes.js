import { Database } from "./database.js"
import {randomUUID} from 'node:crypto'
import {buildRoutePath} from "./utils/build-route-path.js"
let db = new Database

export const routes = [
    {
        method: 'GET',
        url: buildRoutePath('/users'),
        handler: (req, res) => {
            const searchParams = req.searchParams ? req.searchParams : null
            let users = db.select('users', searchParams)
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
    },
    {
        method: 'PUT',
        url: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const {id} = req.params
            const data = req.body

            db.update('users', id, data)
            
            return res.writeHead(204).end()
        }
    }
]