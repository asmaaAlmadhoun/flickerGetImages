import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export default class Search extends React.Component {

    render() {
        return (
            <InputGroup size="sm" className="mx-auto w-50">
                <InputGroup.Text id="inputGroup-sizing-sm">Search by</InputGroup.Text>
                <Form.Control
                    aria-label="Search by"
                    placeholder={"Search term"}
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={(value) => this.props.userSearchInput(value)}
                />
            </InputGroup>);
    }
}

