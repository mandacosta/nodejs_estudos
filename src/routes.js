import { Database } from "./database.js"
import {randomUUID} from 'node:crypto'
let db = new Database

export const routes = [
    {
        method: 'GET',
        url: '/users',
        handler: (req, res) => {
            let users = db.select('users')
            return res.end(JSON.stringify(users))

        }
    },
    {
        method: 'POST',
        url: '/users',
        handler: (req, res) => {
            let {name, email} = req.body
            db.insert('users', {id: randomUUID(), name, email})
    
            return res.writeHead(201).end()

        }
    }
]