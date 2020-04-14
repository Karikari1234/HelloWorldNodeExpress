const express = require('express')
const path = require('path')


const app = express()
// console.log(__filename)
const publicDirectoryPath = path.join(__dirname, '../public')
// console.log(publicDirectoryPath)
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')

app.get('', (req, res) => res.render('index', {
    title: "Hello World",
    name: "Naafiz Rahman"
}))

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => res.send({
    name: {
        firstname: 'Karim',
        lastname: 'Khan'
    },
    age: 27
}))



app.get('/about', (req, res) => {
    if (req.query.name)
        res.send({
            name: req.query.name,
            age: req.query.name.length * 5
        })
    else
        res.send('No')
})

app.get('/help', (req, res) => res.send('Help'))

app.get('/weather', (req, res) => res.send('Weather'))


app.listen(port, () => console.log('Server up and running'))