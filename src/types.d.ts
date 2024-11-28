interface IDish {
    title: string;
    price: number;
    image: string;
}


interface IDishAPI {
    [id: string]: IDish
}


interface IDishes extends IDish {
    id: string;
}


interface IOrder {
    title: string;
    price: number;
    image: string;
}


interface IOrderAPI {
    [id: string]: {[id: string] : number}
}

interface IOrderCart {
    [id: string]: number;
}

interface  IOrders {
    order: {
        dish:  IDish;
        amount: number;
    }[],
    order_id: string;
    total: number;
}