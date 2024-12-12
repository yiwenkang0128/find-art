import React, { useState, useEffect } from 'react';
import './Banner.css';
import { fetchBanner } from '../../services';

function Banner({ toIntro, setError }) {
    const [bannerData, setBannerData] = useState([]);
    useEffect(() => {
        fetchBanner()
            .then(({ banner }) => {
                setBannerData(banner);

            })
            .catch((error) => {
                setError(error?.error || 'ERROR');
            });
    }, []);

    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    const totalbannerImgs = bannerData.length;

    const handlePrev = () => {
        setIsPaused(true);
        if (currentIndex <= 0) {
            setIsTransitioning(false);
            setCurrentIndex(totalbannerImgs);
            setTimeout(() => {
                setIsTransitioning(true);
                setCurrentIndex(totalbannerImgs - 1);
            }, 50);
        } else {
            setIsTransitioning(true);
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
        resumeAutoPlay();
    };

    const handleNext = () => {
        setIsPaused(true);
        if (currentIndex >= totalbannerImgs + 1) {
            setIsTransitioning(false);
            setCurrentIndex(1);
            setTimeout(() => {
                setIsTransitioning(true);
                setCurrentIndex(2);
            }, 50);
        } else {
            setIsTransitioning(true);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
        resumeAutoPlay();
    };

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(handleNext, 3000);
            return () => clearInterval(interval);
        }
    }, [currentIndex, isPaused]);

    useEffect(() => {
        if (!isTransitioning) {
            const timeout = setTimeout(() => setIsTransitioning(true), 30);
            return () => clearTimeout(timeout);
        }
    }, [isTransitioning]);

    const resumeAutoPlay = () => {
        setTimeout(() => setIsPaused(false), 3000);
    };



    return (
        <div className="banner">
            {bannerData.length === 0 ? (
                <p>Loading banners...</p>
            ) : (
                <>
                    <button className="banner-btn-left" onClick={handlePrev}>
                        ◀
                    </button>
                    <div className="banner-image-container">
                        <div
                            className="banner-image-wrapper"
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`,
                                transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                                width: `${(totalbannerImgs + 2) * 100}%`,
                            }}
                        >
                            <img
                                src={bannerData[totalbannerImgs - 1].url}
                                alt={`Banner ${totalbannerImgs}`}
                                className="banner-image"
                                onClick={() => toIntro(bannerData[totalbannerImgs - 1].id)}
                            />
                            {bannerData.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={`Banner ${index}`}
                                    className="banner-image"
                                    onClick={() => toIntro(image.id)}
                                />
                            ))}
                            <img
                                src={bannerData[0].url}
                                alt="Banner 0"
                                className="banner-image"
                                onClick={() => toIntro(bannerData[0].id)}
                            />
                        </div>
                    </div>
                    <button className="banner-btn-right" onClick={handleNext}>
                        ▶
                    </button>
                </>
            )}
        </div>
    );

}

export default Banner;
