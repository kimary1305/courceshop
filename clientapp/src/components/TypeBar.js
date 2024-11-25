import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = observer(() => {
    const {jewelery} = useContext(Context)
    return (
        <ListGroup>
            {jewelery.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === jewelery.selectedType.id}
                    onClick={() => jewelery.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
