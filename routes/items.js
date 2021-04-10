import express from 'express';
import { getItems, getItem, getItemDescription } from '../utils/data.js'

const router = express.Router();

let products = {}, item = {}, description = {};

// la descripcion del objeto sale de la key plain_text

router.get('/', (req, res) => {
    res.send('index api test mercado libre');
})

router.get('/search', (req, res) => {
    const query = req.query.query; 

    getItems(query)
        .then(res => products = {...res})
        .catch(err => console.error(` error 🌓 ::=>${err}`));

        const listObj = {
            author: {
                name: 'Rigo',
                last_name: 'Rosero '
            },
            categories: products?.available_filters?.map(
                filter => filter.values?.map(
                    value => value.name
                )
            )[0],
            items: products?.results

        };

    res.send(listObj);
})

router.get('/:id', (req, res) => {
    const id = req.params.id;

    getItem(id)
        .then(res => item = {...res})
        .catch(err => console.error(` error 📫 ::=>${err}`));
    
    getItemDescription(id)
        .then(res => description = {...res})
        .catch(err => console.error(` error 📫 ::=>${err}`));

    const product = {
            author: {
                name: 'Rigo',
                last_name: 'Rosero '
            },
            item : {
                id: item?.id,
                title: item?.title,
                price: {
                    currency: item?.currency_id,
                    amount: item?.price
                },
                picture: item?.thumbnail,
                condition: item?.condition,
                free_shipping: item?.shipping?.free_shipping,
                sold_quantity: item?.sold_quantity,
                description: description?.plain_text,
            }            
        }       

    res.send(product);
})


export default router;
