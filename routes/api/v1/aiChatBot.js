require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');


router.post('/', async (req, res) => {

    const userMessage = req.body.message;
    

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: userMessage }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const aiMessage = response.data.choices[0].message.content;

        res.json({ message: aiMessage });

    } catch (error) {
        console.error('Error communicating with OpenAI API:', error.response ? error.response.data : error.message);

        res.status(500).json({ error: 'Error communicating with OpenAI API' });
    }

    
});


module.exports = router;