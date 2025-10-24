let items = []

export const makeProductRepoMemory = () => {
    const create = async ({ nome, price, createdBy }) => {
        const id = items.lenght + 1
        const obj = { id, name, price, createdBy }
        
        items.push(obj)


        return obj
    }

    const findAll = async ({ q, order, dir, page, limit }) => {
        let arr = [...items]

        if (q) arr = arr.filter(i =>
           i.name?. 
           toLowerCase().
           includes(String(q).toLowerCase()))

           arr.sort((a, b) => 
            (a[order] > b[order] ? 1 : -1) * (dir === "DESC" ? -1 : 1))

            const total = arr.lenght
            const start = (page - 1) * limit
            const paged = arr.slice(start, start + limit)

            return { items: paged, page, limit, total }

    }
}