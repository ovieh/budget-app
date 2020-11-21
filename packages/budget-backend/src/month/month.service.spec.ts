import { Test } from '@nestjs/testing';
import { MonthService } from './month.service';
import { MonthRepository } from './month.repository';
import { DateDto } from './DTO/date.dto';

const mockUser = { id: 1, username: 'Bob' };

const mockMonthRepository = () => ({
  getMonth: jest.fn(),
  findOne: jest.fn(),
  createMonth: jest.fn(),
});

describe('MonthService', () => {
  let monthService;
  let monthRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MonthService,
        {
          provide: MonthRepository,
          useFactory: mockMonthRepository,
        },
      ],
    }).compile();

    monthService = module.get<MonthService>(MonthService);
    monthRepository = await module.get<MonthRepository>(MonthRepository);
  });

  describe('createMonth', () => {
    it('can create an month', async () => {
      monthRepository.createMonth.mockResolvedValue('some value');

      const result = await monthRepository.createMonth(mockUser);

      expect(monthRepository.createMonth).toHaveBeenCalled();
      expect(result).toEqual('some value');
    });
  });


});
