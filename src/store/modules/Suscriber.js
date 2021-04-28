import axios from "axios";
import store from "../index"

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'login/SET_TOKEN':
            if (mutation.payload) {
                localStorage.setItem('blog_token', mutation.payload)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + mutation.payload
            }
            break;
    
        default:
            break;
    }
})