import React, { useState } from "react";
import "./ArtworkIntro.css";
import { fetchArtworkLikes } from "../services";

function ArtworkIntro({
    dispatchPage,
    loginState,
    dispatchLogin,
    artwork,
    toHome,
    setError
}) {
    const [isHeartFilled, setIsHeartFilled] = useState(loginState.liked.includes(artwork.id));
    const handleLike = () => {
        if (loginState.isLoggedIn) {
            fetchArtworkLikes(artwork.id)
                .then((data) => {
                    setIsHeartFilled((prevState) => !prevState);
                    if (isHeartFilled) {
                        artwork.likes--;
                    } else {
                        artwork.likes++;
                    }
                    const userInfo = data.userInfo;
                    dispatchLogin({
                        type: 'login', payload: {
                            isLoggedIn: true,
                            username: userInfo.username,
                            role: userInfo.role,
                            liked: userInfo.liked,
                        }
                    })
                })
                .catch((err) => {
                    setError(err?.error || 'ERROR');
                });
        } else {
            dispatchPage({ type: 'login', payload: { error: 'need to login' || 'ERROR' } });

        }
    }

    return (
        <div className="intro-page">
            <div className="intro-body">
                <div className="artwork-img">
                    <img src={artwork.url} alt={artwork.name} />
                    <div className="publish-info">
                        <h4 className="intro-publisher">Published by: {artwork.publisher}</h4>
                        <div className="art-likes">
                            <button className="like-button" onClick={handleLike}>
                                {isHeartFilled ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#F00000">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F00000"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" /></svg>
                                )}
                            </button>
                            <p className="like-data">{artwork.likes}</p>

                        </div>
                    </div>
                </div>
                <div className="artwork-intro">
                    <div className="artwork-title">
                        <h2 className="intro-name">{artwork.name}</h2>
                        <h3 className="intro-author">Author: {artwork.author}</h3>
                    </div>

                    <div className="intro-label">
                        <div className="art-form">
                            <p><span className="category-label">Form :</span> {artwork.form}</p>
                        </div>
                        <div className="art-time">
                            <p><span className="category-label">Completion Year :</span> {artwork.completionYear}</p>
                        </div>
                        <div className="art-theme">
                            <p><span className="category-label">Theme :</span> {artwork.theme.join(", ")}</p>
                        </div>
                        <div className="art-style">
                            <p><span className="category-label">Style :</span> {artwork.style.join(", ")}</p>
                        </div>
                        <div className="art-func">
                            <p><span className="category-label">Function :</span> {artwork.function.join(", ")}</p>
                        </div>
                    </div>
                    <div className="intro-description">
                        {artwork.description.split("\n").map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                </div>
            </div>
            <div className="go-back" >
                <button className="back-btn" onClick={() => toHome()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                    <p>Back</p>
                </button>
            </div>

        </div>
    );
}
export default ArtworkIntro;