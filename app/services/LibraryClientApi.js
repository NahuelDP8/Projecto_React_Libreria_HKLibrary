import axios from "axios";
import LocalRepository from "./LocalRepository";
import AuthCookieManager from "./AuthCookieManager";

export default class LibraryClientApi{
    constructor(){
        this.BASE_URL="https://pixel-pioneers-laravel-git-entregapromocion-pixel-pioneer.vercel.app";
        this.API_URL_BASE="/rest/v1";

        this.localRepository = new LocalRepository();
    }

    getAuthHeader(){
        const token = this.localRepository.getBearerToken();
        return {
            headers:{
                'Authorization': 'Bearer '+token
            }
        }
    }

    registerClient(clientData){
        const END_POINT = "/register";
        const url = this.BASE_URL+this.API_URL_BASE+END_POINT;

        return axios.post(url, clientData).then( response => {
            const token = response.data.data.token;
            this.localRepository.storeBearerToken(token);

            const client = response.data.data.client;
            const clientName = client.nombre +" "+ client.apellido;
            const cookieManager = new AuthCookieManager();
            cookieManager.setAuthCookie(clientName);

            return response;
        }).catch(error => {
            throw error;
        });
    }

    loginClient(clientCredentials){
        const END_POINT="/login";
        const url = this.BASE_URL+this.API_URL_BASE+END_POINT;

        return axios.post(url, clientCredentials).then( response => {
            const token = response.data.data.token;
            this.localRepository.storeBearerToken(token);

            const client = response.data.data.client;
            const clientName = client.nombre +" "+ client.apellido;
            const cookieManager = new AuthCookieManager();
            cookieManager.setAuthCookie(clientName);

            return response;
        }).catch(error => {
            throw error;
        })
    }

    getClientOrders(){
        const END_POINT="/client/pedidos";
        const url = this.BASE_URL+this.API_URL_BASE+END_POINT;

        return axios.get(url, this.getAuthHeader()).then( response => {
            return response;
        }).catch( error => {
            throw error;
        });
        
    }

    buyOrder(orderData){
        const END_POINT="/pedidos";
        const url = this.BASE_URL+this.API_URL_BASE+END_POINT;

        return axios.post(url, orderData, this.getAuthHeader()).then( response => {
            return response;
        }).catch( error => {
            throw error;
        });
    }

    logoutClient(){
        const END_POINT="/logout";
        const url = this.BASE_URL+this.API_URL_BASE+END_POINT;

        return axios.post(url, null, this.getAuthHeader()).then( response => {
            const cookieManager = new AuthCookieManager();
            cookieManager.deleteAuthCookie();

            const localRepository = new LocalRepository();
            localRepository.deleteBearerToken();

            return response;
        }).catch( error => {
            throw error;
        });
    }
}