import {Schema, model, models} from 'mongoose'
import { type } from 'os'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']
    },

    username: {
        type: String,
        unique: [true, 'username is required']
    },

    image: {
        type: String
    },

    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }]

}, {
    timestamps: true
}
)

const User = models.User || model('User', UserSchema)

export default User