import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import JeweleryItem from "./JeweleryItem";

const JeweleryList = observer(() => {
    const {jewelery} = useContext(Context)

    return (
        <Row className="d-flex">
            {jewelery.jewelerys.map(jewelery =>
                <JeweleryItem key={jewelery.id} jewelery={jewelery}/>
            )}
        </Row>
    );
});

export default JeweleryList;
