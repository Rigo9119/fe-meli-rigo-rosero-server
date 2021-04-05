import axios from 'axios'

const baseUrl = 'https://api.mercadolibre.com/sites/MLA';
const itemsUrl = 'https://api.mercadolibre.com/items/'

async function getItems(query) {
    try {
        const res = await axios.get(`${baseUrl}/search?q=${query}`);

        return res.data;
    } catch (err) {
        return `error ::==> ${err}`;
    }
}

async function getItem(itemId) {
    try {
        const itemRes = await axios.get(`${itemsUrl}/${itemId}`);
        const itemDescriptionRes = await axios.get(`${itemsUrl}/${id}/description`);

        return {
            itemNoDesc: itemRes.data,
            itemDesc: itemDescriptionRes.data
        };

    } catch (err) {
        return `error ::==> ${err}`;
    }
}

export { getItems, getItem }
