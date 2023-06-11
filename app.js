const express = require('express')
const axios = require('axios')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));


app.post('/register', (req, res) => {
    let isTaken = false
    axios.get('firebaseurl').then(r => {
        for (key in r.data) {
            if (r.data[key].username === req.body.username) {
                isTaken = true
            }
        }

        if (isTaken) {
            return res.status(409).send({
                message: 'Already Taken!'
            });
        }

        axios.post('firebaseurl', {
            username: req.body.username,
            password: req.body.password
        })

        res.status(200).send({
            message: 'succeed'
        })
    })
})

app.post('/login', (req, res) => {
    axios.get('firebaseurl').then(r => {
        for (key in r.data) {
            if (r.data[key].username === req.body.username) {
                if (r.data[key].password === req.body.password) {
                    res.status(200).send({
                        message: 'succeed'
                    })
                }
                else {
                    res.status(401).send({
                        message: 'wrong data'
                    })
                }
            }
            else {
                res.status(401).send({
                    message: 'wrong data'
                })
            }
        }
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
