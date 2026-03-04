const Plan = require("../domain/Plan");

class PlanService {
  constructor(planRepository) {
    this.planRepository = planRepository;
  }

  /**
   * Create a new Plan entity and store it using the repository.
   */
  async createPlan({ name, sessionsPerWeek, days, exercises }) {
    const plan = new Plan({
      name,
      sessionsPerWeek,
      days,
      exercises,
    });

    return await this.planRepository.save(plan);
  }

  /**
   * Return a list of all stored plans.
   */
  async getAllPlans() {
    return await this.planRepository.findAll();
  }

  /**
   * Update an existing plan with the given ID using the provided data.
   */
  async editPlan(planId, { name, sessionsPerWeek, days, exercises }) {
    return await this.planRepository.update(planId, { name, sessionsPerWeek, days, exercises });
  }
}

module.exports = PlanService;