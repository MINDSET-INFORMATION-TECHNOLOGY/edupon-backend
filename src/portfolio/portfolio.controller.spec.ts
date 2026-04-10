jest.mock('./portfolio.service', () => ({
  PortfolioService: class {
    create = jest.fn();
    findOne = jest.fn();
    update = jest.fn();
  },
}));

import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

describe('PortfolioController', () => {
  let controller: PortfolioController;
  let service: PortfolioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioController],
      providers: [PortfolioService],
    }).compile();

    controller = module.get<PortfolioController>(PortfolioController);
    service = module.get<PortfolioService>(PortfolioService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('calls service.create with userId and dto', async () => {
      const dto = { fullName: 'Jane', email: 'j@j.com', bio: '', skills: [], portfolioLink: '' } as any;
      const req = { user: { userId: 7 } };
      const result = { id: 1, userId: 7, ...dto };
      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      await expect(controller.create(dto, req)).resolves.toEqual(result);
      expect(service.create).toHaveBeenCalledWith(7, dto);
    });
  });

  describe('findOne', () => {
    it('calls service.findOne with numeric id', async () => {
      const portfolio = { id: 3, userId: 7 };
      jest.spyOn(service, 'findOne').mockResolvedValue(portfolio as any);

      await expect(controller.findOne('3')).resolves.toEqual(portfolio);
      expect(service.findOne).toHaveBeenCalledWith(3);
    });
  });

  describe('update', () => {
    it('calls service.update with userId, numeric id, and dto', async () => {
      const dto = { bio: 'Updated' } as any;
      const req = { user: { userId: 7 } };
      const updated = { id: 3, userId: 7, bio: 'Updated' };
      jest.spyOn(service, 'update').mockResolvedValue(updated as any);

      await expect(controller.update('3', dto, req)).resolves.toEqual(updated);
      expect(service.update).toHaveBeenCalledWith(7, 3, dto);
    });
  });
});
