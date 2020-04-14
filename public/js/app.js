//console.log('Client side javascript on')




const form = document.getElementById('form')
const namepara = document.getElementById('m1')
namepara.textContent = ''


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