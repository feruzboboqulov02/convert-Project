const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = process.env.EXCHANGE_API || 'https://api.exchangerate.host';

router.get('/convert-currency', async(req,res)=>{
    const {from, to, amount} = req.query;

    if(!from || !to || !amount){
        return res.status(400).json({error: 'Missing required parameters'});
    }

     try {
        const response = await axios.get(`${BASE_URL}/convert`, {
      params: { from, to, amount }
    });
    const result = response.data.result;
    return res.json({result});
        
     } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
        res.status(500).json({error: 'Internal server error'});
     }

    })
    module.exports = router;