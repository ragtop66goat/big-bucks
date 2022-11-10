import {Button} from "react-bootstrap";

export function Navbar() {
    return <div className="m-3 d-flex justify-content-between">
        <h5>Bucks Navbar</h5>
        <div>
            <Button>Link 1</Button>
            <Button>Link 2</Button>
            <Button>Link 3</Button>
        </div>
    </div>
}