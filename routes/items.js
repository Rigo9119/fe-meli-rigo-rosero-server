import express from 'express';
import { getItems, getItem } from '../utils/data.js'

const router = express.Router();

const items = []; 
const item = []

getItem('MLA910190287').then(res => item.push(res));

// la descripcion del objeto sale de la key plain_text

router.get('/', (req, res) => {
    res.send('index api test mercado libre');
})

router.get('/search', (req, res) => {
    const { q } = req.query.q; 

    getItems(q).then(res => items.push(res));

    const mainListItems = items.map((item) => {
        const listItemObj = {
            author: {
                name: 'Rigo',
                last_name: 'Rosero '
            },
            categories: item.filters.map(filter => filter.values.map(value => value.name)[0]),
            items: item.results.slice(0, 4)
        };

        return listItemObj;
    })

    res.send(mainListItems);
})

router.get('/:id', (req, res) => {
    const { id } = req.params.id;
    const limitItems = [...items[0].results].slice(0, 4);
    const findItem = items.find((item) => item.id === id);
    const itemArr = limitItems.map(item => {
        const itemObj = {
            author: {
                name: 'Rigo',
                last_name: 'Rosero '
            },
            item : {
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: item.price
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
                sold_quantity: item.sold_quantity,
            }            
        }

        return itemObj
    })

    res.send(itemArr);
})

router.get('/:id/description', (req, res) => {
    const { id } = req.params.id;
    const limitItems = [...items[0].results].slice(0, 4);
    const findItem = items.find((item) => item.id === id);
    const itemArr = limitItems.map(item => {
        const itemObj = {
            author: {
                name: 'Rigo',
                last_name: 'Rosero '
            },
            item : {
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: item.price
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
                sold_quantity: item.sold_quantity,
            }            
        }

        return itemObj
    })

    res.send(itemArr);    
})


export default router;
