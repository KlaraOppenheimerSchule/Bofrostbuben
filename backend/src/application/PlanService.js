const Plan = require("../domain/Plan");

class PlanService {
  constructor(planRepository) {
    this.planRepository = planRepository;
  }

  /**
   * Create a new Plan entity and store it using the repository.
   */
  async createPlan({ days }) {
    const plan = new Plan({
      days,
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
  async editPlan(planId, { days }) {
    return await this.planRepository.update(planId, { days });
  }
}

module.exports = PlanService;