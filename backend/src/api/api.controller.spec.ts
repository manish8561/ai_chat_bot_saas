import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';

describe('ApiController', () => {
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
    }).compile();

    controller = module.get<ApiController>(ApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('call api for health check', () => {
    it('should return message ok for successfull', async () => {
      const result = {
        message: 'OK',
        time: Date.now(),
      };

      expect(controller.healthCheck()).toStrictEqual(result);
    });
  });
});
