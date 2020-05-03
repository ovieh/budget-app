import { Test } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 1, username: 'Bob' };

const mockTransactionRepository = () => ({
  getTransaction: jest.fn(),
  findOne: jest.fn(),
});

const mockCategoryRepository = () => ({});

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
      ],
    }).compile();

    transactionService = module.get<TransactionService>(
      TransactionService,
    );
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

      expect(transactionService.getTransactionsById(1, mockUser)).rejects.toThrow(NotFoundException);

    });
  });
});
