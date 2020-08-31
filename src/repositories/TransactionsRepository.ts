import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acc, item) => {
      if (item.type === 'income') return acc + item.value;
      return acc + 0;
    }, 0);

    const outcome = this.transactions.reduce((acc, item) => {
      if (item.type === 'outcome') return acc + item.value;
      return acc + 0;
    }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };

    // throw Error('Transactions is empty');
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
