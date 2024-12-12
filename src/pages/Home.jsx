import React, { useEffect, useReducer } from 'react';
import Banner from '../components/Banner/Banner';
import EditorPick from '../components/EditorPick/EditorPick';
import NewPosts from '../components/NewPosts/NewPosts';
function Home({
    toGallery,
    toIntro,
    dispatchPage,
    setError
}) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='home'>

            <Banner toIntro={toIntro} setError={setError} />
            <EditorPick toIntro={toIntro} setError={setError} />
            <NewPosts
                toGallery={toGallery}
                toIntro={toIntro}
                dispatchPage={dispatchPage}
                setError={setError}
            />
        </div>
    )
}

export default Home;