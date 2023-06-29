import Head from "next/head";
import { CustomH1, CustomH3 } from "../components/utils/utils";

export default function StoredBook(){
    return(
        <>
            <CustomH1>No hay conexión a internet</CustomH1>
            <CustomH3>Solo podra ver paginas visitadas anteriormente de la aplicación</CustomH3>
        </>
    );
}