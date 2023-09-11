

Code Flow on passport authentication ->

-- passport.checkAuthentication
        ⬇
Page- /auth/login : POST
        ⬇
Route- /auth
        ⬇
-- passport.authenticate
-- passport.serializeUser()
        ⬇
Controller- auth_controller.login
        ⬇
-- passport.deserializeUser()
-- passport.setAuthentication
        ⬇
Route - /users/profile
        ⬇
-- passport.checkAuthentication
        ⬇
Controller- users_controller.profilePage
        ⬇
-- passport.setAuthentication

