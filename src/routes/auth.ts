import Router from 'express'

const router = Router();

router.post("/api/auth", (request, response) => {
        response.status(200).send('user local authentication route');
});

router.post("/api/auth/google", (request, response) => {
        response.status(200).send('user google authentication route');
});

router.post("/api/auth/logout", (request, response) => {
        response.status(200).send('user logout route');
});

export default router