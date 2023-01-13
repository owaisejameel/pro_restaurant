import * as url from '../config/index.dev';
import * as type from '../../utils/Constants';

export default class Api {

    static createCartAPI(action) {

        const create_cart_url = url.BASE_URL + `api/v1/carts?user_id=${action.id}`;
        return fetch(create_cart_url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => {
                console.log('create cart JSON data====================== >>>>>>>>>>>>>>>>>>>>>>>> ', data)
                return data;
            })
            .catch((e) => {
                console.log('JSON error======================', e)
                throw e;
            });
    }

    static addToCartAPI(action) {

        const add_to_cart_url = url.BASE_URL + `api/v1/line_items?cart_id=${action.cart_id}&item_id=${action.item_id}`;
        return fetch(add_to_cart_url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => {
                console.log('add to cart JSON data====================== >>>>>>>>>>>>>>>>>>>>>>>> ', data)
                return data;
            })
            .catch((e) => {
                console.log('JSON error======================', e)
                throw e;
            });
    }

    static getCartItemsAPI(action) {

        const get_cart_items_url = url.BASE_URL + `api/v1/carts/${action.id}`;
        return fetch(get_cart_items_url, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => {
                console.log('add to cart JSON data====================== >>>>>>>>>>>>>>>>>>>>>>>> ', data)
                return data;
            })
            .catch((e) => {
                console.log('JSON error======================', e)
                throw e;
            });
    }

    static reduceCartItemAPI(action) {

        const reduce_cart_item_url = url.BASE_URL + `api/v1/line_items/${action.id}/reduce`;
        return fetch(reduce_cart_item_url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => {
                console.log('reduce cart item JSON data====================== >>>>>>>>>>>>>>>>>>>>>>>> ', data)
                return data;
            })
            .catch((e) => {
                console.log('JSON error======================', e)
                throw e;
            });
    }

    static increaseCartItemAPI(action) {

        const increase_cart_item_url = url.BASE_URL + `api/v1/line_items/${action.id}/add`;
        return fetch(increase_cart_item_url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => {
                console.log('increase cart item JSON data====================== >>>>>>>>>>>>>>>>>>>>>>>> ', data)
                return data;
            })
            .catch((e) => {
                console.log('JSON error======================', e)
                throw e;
            });
    }

    static removeCartItemAPI(action) {

        const remove_cart_item_url = url.BASE_URL + `api/v1/line_items/${action.id}`;
        return fetch(remove_cart_item_url, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => {
                console.log('remove cart item JSON data====================== >>>>>>>>>>>>>>>>>>>>>>>> ', data)
                return data;
            })
            .catch((e) => {
                console.log('JSON error======================', e)
                throw e;
            });
    }

    static createOrder(action) {
        console.log("Action ==>", action)
        const create_order_url = url.BASE_URL + `api/v1/payments/create_order`;
        return fetch(create_order_url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action)
        })
            .then(res => res.json())
            .then((data) => {
                return data;
            })
            .catch((e) => {
                throw e;
            });
    }

    static orderList(action) {
        const order_list_url = url.BASE_URL + `/api/v1/payments/?user_id=${action.user_id}`;
        return fetch(order_list_url, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => {
                console.log('orderList====================== >>>>>>>>>>>>>>>>>>>>>>>> ', data)
                return data;
            })
            .catch((e) => {
                console.log('JSON error======================', e)
                throw e;
            });
    }

}


