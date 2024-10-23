/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router"

const AccommodationsController = () =>
  import("#controllers/accommodations_controller")
const ReservationsController = () =>
  import("#controllers/reservations_controller")
const UserSupportController = () =>
  import("#controllers/user_support_controller")
const OccupancyController = () =>
  import("#controllers/occupancy_controller")

router.on("/").renderInertia("home")
router.resource("accommodations", AccommodationsController)
router.resource("reservations", ReservationsController)
router.resource("support", UserSupportController)
router.resource("occupancy", OccupancyController)
