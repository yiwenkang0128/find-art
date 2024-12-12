import { useEffect, useState } from 'react';
import './Post.css';
import { fetchMakePost } from '../services';
function Post({ categoryList, dispatchPage, setError }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [formData, setFormData] = useState({
        name: '',
        author: '',
        url: '',
        description: '',
        completionYear: '',
        form: '',
        theme: [],
        style: [],
        function: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (category, value) => {
        setFormData(prev => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter(item => item !== value)
                : [...prev[category], value]
        }));
    };

    const handleSubmit = () => {
        dispatchPage({ type: 'loading' });
        fetchMakePost(formData)
            .then(() => {
                dispatchPage({ type: 'home' });
            })
            .catch(err => {
                if (err.error === 'auth-missing') {
                    dispatchPage({ type: 'login' });
                    setError(err?.error || 'ERROR');
                }
                else if (err.error === 'item-missing') {
                    dispatchPage({ type: 'post' });
                    setError(err?.error || 'ERROR');
                }
                else {
                    dispatchPage({ type: 'post' });
                    setError(err?.error || 'ERROR');
                }
            });
        setFormData({
            name: '',
            author: '',
            url: '',
            description: '',
            completionYear: '',
            form: '',
            theme: [],
            style: [],
            function: []
        });
    };

    return (
        <div className="post-page">
            <p>Ready to post art?</p>
            <form className="post-form" onSubmit={(e) => e.preventDefault()}>
                <div className="input-area">
                    <label>
                        <div className="label-text">
                            Name:
                        </div>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                    </label>
                    <label>
                        <div className="label-text">
                            Author:
                        </div>
                        <input type="text" name="author" value={formData.author} onChange={handleInputChange} required />
                    </label>
                    <label>
                        <div className="label-text">
                            Image URL:
                        </div>
                        <input type="url" name="url" value={formData.url} onChange={handleInputChange} required />
                    </label>
                    <label>
                        <div className="label-text">
                            Completion Year:
                        </div>
                        <input type="text" name="completionYear" value={formData.completionYear} onChange={handleInputChange} />
                    </label>
                </div>

                <fieldset className='select-category'>
                    <legend>Form (Single Select)</legend>
                    {categoryList.form.map(item => (
                        <label key={item}>
                            <input
                                type="radio"
                                name="form"
                                value={item}
                                checked={formData.form === item}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="select-label">
                                {item}
                            </div>
                        </label>
                    ))}
                </fieldset>
                {['theme', 'style', 'function'].map(category => (
                    <fieldset key={category} className='select-category'>
                        <legend>{category.charAt(0).toUpperCase() + category.slice(1)} (Multi Select)</legend>
                        {categoryList[category].map(item => (
                            <label key={item}>
                                <input
                                    type="checkbox"
                                    name={category}
                                    value={item}
                                    checked={formData[category].includes(item)}
                                    onChange={() => handleCheckboxChange(category, item)}
                                />
                                <div className="select-label">
                                    {item}
                                </div>
                            </label>
                        ))}
                    </fieldset>
                ))}
                <div className="description-area">
                    <label>
                        <div className="description-label">
                            Description:
                        </div>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} />
                    </label>
                </div>
                <div className="post-submit-area">
                    <button type="button" onClick={handleSubmit} className='post-btn'>Post</button>

                </div>
            </form>
        </div>

    );
}
export default Post;