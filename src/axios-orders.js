import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burger-41272.firebaseio.com/'
});

export default instance;