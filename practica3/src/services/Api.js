import axios from 'axios';

//En esta clase se usa axios para establecer la conexion con el servidor
export default() =>{

    return axios.create({
        baseURL: `http://localhost:3000`
    })

}
