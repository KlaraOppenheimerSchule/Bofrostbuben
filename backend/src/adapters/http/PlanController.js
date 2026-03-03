class PlanController {
    constructor(planService) {
      this.planService = planService;
    }
  
    async handleGetPlans(request, response) {
      try {
        const planList = await this.planService.getAllPlans();
        response.json(planList);
      } catch (error) {
        throw error;
      }
    }
  
    async handleCreatePlan(request, response) {
      try {
        const planData = request.body || {};
  
        if (!planData.days || !Array.isArray(planData.days)) {
          const err = new Error("Invalid plan data: 'days' must be an array");
          err.status = 400;
          throw err;
        }
  
        const createdPlan = await this.planService.createPlan(planData);
        response.status(201).json(createdPlan);
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = PlanController;