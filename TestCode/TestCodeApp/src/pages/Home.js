
import React from "react";
import Search from '../components/search';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Pagination from '../components/pagination';
import '../App.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            items: [],
            favouritList: [],
            tag: "technology",
            dataisLoaded: false,
            currentPage: 1,
            recordsPerPage: 10,
            currentRecords: [0, 5],
            nPages: 1,
            indexOfFirstRecord: 0,
            indexOfLastRecord: 5,
            selectedPaginationValue: 1
        }
    }
    componentDidMount() {
        this.getImages();
    };
    calculatePages(photosList, newCurrentPage, newRecordsPerPage) {
        let { currentPage, recordsPerPage } = this.state;
        if(newCurrentPage) currentPage = newCurrentPage;
        if(photosList === undefined) photosList = this.state.photosList;
        if(newRecordsPerPage) recordsPerPage = newRecordsPerPage;
        let indexOfLastRecord = currentPage * recordsPerPage;
        let indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        let currentRecordsNum = [];
        currentRecordsNum = photosList.slice(indexOfFirstRecord, indexOfLastRecord);
        let numPages = Math.ceil(photosList.length / recordsPerPage);
        this.setState({
            nPages: numPages,
            currentRecords: currentRecordsNum,
            indexOfFirstRecord: indexOfFirstRecord,
            indexOfLastRecord: indexOfLastRecord
        });
    }
    async getPhotoByTag(tag) {
        let url = ` https://www.flickr.com/services/rest/?method=flickr.tags.getClusterPhotos&api_key=6250970ebe15affe1013fb7f41f94d61&tag=${tag}&format=json&nojsoncallback=1`
        fetch(url).then(response => {
            return response.text();
        })
            .then(data => {
                setTimeout(() => {
                    let photosList = JSON.parse(data).photos;
                    this.calculatePages(photosList.photo);
                    this.setState({
                        items: photosList.photo, dataisLoaded: true
                    });
                }, 100);
            });
    }
    getImages() {
        this.getPhotoByTag(this.state.tag);
    }
    searchChanged = searchString => {
        this.setState({ tag: searchString.target.value });
        setTimeout(() => {
            this.getPhotoByTag(searchString.target.value);
        }, 500)
    }
    updateFavorites(newValue, e) {
        let favouritList = this.state.favouritList;
        this.setState({ favouritList: [...favouritList, newValue] });
        if (e && e.stopPropagation) e.stopPropagation();
    }
    setCurrentPage(newCurrentPage, recordsPerPage) {
        let photosList = this.state.items;
        this.setState({ currentPage: newCurrentPage });
        this.calculatePages(photosList, newCurrentPage, recordsPerPage);
    }
    handlePagingChange(e) {
        this.setCurrentPage(1, e.target.value);
        this.setState({ selectedPaginationValue: e.target.value, recordsPerPage: e.target.value });
    }
    render() {
        let { items, dataisLoaded, favouritList, currentPage, nPages, currentRecords, selectedPaginationValue } = this.state;

        return (
            <div className="row px-5">
                <div className="col-12">
                    {dataisLoaded ? <>
                        <div className="row">
                            <div className="col-12 text-center mb-5">
                                <Search userSearchInput={this.searchChanged} />
                            </div>
                            <div className="col-12 clear">
                                <select className="form-select custom-list" onChange={(e) => this.handlePagingChange(e)} value={selectedPaginationValue}>
                                    <option value="10" >10 per page</option>
                                    <option value="20">20 per page</option>
                                    <option value="50">50 per page</option>
                                </select>
                                <Link className="btn-secondary btn float-right" state={favouritList} to={{ pathname: '/Favorites', params: { data: favouritList } }}>My Favorites</Link>
                            </div>
                        </div>
                        <div className="row">
                            {
                                currentRecords ? currentRecords.map((photo) => {
                                    return (
                                        <div className="col-md-4 position-relative my-auto">
                                            <Link id={photo.id} className="d-block my-3 gallery-block" to={`//live.staticflickr.com/65535/${photo.id}_${photo.secret}_b.jpg`}>
                                                <img title={photo.title} className="w-100" src={`//live.staticflickr.com/65535/${photo.id}_${photo.secret}_b.jpg`} />
                                            </Link>
                                            <Button className="gallery-button-like btn-light" onClick={(e) => this.updateFavorites(photo, e)} ><FontAwesomeIcon color="red" icon={faHeartbeat} /></Button>
                                        </div>
                                    )
                                })
                                    : ""
                            }
                        </div>
                        <div className="row mt-3">
                            <Pagination
                                className="justify-content-center"
                                nPages={nPages}
                                currentPage={currentPage}
                                setCurrentPage={(e) => this.setCurrentPage(e)}
                            />
                        </div>
                    </>
                        : <></>
                    }
                </div>
            </div>
        );
    };
}