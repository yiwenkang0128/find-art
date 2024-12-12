import { useEffect, useState } from 'react';
import Artwork from '../Artwork/Artwork';
import './Browse.css';
function Browse({ imgData, filterList, toIntro, checkForSession }) {
    const [sortOption, setSortOption] = useState('newest');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        setCurrentPage(0);
    }, [filterList]);

    const imageDataArray = Object.entries(imgData).map(([id, data]) => ({
        id,
        ...data,
    }));

    const getSortedData = () => {
        if (sortOption === 'latest') {
            return imageDataArray.sort((a, b) => b.id.localeCompare(a.id));
        } else if (sortOption === 'earliest') {
            return imageDataArray.sort((a, b) => a.id.localeCompare(b.id));
        } else if (sortOption === 'mostLiked') {
            return imageDataArray.sort((a, b) => b.likes - a.likes);
        }
        return imageDataArray;
    };
    const sortedData = getSortedData();
    const totalPages = Math.ceil(Object.keys(sortedData).length / itemsPerPage);
    const goToNextPage = () => {
        checkForSession();
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };
    const goToPreviousPage = () => {
        checkForSession();
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    const paginatedData = getSortedData().slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handlePageChange = (pageIndex) => {
        checkForSession();
        setCurrentPage(pageIndex);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="browse">
            <div className="sort">
                <label htmlFor="sort">Sort by:</label>
                <select
                    name="sort"
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="earliest">Earliest Post</option>
                    <option value="latest">Newest Post</option>
                    <option value="mostLiked">Most Liked</option>
                </select>
            </div>
            <div className="browse-artworks">
                {paginatedData.map((artwork, index) => (
                    <Artwork
                        key={`${Object.keys(imgData)[currentPage * itemsPerPage + index]}-${index}`}
                        name={artwork.name}
                        author={artwork.author}
                        url={artwork.url}
                        id={artwork.id}
                        toIntro={toIntro}
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
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`page-num-btn ${currentPage === index ? 'active' : ''}`}
                        onClick={() => handlePageChange(index)}
                    >
                        {index + 1}
                    </button>
                ))}
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
}
export default Browse;