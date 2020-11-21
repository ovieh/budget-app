import { Test } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';
import { NotFoundException } from '@nestjs/common';
import { MonthService } from '../month/month.service';
import { TransactionDescriptionRepository } from '../transaction-description/transaction-description.repository';
import { TransactionDescriptionService } from '../transaction-description/transaction-description.service';
import { MonthRepository } from '../month/month.repository';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { DateDto } from '../month/DTO/date.dto';

const mockUser = { id: 1, username: 'Bob' };

const mockTransaction = {
  id: '1',
  date: '1/1/2020',
  type: 'deb',
  sortCode: '112233',
  accountNumber: '332211',
  description: 'Fake Transaciton',
  debitAmount: 5.0,
  creditAmount: 0,
  balance: 1000,
};

const mockTransactionRepository = () => ({
  getTransaction: jest.fn(),
  findOne: jest.fn(),
  createTransaction: jest.fn(),
  sumCreditsByMonth: jest.fn(),
  averageCredits: jest.fn(),
});

const mockCategoryRepository = () => ({});
const mockMonthRepository = () => ({});
const mockTransactionDescriptionRepository = () => ({});

describe('TransactionService', () => {
  let transactionService;
  let transactionRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: TransactionRepository,
          useFactory: mockTransactionRepository,
        },
        CategoryService,
        {
          provide: CategoryRepository,
          useFactory: mockCategoryRepository,
        },
        MonthService,
        {
          provide: MonthRepository,
          useFactory: mockMonthRepository,
        },
        TransactionDescriptionService,
        {
          provide: TransactionDescriptionRepository,
          useFactory: mockTransactionDescriptionRepository,
        },
      ],
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
    transactionRepository = await module.get<TransactionRepository>(
      TransactionRepository,
    );
  });

  describe('getTransaction', () => {
    it('gets all the transactions from the repository', async () => {
      transactionRepository.getTransaction.mockResolvedValue('someValue');

      expect(transactionRepository.getTransaction).not.toHaveBeenCalled();
      const result = await transactionRepository.getTransaction(mockUser);
      expect(transactionRepository.getTransaction).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getTransactionById', () => {
    it('calls the transctionRepository.findOne() and successfully retrieves a transaction', async () => {
      transactionRepository.findOne.mockResolvedValue(mockTransaction);
      const result = await transactionService.getTransactionsById(1, mockUser);
      expect(result).toEqual(mockTransaction);
      expect(transactionRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1, userId: mockUser.id },
      });
    });

    it('throws an error as a transaction is not found', async () => {
      transactionRepository.findOne.mockResolvedValue(null);

      expect(
        transactionService.getTransactionsById(1, mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTransaction', () => {
    it('calls transctionRepository.createTransaction() and returns the result', async () => {
      transactionRepository.createTransaction.mockResolvedValue(
        mockTransaction,
      );
      expect(transactionRepository.createTransaction).not.toHaveBeenCalled();

      const createTransactionDto: CreateTransactionDto = {
        date: '1/1/2020',
        type: 'deb',
        sortCode: '112233',
        accountNumber: '332211',
        description: 'Fake Transaciton',
        debitAmount: 5.0,
        creditAmount: 0,
        balance: 1000,
      };

      const result = await transactionRepository.createTransaction(
        createTransactionDto,
        mockUser,
      );
      expect(transactionRepository.createTransaction).toHaveBeenCalledWith(
        createTransactionDto,
        mockUser,
      );
      expect(result).toEqual(mockTransaction);
    });
  });

  describe('sumCreditsByMonth', () => {
    const mockDate: DateDto = { month: 1, year: 2020 };
    it('it returns the sum of the credits for a month', async () => {
      transactionRepository.sumCreditsByMonth.mockResolvedValue(100.0);
      const result = await transactionService.sumCreditsByMonth(mockDate, mockUser.id);

      expect(result).toEqual(100.00);
      // expect(monthRepository.sumCredit)
    });
  });

  describe('averageCredits', () => {
    it('it returns the average credits per month', async () => {
      transactionRepository.averageCredits.mockResolvedValue(100.00);
      const result = await transactionService.averageCredits(mockUser.id);

      expect(result).toEqual(100.00);
      // expect(monthRepository.sumCredit)
    });
  });


  describe('averageDebits', () => {
    it('it returns the average debits per month', async () => {
      transactionRepository.averageDebits.mockResolvedValue(100.00);
      const result = await transactionService.averageDebits(mockUser.id);

      expect(result).toEqual(100.00);
      // expect(monthRepository.sumCredit)
    });
  });
});
