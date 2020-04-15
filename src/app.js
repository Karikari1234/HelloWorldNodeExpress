const express = require('express')
const path = require('path')
const request = require('request')




const app = express()
// console.log(__filename)
const publicDirectoryPath = path.join(__dirname, '../public')
// console.log(publicDirectoryPath)
const port = process.env.PORT || 3000



const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Dhaka.json?access_token=pk.eyJ1IjoibmFhZml6NDciLCJhIjoiY2s5MHkwb2tjMDZ4czNxdGozbHV4dmFwbyJ9.64AtTt7EFUh1IAaUw_A4GQ'

var geolocationurl = 'https://api.snoopi.io/'
request({
    url: 'https://api.ipgeolocation.io/getip',
    json: true
}, (error, response) => {
    if (response.body.ip) {
        geolocationurl = geolocationurl + response.body.ip
    } else
        geolocationurl = ''
})

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
            age: parseInt(req.query.name.charCodeAt(0) * 5 / 10)
        })
    else
        res.send('No')
})

app.get('/location', (req, res) => {
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (response.body.features) res.send({
            message: response.body.features[0].place_name
        })
        else res.send({
            message: '!'
        })
    })

})

app.get('/weather', (req, res) => {
    if (geolocationurl != '')
        request({
            url: geolocationurl,
            json: true
        }, (error, response) => {
            console.log(response)
            if (response) {
                res.send({
                    state: response.body.State,
                    city: response.body.City,
                    country: response.body.CountryName
                })
            } else res.send({
                ip: 'not found'
            })
        })
})


app.listen(port, () => console.log('Server up and running'))