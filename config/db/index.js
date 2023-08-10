const mongoose = require('mongoose');

let uri = 'mongodb+srv://falconve:jVCoGxTKD7T41nPm@cluster0.jpbiqrc.mongodb.net/vehicle_manage?retryWrites=true&w=majority';

async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully !!!');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };