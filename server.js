import express from 'express';
import cookieParser from 'cookie-parser';
import {
    editorPicks,
    imageDataMap,
    categoryList,
    filterImagesByTags,
    bannerImgs,
    mapIdToData,
    addArtwork,
    hasEmptyProperty,
    extractImageData,
    resetEditorPicks,
    sanitizeInput
} from './data.js';
import {
    addSession,
    deleteSession,
    getSessionRole,
    getSessionUser,
} from './sessions.js';
import { isValidUsername, userList, isUsernameExists } from './users.js';

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));
app.use(express.json());
app.use(cookieParser());

app.get('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : '';
    const role = sid ? getSessionRole(sid) : '';
    res.json({ userInfo: sid && username && role ? { username, role } : null });
});

app.get('/api/v1/post', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : '';
    const role = sid ? getSessionRole(sid) : '';
    if (!sid || !username || !role) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ userInfo: sid && username && role ? { username, role } : null });
});
app.post('/api/v1/post', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : '';
    const role = sid ? getSessionRole(sid) : '';
    if (!sid || !username || !role) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const userInput = sanitizeInput(req.body);
    if (hasEmptyProperty(userInput)) {
        res.status(400).json({ error: 'item-missing' });
        return;
    }
    addArtwork(imageDataMap, userInput, username);
    res.json({ userInfo: sid && username && role ? { username, role } : null });
});

app.post('/api/v1/session', (req, res) => {
    const { username } = req.body;

    if (!isValidUsername(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    if (!userList[username]) {
        res.status(404).json({ error: 'auth-notfound' });
        return;
    }

    const sid = addSession(userList[username]);
    const userInfo = userList[username];


    res.cookie('sid', sid);
    res.json({ userInfo });
});

app.post('/api/v1/user', (req, res) => {
    const { username } = req.body;

    if (!isValidUsername(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if (isUsernameExists(username)) {
        res.status(409).json({ error: 'auth-conflict' });
        return;
    }

    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    userList[username] = {
        username,
        role: 'user',
    };

    const sid = addSession(userList[username]);
    const userInfo = userList[username];

    res.cookie('sid', sid);
    res.json({ userInfo });
}
);

app.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : '';
    if (sid) {
        res.clearCookie('sid');
    }
    if (username) {
        deleteSession(sid);
    }
    res.json({ wasLoggedIn: !!username });
}
);

app.get('/api/v1/manage', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : '';
    const role = sid ? getSessionRole(sid) : '';

    const userInfo = sid && username && role ? userList[username] : null;
    const allArtworks = extractImageData(imageDataMap);
    res.json({ allArtworks, userInfo });
}
);

app.post('/api/v1/manage', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : '';
    const role = sid ? getSessionRole(sid) : '';

    if (!sid || !username || !role) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const newPicks = req.body;
    resetEditorPicks(newPicks);
    const userInfo = sid && username && role ? userList[username] : null;
    res.json({ userInfo });
}
);

app.get('/api/v1/category', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : '';
    const role = sid ? getSessionRole(sid) : '';
    const userInfo = userList[username];

    res.json({
        categoryList,
        userInfo: sid && username && role ? userInfo : null
    });
}
);

app.post('/api/v1/gallery', (req, res) => {
    const sid = req.cookies.sid;
    const filterList = req.body.filterList || [];

    const username = sid ? getSessionUser(sid) : '';
    const role = sid ? getSessionRole(sid) : '';
    const userInfo = userList[username];

    const filteredImages = filterImagesByTags(imageDataMap, filterList);
    res.json({
        filteredImages,
        userInfo: sid && username && role ? userInfo : null
    });
}
);
app.get('/api/v1/artwork/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : '';
    const role = sid ? getSessionRole(sid) : '';

    const id = req.params.id;
    const artwork = imageDataMap[id];
    if (!artwork) {
        res.status(404).json({ error: 'artwork-notfound' });
        return;
    }

    const userInfo = userList[username];

    res.json({
        artwork,
        userInfo: sid && username && role ? userInfo : null
    });
}
);
app.post('/api/v1/artwork/:id/like', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : '';
    const role = sid ? getSessionRole(sid) : '';

    const id = req.params.id;
    const artwork = imageDataMap[id];
    if (!artwork) {
        res.status(404).json({ error: 'artwork-notfound' });
        return;
    }
    if (!username) {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    if (userList[username].liked.includes(id)) {
        const likedArray = userList[username].liked;
        const index = likedArray.indexOf(id);
        likedArray.splice(index, 1);
        imageDataMap[id].likes--;
    } else {
        userList[username].liked.push(id);
        imageDataMap[id].likes++;
    }

    const userInfo = userList[username];

    res.json({
        artwork,
        userInfo: sid && username && role ? userInfo : null
    });
}
);

app.get('/api/v1/editor-picks', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : '';
    const role = sid ? getSessionRole(sid) : '';

    const userInfo = sid && username && role ? userList[username] : null;
    const pickDatas = mapIdToData(editorPicks, imageDataMap);
    res.json({ pickDatas, editorPicks, userInfo });
}
);

app.get('/api/v1/new-artworks', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : '';
    const role = sid ? getSessionRole(sid) : '';

    const userInfo = sid && username && role ? userList[username] : null;
    const newestDataArray = Object.entries(imageDataMap)
        .slice(-10)
        .map(([id, data]) => ({
            id,
            ...data,
        }))
        .reverse();
    res.json({ newestDataArray, userInfo });
}
);

app.get('/api/v1/banner', (req, res) => {
    const banner = mapIdToData(bannerImgs, imageDataMap);
    res.json({
        banner
    });
}
);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
}
);


