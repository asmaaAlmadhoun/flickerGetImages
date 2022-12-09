import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

const Favorites = () => {
    const location = useLocation();
    const state = location.state;
    return (
        <div>
            <h1> Favorites List  <FontAwesomeIcon color="red" icon={faHeartbeat} /></h1>
            <div className="row">
                {
                    state ? state.map((photo) => {
                        return (
                            <div className="col-md-4 position-relative my-auto">
                                <Link id={photo.id} className="d-block my-3 gallery-block" to={`//live.staticflickr.com/65535/${photo.id}_${photo.secret}_b.jpg`}>
                                    <img title={photo.title} className="w-100" src={`//live.staticflickr.com/65535/${photo.id}_${photo.secret}_b.jpg`} />
                                </Link>
                            </div>
                        )
                    })
                        : ""
                }
            </div>
        </div>
    );
};

export default Favorites;