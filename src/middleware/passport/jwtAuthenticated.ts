import passport, {use} from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from "../../modules/users/model/UserModel";
import UserDao from "../../modules/users/dao/UserDao";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt-secret-key', // Use the same secret key you used to sign the JWT
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const userDao = new UserDao(UserModel)
            const user = await userDao.findUserById(jwt_payload.userId);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
);
