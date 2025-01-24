import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName:{
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar:{
            type: String,   // cloudinary url
            required: true
        },
        username:{
            type: String
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is Required"]
        },
        refreshToken: {
            type: String
        }
    }
    ,{timestamps: true}
)

// this is a mongoose hook used to do something with the data just before it is stored
// we are using this to encrypt the user password before storing it
userSchema.pre("save", async function (next) {
    // this is to check if the password has been modified so we dont do this everytime
    if(!this.isModeified("password"))   return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// this is a custom mtd that we have made
userSchema.methods.isPasswordCorrect = async function(password){
    // comparing the new string and old encrypted password
    // gives a boolean value
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName,
        },
        process.env.ACESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)
// in database table it is shown as users