import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-myburger-a81d8.firebaseio.com/'
});

export default instance