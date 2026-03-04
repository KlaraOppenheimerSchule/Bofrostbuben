import { describe, it, expect, beforeEach, vi } from 'vitest';
import ExerciseController from '../../src/adapters/http/ExerciseController.js';

describe('ExerciseController', () => {
  let exerciseController;
  let mockExerciseService;
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    // Mock the exercise service
    mockExerciseService = {
      getAllExercises: vi.fn(),
      createExercise: vi.fn(),
    };

    // Mock the request object
    mockRequest = {
      body: {},
    };

    // Mock the response object
    mockResponse = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
    };

    // Create controller instance with mocked service
    exerciseController = new ExerciseController(mockExerciseService);
  });

  describe('handleGetExercises', () => {
    it('should return all exercises successfully', async () => {
      // Arrange
      const mockExercises = [
        { id: 1, name: 'Push-ups', category: 'chest' },
        { id: 2, name: 'Squats', category: 'legs' },
      ];
      mockExerciseService.getAllExercises.mockResolvedValue(mockExercises);

      // Act
      await exerciseController.handleGetExercises(mockRequest, mockResponse);

      // Assert
      expect(mockExerciseService.getAllExercises).toHaveBeenCalledOnce();
      expect(mockResponse.json).toHaveBeenCalledWith(mockExercises);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should handle service errors with default 500 status code', async () => {
      // Arrange
      const error = new Error('Database error');
      mockExerciseService.getAllExercises.mockRejectedValue(error);

      // Act
      await exerciseController.handleGetExercises(mockRequest, mockResponse);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Database error',
      });
    });

    it('should handle service errors with custom status code', async () => {
      // Arrange
      const error = new Error('Exercise not found');
      error.status = 404;
      mockExerciseService.getAllExercises.mockRejectedValue(error);

      // Act
      await exerciseController.handleGetExercises(mockRequest, mockResponse);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Exercise not found',
      });
    });

    it('should handle errors without message property', async () => {
      // Arrange
      const error = {};
      mockExerciseService.getAllExercises.mockRejectedValue(error);

      // Act
      await exerciseController.handleGetExercises(mockRequest, mockResponse);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Failed to fetch exercise: internal server error',
      });
    });
  });

  describe('handleCreateExercise', () => {
    it('should create an exercise successfully', async () => {
      // Arrange
      const exerciseData = {
        name: 'Bench Press',
        category: 'chest',
        difficulty: 'intermediate',
      };
      mockRequest.body = exerciseData;

      const createdExercise = {
        id: 1,
        ...exerciseData,
      };
      mockExerciseService.createExercise.mockResolvedValue(createdExercise);

      // Act
      await exerciseController.handleCreateExercise(mockRequest, mockResponse);

      // Assert
      expect(mockExerciseService.createExercise).toHaveBeenCalledWith(
        exerciseData
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdExercise);
    });

    it('should handle creation errors with default 500 status code', async () => {
      // Arrange
      const exerciseData = { name: 'Invalid Exercise' };
      mockRequest.body = exerciseData;

      const error = new Error('Validation failed');
      mockExerciseService.createExercise.mockRejectedValue(error);

      // Act
      await exerciseController.handleCreateExercise(mockRequest, mockResponse);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Validation failed',
      });
    });

    it('should handle creation errors with custom status code', async () => {
      // Arrange
      const exerciseData = { name: 'Duplicate Exercise' };
      mockRequest.body = exerciseData;

      const error = new Error('Exercise already exists');
      error.status = 409;
      mockExerciseService.createExercise.mockRejectedValue(error);

      // Act
      await exerciseController.handleCreateExercise(mockRequest, mockResponse);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Exercise already exists',
      });
    });

    it('should handle errors without message property', async () => {
      // Arrange
      mockRequest.body = {};
      const error = {};
      mockExerciseService.createExercise.mockRejectedValue(error);

      // Act
      await exerciseController.handleCreateExercise(mockRequest, mockResponse);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Failed to create exercise: internal server error',
      });
    });

    it('should handle request with empty body', async () => {
      // Arrange
      mockRequest.body = undefined;
      const createdExercise = { id: 1 };
      mockExerciseService.createExercise.mockResolvedValue(createdExercise);

      // Act
      await exerciseController.handleCreateExercise(mockRequest, mockResponse);

      // Assert
      expect(mockExerciseService.createExercise).toHaveBeenCalledWith({});
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdExercise);
    });
  });
});
