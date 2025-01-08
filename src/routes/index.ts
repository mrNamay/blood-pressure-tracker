import { Router } from 'express';


const router = Router();

router.get('/hello-world', (req, res) => {
    res.send("Hello, World!");
});

export default router;
