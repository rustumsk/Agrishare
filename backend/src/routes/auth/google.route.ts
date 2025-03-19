import { Router,Request,Response } from "express";
import passport from "../../config/passport/google.config";
import { googleAuthMiddleware } from "../../middlewares/passport/google.auth";

const googleRouter: Router = Router();

googleRouter.get('/', passport.authenticate('google', { session: false }));

googleRouter.get('/oauth2/redirect/google', passport.authenticate('google', {session:false}), googleAuthMiddleware);

export default googleRouter;