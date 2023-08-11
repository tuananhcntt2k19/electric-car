// Models
const listVehicle = require("../models/listVehicle.model");

// Utils
const { mongooseToObject } = require("../../util/mongoose");
const { multipleMongooseToObject } = require("../../util/mongoose");

const { mongo } = require("mongoose");
const QRCode = require('qrcode');

module.exports = {
  index: function (req, res) {
    listVehicle.find({})
      .then((listVehicles) => {
        res.render("home", {
          listVehicles: multipleMongooseToObject(listVehicles)
        })  
      })
  },

  // Vehicle Manage

  vehicleIndex: function(req, res) {
    listVehicle.find({})
      .then((listVehicles) => {
        res.render("vehicle/vehicleIndex", {
          listVehicles: multipleMongooseToObject(listVehicles)
        })  
      })
  },

  // [GET] /vehicle/add-new-vehicle
  addNewVehicle: function(req, res) {
    res.render("vehicle/newVehicle", {})
  },

  // [POST] /vehicle/store
  vehicleStore: async (req, res) => {
    let qrData = `${req.body.nameVehicle} | ${req.body.colorVehicle}`
    let qr = await QRCode.toDataURL(qrData);
    let dataQRCode = {
      qrData: qr  
    }

    let dataBody = req.body
    let data = {... dataBody, ...dataQRCode }

    //console.log(data);
    const vehicle = new listVehicle(data);
    vehicle.save()
      .then(() => {
        res.redirect("/vehicle/manage-vehicle");
      })
      .catch((err)=>{
        console.log(err);
      })
  },

  // [DELETE] /vehicle/:id/force
  vehicleForce: function (req, res) {
    listVehicle.deleteOne({ _id: req.params.id})
      .then(() => {
        res.redirect("back");  
      })
  },

  // [PUT] /vehicle/:id
  vehicleUpdate: async (req, res) => {
    let qrData = `${req.body.nameVehicle} | ${req.body.colorVehicle}`
    let qr = await QRCode.toDataURL(qrData);
    let dataQRCode = {
      qrData: qr  
    }

    let dataBody = req.body
    let data = {... dataBody, ...dataQRCode }

    //console.log(data);

    listVehicle.updateOne({ _id: req.params.id }, data)
      .then(() => {
        res.redirect("back");
      })
  },


};
