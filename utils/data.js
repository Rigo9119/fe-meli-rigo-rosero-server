import axios from 'axios'

const baseUrl = 'https://api.mercadolibre.com/sites/MLA';
const itemUrl = 'https://api.mercadolibre.com/items';

async function getItems(query) {
    try {
        const res = await axios.get(`${baseUrl}/search?q=${query}`);

        return res.data;
    } catch (err) {
        return `error 🐍::==> ${err}`;
    }
}

async function getItem(itemId) {
    try {
        const res = await axios.get(`${itemUrl}/${itemId}`);
        
        return res.data
    } catch (err) {
        return `error 🏗️::==> ${err}`;
    }
}

async function getItemDescription(itemId) {
    try {
        const res = await axios.get(`${itemUrl}/${itemId}/description`);
        
        return res.data
    } catch (err) {
        return `error 🏗️::==> ${err}`;
    }
}

export { getItems, getItem, getItemDescription }
