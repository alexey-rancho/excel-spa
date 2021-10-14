import '@style/app.scss'

document.body.addEventListener('click', (event) => console.log(event.target))
const say = async () => Promise.resolve('it works!!!')

say().then((info) => console.log(info))
