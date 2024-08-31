require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
const router = express.Router();




async function generateText(prompt) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response;
};

router.post('/', async (req, res) => {

    const { prompt } = req.body;

    if (!prompt) {
        res.status(400).send('Please provide a prompt');
        return;
    }

    try {
        const response = await generateText(prompt);
        res.json({ response });
    } catch (error) {
        console.error('Error communicating with gemini:', error.response ? error.response.data : error.message);
        res.status(500).send('Error communicating with gemini:', error.response ? error.response.data : error.message);
    }
});


module.exports = router;