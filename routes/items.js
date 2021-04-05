import express from 'express';
import { getItems, getItem, getItemDescription } from '../utils/data.js'

const router = express.Router();

const items = []; 
const item = []
const description = [];

// la descripcion del objeto sale de la key plain_text

router.get('/', (req, res) => {
    res.send('index api test mercado libre');
})

router.get('/search', (req, res) => {
    const { q } = req.query.q; 
    
    getItems(q)
        .then(res => items.push(res))
        .catch(err => console.error(` error 🌓 ::=>${err}`));

    const mainListItems = items.map((item) => {
        const listItemObj = {
            author: {
                name: 'Rigo',
                last_name: 'Rosero '
            },
            categories: item.filters.map(filter => filter.values.map(value => value.name)[0]),
            items: item.results
        };

        return listItemObj;
    })

    res.send(mainListItems);
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    
    getItem(id)
        .then(res => item.push(res))
        .catch(err => console.error(` error 📫 ::=>${err}`));
    
    getItemDescription(id)
        .then(res => description.push(res))
        .catch(err => console.error(` error 📫 ::=>${err}`));

    const itemArr = item.map(product => {
        const itemObj = {
            author: {
                name: 'Rigo',
                last_name: 'Rosero '
            },
            item : {
                id: product.id,
                title: product.title,
                price: {
                    currency: product.currency_id,
                    amount: product.price
                },
                picture: product.thumbnail,
                condition: product.condition,
                free_shipping: product.shipping.free_shipping,
                sold_quantity: product.sold_quantity,
                description: description[0].plain_text,
            }            
        }

        return itemObj
    })

    res.send(itemArr);
})


export default router;
