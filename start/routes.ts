/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router"
router.on("/").renderInertia("home")

router
  .group(() => {
    router.resource(
      "accommodations",
      () => import("#controllers/accommodations_controller"),
    )
    router.resource(
      "reservations",
      () => import("#controllers/reservations_controller"),
    )
  })
  .prefix("api")
