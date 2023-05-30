import { Button, Container } from "react-bootstrap";

export default function ButtonExplorer({infoButtons}){
    return(
        <div className="d-flex flex-wrap justify-content-between gap-3">
                {infoButtons.map( info => 
                    <Button key={info.id} variant="dark border border-light">
                        {info.display}
                    </Button>) }
        </div>
    );
}