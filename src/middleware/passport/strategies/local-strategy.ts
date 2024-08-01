import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserDao from '../../../modules/users/dao/UserDao';
import UserModel, { IUser } from '../../../modules/users/model/UserModel';
import bcrypt from 'bcrypt';

// Passport local strategy for user authentication
passport.use(new LocalStrategy(
    async (username: string, password: string, done) => {
        try {
            const userDao = new UserDao(UserModel);
            const findUser = await userDao.findUserByUsername(username);

            // Check if user exists
            if (!findUser) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, findUser.passwordHash);

            // If passwords match, authenticate user
            if (isMatch) {
                return done(null, findUser);
            } else {
                // If passwords don't match, deny authentication
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (err) {
            // Handle any errors that occur during authentication
            return done(err);
        }
    }
));

// Serialize the user ID into the session
passport.serializeUser((user, done) => {
    // Serialize user ID to store in the session
    done(null, (user as IUser).id.toString());
});


// Deserialize the user object based on the ID stored in the session
passport.deserializeUser(async (id, done) => {
    try {
        // Find user by ID in the database
        const user = await UserModel.findById(id);
        done(null, user); // Pass user object to deserializer
    } catch (err) {
        done(err, null); // Handle errors during deserialization
    }
});

// Export the configured Passport instance for use in the application
export default passport;
