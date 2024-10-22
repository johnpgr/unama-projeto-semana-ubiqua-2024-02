import Accommodation from "#models/accommodation"
import type { HttpContext } from "@adonisjs/core/http"

export default class AccommodationsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const accommodations = await Accommodation.all()
    return response.json(accommodations)
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(["name", "type", "capacity", "price"])
    const accommodation = await Accommodation.create(data)
    return response.status(201).json(accommodation)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
