import http from "node:http"
import { Transform } from 'node:stream'

class StreamInverteNumero extends Transform {
    _transform(chunk, enconding, callback){
        const inverted = Number(chunk.toString()) * -1

        console.log(inverted)
        callback(null, Buffer.from(String(inverted)))
    }
}

const server = http.createServer(async(req, res) => {
    // Lendo o conteúdo em etapas e processando
    // return req.pipe(new StreamInverteNumero()).pipe(res)

    // Esperando todo o conteúdo ser recebido com o await
    let buffers = []

    for await (const chunk of req){
        buffers.push(chunk)
    }

    const conteudoCompleto = Buffer.concat(buffers).toString()

    console.log(conteudoCompleto)

    return res.end(conteudoCompleto)

})

server.listen(3000)