import { Router,Request,Response } from "express";
import passport from "../../config/passport/google.config";
import { googleAuthController } from "../../controller/auth/google.auth";

const googleRouter: Router = Router();

googleRouter.get('/', passport.authenticate('google', { session: false }));

googleRouter.get('/oauth2/redirect/google', passport.authenticate('google', {session:false}), googleAuthController);

export default googleRouter;