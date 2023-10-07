class Expense {
  amount: number;
  date: Date;
  description: string;
  id?: string;

  // prettier-ignore
  constructor(amount: number, date: Date, description: string, id?: string) {
    this.amount = amount;
    this.date = date;
    this.description = description;
    this.id = id;
  }
}

export default Expense;
