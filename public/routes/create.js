
import express from 'express';
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.render('create', obj);
    });

export default router;