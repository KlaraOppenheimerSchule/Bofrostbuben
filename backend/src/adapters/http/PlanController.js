class PlanController {
    constructor(planService) {
      this.planService = planService;
    }
  
    async handleGetPlans(request, response) {
      try {
        const planList = await this.planService.getAllPlans();
        response.json(planList);
        return;
      } catch (error) {
        console.error("Failed to fetch plan list:", error);
        response
          .status(error.status || 500)
          .json({ error: error.message || "internal server error" });
      }
    }
  
    async handleCreatePlan(request, response) {
      try {
        const planData = request.body || {};
        const createdPlan = await this.planService.createPlan(planData);
        response.status(201).json(createdPlan);
        return;
      } catch (error) {
        console.error("Failed to create plan:", error);
        response
          .status(error.status || 500)
          .json({ error: error.message || "internal server error" });
      }
    }
  }
  
  module.exports = PlanController;