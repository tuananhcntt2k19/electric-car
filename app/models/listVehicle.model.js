const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listVehicleSchema = new Schema(
    {
        nameVehicle: {type: String, unique: true, required: true, trim: true},
        colorVehicle: {type: String, trim: true},
        qrData: {type: String}
    },
    
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('listVehicle', listVehicleSchema);