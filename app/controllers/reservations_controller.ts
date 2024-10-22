import Reservation from "#models/reservation"
import type { HttpContext } from "@adonisjs/core/http"

export default class ReservationsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const reservations = await Reservation.all()
    return response.json(reservations)
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only([
      "accommodationId",
      "userId",
      "checkIn",
      "checkOut",
      "totalPrice",
    ])
    const reservation = await Reservation.create(data)
    return response.status(201).json(reservation)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const reservation = await Reservation.findOrFail(params.id)
    return response.json(reservation)
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const reservation = await Reservation.findOrFail(params.id)
    const data = request.only([
      "accommodationId",
      "userId",
      "checkIn",
      "checkOut",
      "totalPrice",
    ])
    reservation.merge(data)
    await reservation.save()
    return response.json(reservation)
  }

  /**
   * Delete record
   */
  async destroy({ response, params }: HttpContext) {
    const reservation = await Reservation.findOrFail(params.id)
    await reservation.delete()
    return response.status(204)
  }
}
