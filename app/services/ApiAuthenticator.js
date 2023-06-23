import axios from "axios";

export default class ApiAuthenticator{
    constructor(){
        this.BASE_URL="http://localhost:8000";
        this.API_URL_BASE="/rest/v1";
        this.SANCTUM_COOKIE="/sanctum/csrf-cookie";

        this.axiosInstance = axios.create({
            baseURL: this.BASE_URL,
            withCredentials: true,
        });
    }

    registerClient(clientData){
        const END_POINT = "/register";
        const url = this.BASE_URL+this.API_URL_BASE+END_POINT;

        return this.axiosInstance.get(this.BASE_URL+this.SANCTUM_COOKIE).then( response =>{
            return this.axiosInstance.post(url, clientData).then( response => {
                return response;
            }).catch(error => {
                throw error;
            })
        });
    }

    loginClient(clientCredentials){
        const END_POINT="/login";
        const url = this.BASE_URL+this.API_URL_BASE+END_POINT;

        return this.axiosInstance.get(this.BASE_URL+this.SANCTUM_COOKIE).then( response => {
            return this.axiosInstance.post(url, clientCredentials).then( response => {
                return response;
            }).catch(error => {
                throw error;
            })
        });
    }
}