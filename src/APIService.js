import axios from 'axios';
const API_URL = process.env.VUE_APP_API_URL;

export class APIService {

    constructor() {
    }

    getProducts() {
        const url = `${API_URL}/products`;
        return axios.get(url).then(response => response);
    }

    postLogin(email, password) {
        const url = `${API_URL}/login`;
        let _response =  axios.post(url, { email, password })
            .then(response => 
                _response = response
            )
            .catch(error => 
                _response = error.response

            );
        return _response;
    }
    
    postProducto(token, name, description, image, price, quantity) {
        const url = `${API_URL}/products`;
        let _response =  axios.post(url, { token, name, description, image, price, quantity })
            .then(response => 
                _response = response
            )
            .catch(error => 
                _response = error.response

            );
        return _response;
    }
    
    getSearchProducts(text, name, description) {
        const url = `${API_URL}/products/search?text=${text}&name=${name}&description=${description}`;
        return axios.get(url).then(response => response);
    }

}