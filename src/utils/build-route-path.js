
//'/users/:id'
export function buildRoutePath (path){
    // Tentar encontrar na rota tudo que começa com "dois pontos"
    // seguido de letras maiúsculas e/ou minúsculas
    // Os parenteses servem para criar nomes de grupos
    const routeParametersRegex = /:([a-zA-Z]+)/g

    // Encontrar na URL todos os parâmetros dinâmicos e substituir por outra regex
    // Para que no final a url consiga encontrar um match com qualquer valor sendo passado no caminho
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}`)

    
    // console.log(Array.from(path.matchAll(routeParametersRegex)))

    // Faço a url da rota ser um regex no qual eu posso usar o test para comparar o que está vindo na requisição
    return pathRegex

}