import { db } from '../connect.js';
import jwt from 'jsonwebtoken';

// Lấy danh sách userId đã like 1 bài post
export const getLikes = (req, res) => {
    const q = 'SELECT userId FROM likes WHERE postId = ?';

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        const userIds = data.map((item) => item.userId); // Trả về mảng userId
        return res.status(200).json(userIds);
    });
};

// Like 1 bài post
export const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in!');

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!');
        const q = 'INSERT INTO likes (`userId`, `postId`) VALUES (?)';
        const values = [userInfo.id, req.body.postId];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(201).json('Post has been liked.');
        });
    });
};

// Unlike (xóa like)
export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in!');

    jwt.verify(token, 'secretkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!');
        const q = 'DELETE FROM likes WHERE `userId` = ? AND `postId` = ?';

        const values = [
            userInfo.id,
            req.query.postId, // ✅ dùng query, vì frontend gửi ?postId=...
        ];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('Post has been unliked.');
        });
    });
};
