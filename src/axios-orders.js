import axios from 'axios'

const instance = axios.create({
    baseURL:'https://burger-f655a.firebaseio.com/'
})

export default instance