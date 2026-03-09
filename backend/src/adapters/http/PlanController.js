class PlanController {
    constructor(planService) {
      this.planService = planService;
    }
  
    async handleGetPlans(request, response) {
      const planList = await this.planService.getAllPlans();
      response.json(planList);
    }
  
    async handleCreatePlan(request, response) {
      const planData = request.body || {};

      if (!planData.days || !Array.isArray(planData.days)) {
        const err = new Error("Invalid plan data: 'days' must be an array");
        err.status = 400;
        throw err;
      }

      const createdPlan = await this.planService.createPlan(planData);
      response.status(201).json(createdPlan);
    }

    async handleEditPlan(request, response) {
      const planId = request.params.id;
      const planData = request.body || {};

      if (!planData.days || !Array.isArray(planData.days)) {
        const err = new Error("Invalid plan data: 'days' must be an array");
        err.status = 400;
        throw err;
      }

      const updatedPlan = await this.planService.editPlan(planId, planData);
      response.status(201).json(updatedPlan);
    }

    async handleDeletePlan(request, response) {
        const planId = request.params.id;
        await this.planService.deletePlan(planId);
        response.status(204).send();
    }
}
  module.exports = PlanController;