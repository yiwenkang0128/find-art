import React, { useEffect, useState } from "react";
import Artwork from "../Artwork/Artwork";
import "./NewPosts.css";
import { fetchNewestData } from "../../services";

const NewPosts = (
    { toGallery, toIntro, dispatchPage, setError }

) => {
    const [newestDataArray, setNewestDataArray] = useState([]);

    useEffect(() => {
        fetchNewestData()
            .then((data) => {
                const { newestDataArray } = data;
                setNewestDataArray(newestDataArray || []);
            })
            .catch((error) => {
                setError(error?.error || 'ERROR');
            });

    }, []);


    return (
        <div className="newly-posts">
            <div className="title">
                <h2>Newly Posts</h2>
            </div>
            <div className="np-artworks" >
                {newestDataArray.length > 0 ? (
                    newestDataArray.map((item) => (
                        <Artwork
                            key={item.id}
                            name={item.name}
                            author={item.author}
                            url={item.url}
                            dispatchPage={dispatchPage}
                            id={item.id}
                            toIntro={toIntro}
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="more">
                <button className="more-btn" onClick={toGallery}>Explore More</button>
            </div>

        </div>

    );
};

export default NewPosts;
