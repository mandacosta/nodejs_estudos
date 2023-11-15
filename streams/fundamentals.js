import { Readable, Writable, Transform, Duplex } from 'node:stream'

// Nesse caso, tudo que entrar via linha de comando no terminal, vai ser devolvido
// process.stdin.pipe(process.stdout)

class StreamUmACem extends Readable {
    index = 1
    _read(){
        const i = this.index++

        setTimeout(() => {

            if(i > 100){
                this.push(null)
            }else{
                const buffer = Buffer.from(String(i))
                this.push(buffer)

            }
        }, 500)
    }
}

class StreamMultiplicaPorDez extends Writable {
    _write(chunk, enconding, callback){
        console.log(Number(chunk.toString())*10)
        // Se eu não chamo a callback, a execução para na primeira vez.
        callback()
    }
}

class StreamInverteNumero extends Transform {
    _transform(chunk, enconding, callback){
        const inverted = Number(chunk.toString()) * -1

        // O primeiro parâmetro é um erro, caso exista
        // callback(new Error('Invalid Number'), Buffer.from(inverted))

        callback(null, Buffer.from(String(inverted)))
    }
}


class StremCopiaEAdicionaTamanho extends Duplex {
   constructor(options) {
       super(options);
       this.stdin = process.stdin;
       this.stdin.setEncoding('utf8');
       this.stdin.resume();
   }

   _read(size) {
       this.stdin.on('data', (chunk) => {
           const word = chunk.toString().trim();
           const len = word.length;
           const buf = `${word} tem ${len} letra(s)`;
           if(word == 'pare'){
            this.push(null)
           }else{
               this.push(Buffer.from(buf));

           }
       });
   }

   _write(chunk, encoding, callback){
       console.log(chunk.toString());
       callback();
   }
}

// Não preciso esperar todos os dados de "i" serem lidos para então mostrar na tela
// Com as streams eu posso manipular assim que eu tiver parte do dado

// new StreamUmACem() // Leitura
// .pipe(new StreamInverteNumero()) // Transformação
// .pipe(new StreamMultiplicaPorDez()) // Escrita

// new StremCopiaEAdicionaTamanho().pipe(new StremCopiaEAdicionaTamanho())