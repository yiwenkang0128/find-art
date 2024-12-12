import { useState } from "react";
import './Manage.css';
import { fetchResetEditorPick } from "../services";

function Manage({ artworkList, dispatchPage, setError }) {
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(artworkList.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = artworkList.slice(startIndex, endIndex);

    const handleCheckboxChange = (id) => {
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.includes(id)
                ? prevSelectedIds.filter((selectedId) => selectedId !== id)
                : [...prevSelectedIds, id]
        );
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };
    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    const handleSubmit = () => {
        dispatchPage({ type: 'loading' });
        fetchResetEditorPick(selectedIds)
            .then(() => {
                dispatchPage({ type: 'home' });
            })
            .catch(err => {
                dispatchPage({ type: 'manage' });
                setError(err?.error || 'ERROR');
            });
    };

    return (
        <div className="manage-page">
            <p>Reset 'Editor's Pick'</p>
            <table className="manage-tb">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.author}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(item.id)}
                                    onChange={() => handleCheckboxChange(item.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
            <div className="submit-editor-pick">
                <button onClick={handleSubmit}>Submit</button>

            </div>
        </div>
    );
}
export default Manage;