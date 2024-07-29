import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import UserModel from "../../modules/users/model/UserModel";
import UserDao from "../../modules/users/dao/UserDao";

/**
 * Define the options for the JWT strategy.
 *
 * - jwtFromRequest: Specifies how to extract the JWT token from the request.
 *   In this case, it is extracted from the Authorization header as a Bearer token.
 * - secretOrKey: The secret key used to sign the JWT. It should be the same key
 *   used during the JWT creation to ensure proper verification.
 */
const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt-secret-key',
};

/**
 * Implement the JWT strategy for Passport.
 *
 * The strategy extracts the JWT token from the request, verifies it using the
 * secret key, and retrieves the user information from the database.
 *
 * @param {object} jwt_payload - The decoded JWT payload containing user information.
 * @param {function} done - The callback function to pass control back to Passport.
 *
 * The strategy attempts to find the user in the database using the user ID
 * from the JWT payload. If the user is found, it calls done with the user object.
 * If the user is not found or an error occurs, it calls done with false or an error,
 * respectively.
 */
passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const userDao = new UserDao(UserModel);
            const user = await userDao.findUserById(jwt_payload.userId); // Find the user by ID from the JWT payload

            if (user) {
                return done(null, user); // If user is found, pass user object to the done callback
            } else {
                return done(null, false); // If user is not found, pass false to the done callback
            }
        } catch (err) {
            return done(err, false); // If an error occurs, pass the error and false to the done callback
        }
    })
);

export default passport;
