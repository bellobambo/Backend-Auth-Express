const passport = require("passport")
const { Strategy } = require("passport-discord")
const DiscordUser = require("../database/schema/DiscordUser")
// const { Strategy } = require("passport-local")


passport.serializeUser((user, done) => {
    console.log("Serializing user...")
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    console.log("Deserializing user...")
    console.log(id)

    try {
        const user = await DiscordUser.findById(id)
        if (!user) throw new Error("User not found")
        console.log(user)
        done(null, user)

    } catch (err) {
        console.log(err)
        done(err, null)
    }

})


passport.use(new Strategy(
    {
        clientID: "1111264879794454619",
        clientSecret: "hHyquMBrNHoshEpXwicIcmfCJU9KUuts",
        clientUrl: "http://localhost:3001/api/auth/discord/redirect",
        scope: ["identify"]
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken)
        console.log(profile)
        try
        {
            const discordUser = await DiscordUser.findOne({ discordId : profile.id })
            if (discordUser) {
                console.log(`Found User : ${discordUser}`)
                return done(null, discordUser)
            } else {
                const newUser = await DiscordUser.create({
                    discordId: profile.id
                })
                console.log(`Created User : ${discordUser}`)
                return done(null, newUser)

            }
        } catch (err) {
            console.error(err)
            return done(err , null)
        }
    })
)