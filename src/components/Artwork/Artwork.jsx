import './Artwork.css';
function Artwork({ name,
    author,
    url,
    id,
    toIntro,
}) {

    function handleIntroClick() {
        if (typeof toIntro === 'function') {
            toIntro(id);
        } else {
            console.error('toIntro is not a function:', toIntro);
        }
    }

    return (
        <div className="artwork" onClick={() => handleIntroClick()}>
            <div className="img">
                <img src={url} alt={name} />
            </div>
            <div className="info">
                <h3 className="name">
                    {name}
                </h3>
                <h4 className="author">
                    {author}
                </h4>
            </div>
        </div>
    );
}
export default Artwork;