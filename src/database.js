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

    select(table){
        const data = this.#database[table] ?? []

        return data
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
}