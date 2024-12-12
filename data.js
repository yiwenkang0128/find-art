export const bannerImgs = ["0002", "0001", "0003"];


export const editorPicks = ["0015", "0016", "0011", "0014", "0006", "0008", "0009", "0010", "0007", "0002"];

export const categoryList = {
    "form": ["Painting", "Sculpture", "Performance Art"],
    "theme": ["Portrait", "Landscape", "Abstract", "Historical", "Mythological", "Religious", "Nature", "Social", "Sports"],
    "style": ["Realism", "Romanticism", "Academic", "Post-Impressionism", "Renaissance", "Surrealism", "Expressionism", "Baroque", "Impressionism", "Cubism", "Aestheticism", "Netherlandish Art", "Classical Greek"],
    "function": ["Decorative Art", "Historical", "Religious", "Experimental", "Public Art", "Emotional Expression", "Narrative"]
}

export function resetEditorPicks(newPicks) {
    editorPicks.length = 0;
    editorPicks.push(...newPicks);
}
export function filterImagesByTags(imageDataMap, filterList) {
    const isFilterEmpty = !filterList || filterList.length === 0;

    if (isFilterEmpty) {
        return { ...imageDataMap };
    }

    const filteredMap = {};

    Object.entries(imageDataMap).forEach(([id, imageData]) => {
        const matchesFilter = Object.values(imageData).some(value => {
            if (Array.isArray(value)) {
                return value.some(tag => filterList.includes(tag));
            } else {
                return filterList.includes(value);
            }
        });

        if (matchesFilter) {
            filteredMap[id] = imageData;
        }
    });

    return filteredMap;
}

export function addArtwork(imageDataMap, userInput, username) {
    const currentMaxId = Math.max(...Object.keys(imageDataMap).map(id => parseInt(id)));
    const newId = (currentMaxId + 1).toString().padStart(4, '0');

    const newArtwork = {
        id: newId,
        name: userInput.name,
        author: userInput.author,
        url: userInput.url,
        description: userInput.description,
        form: userInput.form,
        theme: userInput.theme,
        style: userInput.style,
        function: userInput.function,
        completionYear: parseInt(userInput.completionYear),
        likes: 0,
        publisher: username
    };

    imageDataMap[newId] = newArtwork;

    return imageDataMap;
}

export function hasEmptyProperty(obj) {
    const isEmpty = (value) =>
        value === null ||
        value === undefined ||
        value === '' ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' && value !== null && Object.keys(value).length === 0);

    function check(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return false;
        }

        for (const key in obj) {
            if (isEmpty(obj[key])) {
                return true;
            }

            if (typeof obj[key] === 'object') {
                if (check(obj[key])) {
                    return true;
                }
            }
        }

        return false;
    }

    return check(obj);
}

export function extractImageData(imageDataMap) {
    return Object.values(imageDataMap).map(imageData => ({
        id: imageData.id,
        name: imageData.name,
        author: imageData.author
    }));
}

export function sanitizeInput(input) {
    if (typeof input === 'string') {
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    } else if (Array.isArray(input)) {
        return input.map(sanitizeInput);
    } else if (typeof input === 'object' && input !== null) {
        const sanitizedObject = {};
        for (const key in input) {
            sanitizedObject[key] = sanitizeInput(input[key]);
        }
        return sanitizedObject;
    }
    return input;
}

export const allImgList = [
    {
        "id": "0001",
        "name": "The Last Day of Pompeii",
        "author": "Karl Bryullov"
    },
    {
        "id": "0002",
        "name": "The Roses of Heliogabalus",
        "author": "Lawrence Alma-Tadema"
    },
    {
        "id": "0003",
        "name": "Girl with a Pearl Earring",
        "author": "Johannes Vermeer",
    },
    {
        "id": "0004",
        "name": "The Last Day of Pompeii",
        "author": "Karl Bryullov"
    },
    {
        "id": "0005",
        "name": "The Roses of Heliogabalus",
        "author": "Lawrence Alma-Tadema"
    },
    {
        "id": "0006",
        "name": "Girl with a Pearl Earring",
        "author": "Johannes Vermeer",
    },
    {
        "id": "0001",
        "name": "The Last Day of Pompeii",
        "author": "Karl Bryullov"
    },
    {
        "id": "0002",
        "name": "The Roses of Heliogabalus",
        "author": "Lawrence Alma-Tadema"
    },
    {
        "id": "0003",
        "name": "Girl with a Pearl Earring",
        "author": "Johannes Vermeer",
    },
    {
        "id": "0004",
        "name": "The Last Day of Pompeii",
        "author": "Karl Bryullov"
    },
    {
        "id": "0005",
        "name": "The Roses of Heliogabalus",
        "author": "Lawrence Alma-Tadema"
    },
    {
        "id": "0006",
        "name": "Girl with a Pearl Earring",
        "author": "Johannes Vermeer",
    }
]

export const imageDataMap = {
    "0001": {
        "id": "0001",
        "name": "The Last Day of Pompeii",
        "author": "Karl Bryullov",
        "description": "A masterpiece depicting the tragic end of Pompeii.",
        "url": "https://uploads4.wikiart.org/images/karl-bryullov/the-last-day-of-pompeii-1833.jpg!Large.jpg",
        "form": "Painting",
        "theme": ["Historical", "Mythological", "Social"],
        "style": ["Realism", "Romanticism"],
        "function": ["Historical", "Decorative Art"],
        "likes": 16,
        "publisher": "artlover01",
        "completionYear": 1833
    },
    "0002": {
        "id": "0002",
        "name": "The Roses of Heliogabalus",
        "author": "Lawrence Alma-Tadema",
        "description": "The Roses of Heliogabalus is a masterpiece created by Sir Lawrence Alma-Tadema in 1888. \nThis painting is celebrated for its exquisite detail, vibrant colors, and the captivating portrayal of an infamous event from Roman history. \nThe artwork depicts a dramatic scene based on the life of the Roman Emperor Heliogabalus, a ruler notorious for his eccentricities, excesses, and hedonistic lifestyle.        The painting captures the moment when Emperor Heliogabalus hosts a lavish banquet for his guests. As part of his notorious penchant for spectacle, he orders an overwhelming cascade of rose petals to be showered upon the banquet attendees. The roses, depicted in a vibrant pink hue, are not merely ornamental; the abundance of petals becomes oppressive and even life-threatening, symbolizing decadence taken to a fatal extreme. Historical accounts suggest that the emperor’s guests were allegedly smothered under the weight of these roses, making this event a metaphor for the dangers of unchecked indulgence and the fragility of life amidst luxury.",
        "url": "https://uploads3.wikiart.org/00142/images/57726d84edc2cb3880b48a2b/the-roses-of-heliogabalus.jpg!Large.jpg",
        "form": "Painting",
        "theme": ["Historical", "Mythological", "Social"],
        "style": ["Academic", "Realism"],
        "function": ["Decorative Art", "Historical"],
        "likes": 99,
        "publisher": "classicfan22",
        "completionYear": 1888
    },
    "0003": {
        "id": "0003",
        "name": "Girl with a Pearl Earring",
        "author": "Johannes Vermeer",
        "description": "An iconic Dutch Golden Age portrait.",
        "url": "https://uploads0.wikiart.org/00380/images/johannes-vermeer/1-girl-with-a-pearl-earring-johannes-vermeer.jpg!Large.jpg",
        "form": "Painting",
        "theme": ["Portrait"],
        "style": ["Baroque", "Realism"],
        "function": ["Decorative Art"],
        "likes": 77,
        "publisher": "renaissanceFan",
        "completionYear": 1665
    },
    "0004": {
        "id": "0004",
        "name": "The Starry Night",
        "author": "Vincent van Gogh",
        "description": "A swirling view of the night sky over Saint-Rémy.",
        "url": "https://uploads3.wikiart.org/00475/images/vincent-van-gogh/the-starry-night-1889.jpg!Large.jpg",
        "form": "Painting",
        "theme": ["Landscape", "Abstract"],
        "style": ["Post-Impressionism"],
        "function": ["Decorative Art", "Experimental"],
        "likes": 91,
        "publisher": "nightSkyDreamer",
        "completionYear": 1889
    },
    "0005": {
        "id": "0005",
        "name": "Mona Lisa",
        "author": "Leonardo da Vinci",
        "description": "The world-famous enigmatic portrait.",
        "form": "Painting",
        "theme": ["Portrait"],
        "style": ["Renaissance", "Realism"],
        "function": ["Decorative Art"],
        "url": "https://uploads4.wikiart.org/00475/images/leonardo-da-vinci/0000136308-og.JPG!PinterestSmall.JPG",
        "likes": 92,
        "publisher": "mysteryLover",
        "completionYear": 1503
    },
    "0006": {
        "id": "0006",
        "name": "The Persistence of Memory",
        "author": "Salvador Dalí",
        "description": "A surreal masterpiece depicting melting clocks and dreamlike landscapes.",
        "url": "https://uploads1.wikiart.org/00475/images/salvador-dali/w1siziisijm4njq3mcjdlfsiccisimnvbnzlcnqilcitcxvhbgl0esa5mcatcmvzaxplidiwmdb4mjawmfx1mdazzsjdxq.jpg!Large.jpg",
        "form": "Painting",
        "theme": ["Abstract", "Surrealism"],
        "style": ["Surrealism"],
        "function": ["Decorative Art", "Experimental"],
        "likes": 76,
        "publisher": "surrealistFan",
        "completionYear": 1931
    },
    "0007": {
        "id": "0007",
        "name": "The Scream",
        "author": "Edvard Munch",
        "description": "An iconic expression of existential angst and emotional intensity.",
        "url": "https://uploads2.wikiart.org/images/edvard-munch/the-scream-1893(2).jpg!Large.jpg",
        "form": "Painting",
        "theme": ["Abstract", "Social"],
        "style": ["Expressionism"],
        "function": ["Decorative Art", "Experimental"],
        "likes": 75,
        "publisher": "emotionLover",
        "completionYear": 1893
    },
    "0008": {
        "id": "0008",
        "name": "The Birth of Venus",
        "author": "Sandro Botticelli",
        "description": "A celebrated depiction of the goddess Venus emerging from the sea on a shell.",
        "url": "https://uploads6.wikiart.org/images/sandro-botticelli/the-birth-of-venus-1485(1).jpg!Large.jpg",
        "form": "Painting",
        "theme": ["Mythological", "Religious"],
        "style": ["Renaissance"],
        "function": ["Decorative Art", "Religious"],
        "likes": 60,
        "publisher": "mythFanatic",
        "completionYear": 1485
    },
    "0009": {
        "id": "0009",
        "name": "The Spring",
        "author": "Sandro Botticelli",
        "description": "A renowned allegorical painting representing spring and themes of love, nature, and mythology.",
        "url": "https://uploads5.wikiart.org/00129/images/sandro-botticelli/primavera.jpg!Large.jpg",
        "form": "Painting",
        "theme": ["Mythological", "Nature"],
        "style": ["Renaissance"],
        "function": ["Decorative Art"],
        "likes": 4,
        "publisher": "natureArtLover",
        "completionYear": 1482
    },
    "0010": {
        "id": "0010",
        "name": "Discobolus",
        "author": "Myron",
        "description": "An iconic ancient Greek sculpture capturing the dynamic movement of a discus thrower.",
        "url": "https://uploads3.wikiart.org/00309/images/ancient-greek-painting/greek-statue-discus-thrower-2-century-ac.jpg!Large.jpg",
        "form": "Sculpture",
        "theme": ["Sports", "Mythological"],
        "style": ["Classical Greek"],
        "function": ["Public Art", "Decorative Art"],
        "likes": 53,
        "publisher": "ancientArtFan",
        "completionYear": -450
    },
    "0011": {
        "id": "0011",
        "name": "Angel with Candlestick",
        "author": "Gian Lorenzo Bernini",
        "description": "A Baroque sculpture depicting an angel gracefully holding a candlestick.",
        "url": "https://uploads2.wikiart.org/images/michelangelo/angel-with-candlestick-1495.jpg!Large.jpg",
        "form": "Sculpture",
        "theme": ["Religious"],
        "style": ["Baroque"],
        "function": ["Religious Art", "Decorative Art"],
        "likes": 54,
        "publisher": "baroqueFanatic",
        "completionYear": 1667
    },
    "0012": {
        "id": "0012",
        "name": "Water Lilies",
        "author": "Claude Monet",
        "description": "A serene and immersive series of paintings capturing the beauty of Monet's garden pond.",
        "url": "https://uploads1.wikiart.org/images/claude-monet/water-lilies-1899.jpg!Large.jpg",
        "form": "Painting",
        "theme": ["Landscape", "Nature"],
        "style": ["Impressionism"],
        "function": ["Decorative Art", "Experimental Art"],
        "likes": 13,
        "publisher": "impressionLover",
        "completionYear": 1899
    },
    "0013": {
        "id": "0013",
        "name": "Las Meninas",
        "author": "Pablo Picasso",
        "description": "A reinterpretation of Velázquez's masterpiece through Picasso's Cubist lens, showcasing fragmented and abstract forms.",
        "url": "https://uploads2.wikiart.org/images/pablo-picasso/las-meninas-velazquez-1957.jpg!Large.jpg",
        "form": "Painting",
        "theme": ["Portrait", "Abstract", "Historical"],
        "style": ["Cubism"],
        "function": ["Decorative Art", "Experimental Art"],
        "likes": 99,
        "publisher": "cubistFan",
        "completionYear": 1957
    },
    "0014": {
        "id": "0014",
        "name": "A Reverie",
        "author": "Albert Joseph Moore",
        "description": "A serene and harmonious depiction of a reclining figure, emphasizing beauty, grace, and aesthetic balance.",
        "url": "https://uploads5.wikiart.org/images/albert-joseph-moore/a-reverie-1892.jpg!Large.jpg",
        "form": "Painting",
        "theme": ["Portrait", "Nature"],
        "style": ["Aestheticism"],
        "function": ["Decorative Art", "Emotional Expression"],
        "likes": 7,
        "publisher": "aestheticFan",
        "completionYear": 1892
    },
    "0015": {
        "id": "0015",
        "name": "The Garden of Earthly Delights",
        "author": "Hieronymus Bosch",
        "description": "A complex triptych portraying a surreal exploration of paradise, earthly pleasures, and damnation.",
        "url": "https://uploads5.wikiart.org/images/hieronymus-bosch/the-garden-of-earthly-delights-1515.jpg!Large.jpg",
        "form": "Painting",
        "theme": ["Religious", "Surrealism", "Mythological"],
        "style": ["Netherlandish Art", "Surrealism"],
        "function": ["Religious Art", "Decorative Art", "Narrative"],
        "likes": 26,
        "publisher": "surrealMaster",
        "completionYear": 1515
    },
    "0016": {
        "id": "0016",
        "name": "Water Lilies",
        "author": "Claude Monet",
        "description": "A serene and immersive series of paintings capturing the beauty of Monet's garden pond.",
        "url": "https://uploads2.wikiart.org/images/claude-monet/water-lilies-1899-1.jpg!PinterestSmall.jpg",
        "form": "Painting",
        "theme": ["Landscape", "Nature"],
        "style": ["Impressionism"],
        "function": ["Decorative Art", "Experimental Art"],
        "likes": 33,
        "publisher": "gardenLover",
        "completionYear": 1906
    }
};

export function mapIdToData(idArray, imageDataMap) {
    return idArray.map((id) => {
        const imageData = imageDataMap[id];
        if (!imageData) {
            return null;
        }
        return {
            ...imageData,
        };
    }).filter(Boolean);
}

