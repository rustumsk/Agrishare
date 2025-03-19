import passport from 'passport';
import { Strategy as GoogleStrategy} from 'passport-google-oauth20';
import * as dotenv from 'dotenv';
import { getUserByEmail } from '../../model/user/read.user';
import { GoogleUser } from '../types/types';
import { GoogleProfile } from '../types/types';
import { generateTokenbyId } from '../../helper/jwt.helper';
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/google/oauth2/redirect/google',
    scope: ['profile', 'email'],
}, async (accesToken:string ,refreshToken:string, profile:GoogleProfile, done: Function)=> {
    try{
        //check if a user with the email already exists.
        const existingUser = await getUserByEmail(profile._json.email);

        //if it exists generate an object with the type and the jwt token for the next route handler.
        if (existingUser){
            const token = generateTokenbyId(existingUser.email);

            const existProfile: GoogleUser = {
                type: "Existing",
                token: token
            } 
            
            return done(null, existProfile);
        }
        // if the email isnt registered, generate additional info for registration.
        const addInfo = {
            email: profile._json.email,
            google_id: profile.id
        };

        // create a profile with the type "New" and add the additional infor for the next route handler
        const newProfile: GoogleUser = {
            type: "New",
            additionalInfo: addInfo
        };
        // pass it to the next route handler GET /google/oauth2/redirect/google.
        return done(null, newProfile);
    }catch(e){
        console.log("Error during authentication")
        return done(e, false);
    }
}));    


export default passport;