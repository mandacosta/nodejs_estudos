import { Readable } from 'node:stream'

class StreamUmACem extends Readable {
    index = 1
    _read(){
        const i = this.index++

        setTimeout(() => {

            if(i > 5){
                this.push(null)
            }else{
                const buffer = Buffer.from(String(i))
                this.push(buffer)

            }
        }, 500)
    }
}

fetch('http://localhost:3000', {
    method: "POST",
    body: new StreamUmACem()
}).then((resp) => {
    return resp.text()
}).then((resp) => {
    console.log(resp)
})