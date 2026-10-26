import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    carModel: {
            type: String,
            trim: true,
            required: true
        },
    carNumber: {
            type: String,
            trim: true,
            uppercase: true,
            default: ''
        }, 
})

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        telegram: {
            type: String,
            trim: true,
            default: '' 
        },
        cars: [carSchema],

        comment: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

clientSchema.index({ name: 'text', phone: 'text', 'cars.carModel': 'text', 'cars.carNumber': 'text'});

const Client = mongoose.model('Client', clientSchema);
export default Client