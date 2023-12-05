// ?name=amanda&id=1
export function extractQueryParams (query){
    query = query.substring(1).split("&")

    let queryParams = query.reduce((acc, act) => {
        const [key, value] = act.split("=")
        acc[key] = value

        return acc

    }, {})

    return queryParams

}