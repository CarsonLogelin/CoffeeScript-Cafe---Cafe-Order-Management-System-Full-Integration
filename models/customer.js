import mongoose from "mongoose";
mongoose.set('strictPopulate',false);

const customerSchema = new mongoose.Schema({
    email: { // Customer's email
        type: String,
        required: [true,"Email is required"],
        unique: [true,"That email is already in use"],
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/,"Email is invalid"]
    },

    password: { // Customer's password
        type: String,
        required: [true,"Password is required"]
    },

    name: { // Customer's name
        type: String,
        required: [true,"Name is required"],
        trim: true
    },

    phone: { // Customer's phone number
        type: String,
        required: [true,"Phone number is required"],
        match: [/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,"Phone number is invalid"]
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

customerSchema.virtual("daysSinceCreated").get(function () {
    const now = new Date();
    const created = this.createdAt;
    const diffTime = Math.abs(now-created);
    const diffDays = Math.ceil(diffTime/(1000*60*60*24));
    return diffDays;
});

export default mongoose.model("Customer", customerSchema);