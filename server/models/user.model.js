import mongoose from "mongoose"

// note : salt is a crypography method that adds additional input to the passwd to hash it,
//to provide a safeguard vs rainbow tables that attacks hashtables

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'User name is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'User email is required',
        unique: 'Email already exists',
        match: [/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'Please use a valid email address']
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,

    //passwd needs to be encrypted, validated and authenticated
    // passwd field value will not be stored in the user scehema database, instead it will be handled as a virtual field
    // virtual fields do not get added to the database
    hashed_password: {
        type: String,
        required: 'Password is required'
    },
    salt: String,

})
//encryption and authentication of passwd
userSchema.methods = {
    encryptPassword : function(password){
        if(!password) return ''
        try{
            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        } catch(err) { return ''}
    },
    makeSalt : function(){
        return Math.round((new Date.valueOf() * Math.random() )) + ''
    },
    authenticate: function(plainText){
        return this.hashed_password === this.encryptPassword(plainText)
    }
}


userSchema
.virtual('password')
.set(function(password){
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password) 
})
.get(()=>{
    return this._password
})

//validation
userSchema.path(hashed_password)
.validate(function(){
    if(this._password && this._password.length < 6){
        this.invalidate("password", "Password must be atleast 6 characters long")
    }
    if(this._password.isNew() && !this.password){
        this.invalidate('password', "Password is required")
    }
}, null)



export default mongoose.model('User', userSchema)