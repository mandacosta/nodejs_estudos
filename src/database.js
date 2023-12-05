import fs from 'node:fs/promises'
// Existe o fs/promises (aceita trabalhar com async/await, then/catch) e o fs (só trabalha com callbacks)
// fs/promisses não trabalha com streams !! Não é possivel ler/escrever arquivos por partes com esse módulo

let {pathname} = new URL('db.json', import.meta.url)
// O primeiro parâmetro serve como uma navegação nas pastas, tipo ../ ./ etc.
// _dirname _filename não existem mais no ES6 trabalhando com type module


export class Database{
    #database = {}

    constructor(){
        fs.readFile(pathname, 'utf8').then((data) => {
            return this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist(){
        fs.writeFile(pathname, JSON.stringify(this.#database))
    }

    select(table, searchParams=null){
        const data = this.#database[table] ?? []

        let filter = data.filter((row) => {
            console.log("row", row)
            
            for(let key in searchParams){
                console.log("value", searchParams[key])
                return row[key].toLowerCase().includes(searchParams[key].toLowerCase())
            }
        })

        if(!searchParams || !filter.length){
            return data
        }

        return filter
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }

    delete(table, id){
        const index = this.#database[table].findIndex(user=> user.id == id)

        if(index > -1){
            this.#database[table].splice(index, 1)
            this.#persist()
        }
    }

    update(table, id, data){
        const index = this.#database[table].findIndex(user=> user.id == id)

        if(index > -1){
            this.#database[table][index] = {id, ...data}
            this.#persist()
        }
    }
}