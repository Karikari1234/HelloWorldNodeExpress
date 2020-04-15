const form = document.getElementById('form')
const namepara = document.getElementById('m1')
namepara.textContent = ''

const loc = document.getElementById('loc')

fetch('/weather').then((response) => {
    response.json().then((data) => {
        if (data) loc.textContent = `Your location is ${data.city},${data.state},${data.country}`
        else loc.textContent = 'We can\'t find your location'
    })
})

if (form) form.addEventListener('submit', (e) => {
    e.preventDefault()

    const input = document.getElementById('input')
    const query = input.value

    if (query) fetch('/about?name=' + query).then((response) => {
        response.json().then((data) => {
            namepara.textContent = `Your name is ${data.name} and your age is ${data.age}`
        })
    })
    else namepara.textContent = 'No input given'
})