const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Please Provide Your Email'],
    },

    password: {
        type: String,
        required: [true, "Please Provide your password"],
        minlength: 6,
        select: false
    },

})


// bcrypt password
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
})

//**Verify Password */
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


module.exports = User = mongoose.model("User", userSchema)