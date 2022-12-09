import React from "react";
import '../App.css';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="App bg-light">
                <main className="container">
                    <section className="gallery-head p-5 text-center">
                        <h1 className="jumbotron-heading">Image Gallery</h1>
                    </section>
                    <section className="gallery-body">
                        {this.props.children}
                    </section>
                </main>
            </div>
        )
    }
}
