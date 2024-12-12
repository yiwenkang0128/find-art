import Browse from "../components/Browse/Browse";
import Category from "../components/Category/Category";
import "./Gallery.css";
import { useEffect, useState } from "react";
import { fetchGallery } from "../services";

function Gallery({ categoryList, toIntro, checkForSession, setError }) {
    const [filterResult, setFilterResult] = useState({});
    const [filterList, setFilterList] = useState([]);

    useEffect(() => {

        fetchGallery(filterList)
            .then((data) => {
                setFilterResult(data.filteredImages);
            })
            .catch((err) => {
                setError(err?.error || 'ERROR');
            });
    }
        , [filterList]);
    return (
        <div className="gallery">
            <div className="gallery-body">
                <Category categoryList={categoryList} filterList={filterList} setFilterList={setFilterList} />
                <Browse imgData={filterResult} filterList={filterList} toIntro={toIntro} checkForSession={checkForSession} />
            </div>
        </div>
    );
}
export default Gallery;