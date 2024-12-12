import React, { useEffect, useState } from "react";
import Artwork from "../Artwork/Artwork";
import "./EditorPick.css";
import { fetchEditorPicks } from "../../services";

const EditorPick = ({ toIntro, setError }) => {
    const [editorPicks, setEditorPicks] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchEditorPicks()
            .then((data) => {
                setCurrentItems(data.pickDatas || []);
                setEditorPicks(data.editorPicks || []);
            })
            .catch((error) => {
                setError(error?.error || 'ERROR');
            });
    }, []);

    const totalPages = Math.ceil(editorPicks.length / itemsPerPage);

    const startIndex = currentPage * itemsPerPage;
    const paginatedItems = currentItems.slice(startIndex, startIndex + itemsPerPage);



    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };



    return (
        <div className="editor-pick">
            <div className="title">
                <h2>Editor's Pick</h2>
            </div>
            <div className="ep-artworks" >
                {paginatedItems.map((item, index) => (
                    <Artwork
                        key={`${item.id}-${index}`}
                        name={item.name}
                        author={item.author}
                        url={item.url}
                        toIntro={toIntro}
                        id={item.id}
                    />
                ))}
            </div>
            <div className="pagination">
                {currentPage > 0 ? (
                    <button
                        onClick={goToPreviousPage}
                        className="page-btn left"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                        </svg>
                    </button>
                ) : (
                    <div className="page-btn-placeholder" />
                )}
                {currentPage < totalPages - 1 ? (
                    <button
                        onClick={goToNextPage}
                        className="page-btn right"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                        </svg>
                    </button>
                ) : (
                    <div className="page-btn-placeholder" />
                )}
            </div>

        </div>

    );
};

export default EditorPick;
