const express = require("express");
const router = express.Router();

// Site Controller
const siteController = require("../app/controllers/site.controller");

router.get("/", siteController.index);

// Vehile Manage
router.get("/vehicle/manage-vehicle", siteController.vehicleIndex);
router.get("/vehicle/add-new-vehicle", siteController.addNewVehicle);

router.post("/vehicle/store", siteController.vehicleStore);
router.delete("/vehicle/:id/force", siteController.vehicleForce);
router.put("/vehicle/:id", siteController.vehicleUpdate);

module.exports = router;
