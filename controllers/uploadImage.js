const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64Data = reader.result;
        // Store or send the base64Data to the server
    };
    reader.readAsDataURL(file);
};

const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const mongoURI = 'mongodb://localhost:27017/mydatabase';

app.post('/upload', (req, res) => {
    const base64Data = req.body.image;
    const client = new MongoClient(mongoURI, { useNewUrlParser: true });

    client.connect((err) => {
        if (err) {
            console.error('Failed to connect to the database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const db = client.db('mydatabase');
        const collection = db.collection('images');

        collection.insertOne({ image: base64Data }, (err) => {
            if (err) {
                console.error('Failed to save the image:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send('Image uploaded successfully');
            }

            client.close();
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
