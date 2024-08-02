import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import UserDao from "../../modules/users/dao/UserDao";
import UserModel, {IUser} from "../../modules/users/model/UserModel";

/**
 * Implement the Local strategy for Passport.
 *
 * The strategy uses the username and password provided in the request body
 * to authenticate the user. It retrieves the user information from the database,
 * compares the provided password with the stored hashed password, and authenticates
 * the user if they match.
 *
 * @param {string} username - The username provided in the request body.
 * @param {string} password - The password provided in the request body.
 * @param {function} done - The callback function to pass control back to Passport.
 *
 * The strategy attempts to find the user in the database using the provided username.
 * If the user is found and the password matches, it calls done with the user object.
 * If the user is not found or the password doesn't match, it calls done with false.
 */
passport.use(new LocalStrategy(
    async (username: string, password: string, done) => {
        try {
            const userDao = new UserDao(UserModel);
            const user = await userDao.findUserByUsername(username); // Find user by username

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' }); // User not found
            }

            const isMatch = await bcrypt.compare(password, user.passwordHash); // Compare passwords

            if (isMatch) {
                return done(null, user); // Passwords match, authenticate user
            } else {
                return done(null, false, { message: 'Password incorrect' }); // Passwords don't match
            }
        } catch (err) {
            return done(err); // Handle any errors that occur during authentication
        }
    }
));

/**
 * Serialize the user ID into the session.
 *
 * This function serializes the user ID to store in the session.
 *
 * @param {IUser} user - The user object to be serialized.
 * @param {function} done - The callback function to pass control back to Passport.
 */
passport.serializeUser((user, done) => {
    done(null, (user as IUser).id.toString());
});

/**
 * Deserialize the user object based on the ID stored in the session.
 *
 * This function deserializes the user object by finding the user in the database
 * using the stored ID.
 *
 * @param {string} id - The ID of the user stored in the session.
 * @param {function} done - The callback function to pass control back to Passport.
 */
passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id); // Find user by ID
        done(null, user); // Pass user object to deserializer
    } catch (err) {
        done(err, null); // Handle errors during deserialization
    }
});

// Export the configured Passport instance for use in the application
export default passport;
