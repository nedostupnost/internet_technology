class currency
{
    constructor(currency)
    {
        this.currency = currency;
        this.arrCurrencyExchangeRate = [];
    }

    addCurrencyExchangeRate(date, currency)
    {
        this.arrCurrencyExchangeRate.push({date, currency});
    }

    getCurrencyExchangeRate()
    {
        return this.arrCurrencyExchangeRate;
    }
}

class typeOfExpenses 
{
    constructor(typeOfExpenses)
    {
        this.typeOfExpenses = typeOfExpenses;
    }
}

class typeOfRevenue
{
    constructor(typeOfRevenue)
    {
        this.typeOfRevenue = typeOfRevenue;
    }
}

class expenses
{
    constructor(typeOfCurrency, typeOfExpenses, date, value)
    {
        this.typeOfCurrency = typeOfCurrency;
        this.typeOfExpenses = typeOfExpenses;
        this.date = date;
        this.value = value;
    }
}

class revenue
{
    constructor(typeOfCurrency, typeOfRevenue, date, value)
    {
        this.typeOfCurrency = typeOfCurrency;
        this.typeOfRevenue = typeOfRevenue;
        this.date = date;
        this.value = value;
    }
}

class budget
{
    constructor()
    {
        this.arrCurrency = [];
        this.arrTypeOfExpenses = [];
        this.arrTypeOfRevenue = [];
        this.arrRevenue = [];
        this.arrExpense = [];
    }

    addCurrency(cur)
    {
        this.arrCurrency.push(new currency(cur));
    }

    getCurrency()
    {
        return this.arrCurrency;
    }

    removeCurrency(currency)
    {
        this.arrCurrency = this.arrCurrency.filter(tmp => tmp !== currency);
    }

    updateCurrency(currency, newCurrency)
    {
        temp = this.arrCurrency.find(tmp => tmp.currency === currency);
        if (temp)
        {
            tmp.currency = newCurrency;
        }
    }

    addTypeOfExpenses(typeOfExp)
    {
        this.arrTypeOfExpenses.push(new typeOfExpenses(typeOfExp));
    }

    getTypeOfExpenses()
    {
        return this.arrTypeOfExpenses;
    }

    removeTypeOfExpenses(typeOfExpenses)
    {
        this.arrTypeOfExpenses= this.arrTypeOfexpenses.filter(tmp => tmp.typeOfExpenses !== typeOfExpenses);
    }

    updateTypeOfExpenses(typeOfExpense, newTypeofExpense)
    {
        temp = this.arrTypeOfExpenses.find(tmp => tmp.typeOfExpense === typeOfExpense);
        if (temp)
        {
            temp.typeOfExpense = newTypeofExpense;
        }
    }

    addTypeOfRevenue(typeOfRevenue)
    {
        this.arrTypeOfRevenue.push(new typeOfRevenue(typeOfRevenue));
    }

    getTypeOfRevenue()
    {
        return this.arrTypeOfRevenue;
    }

    removeTypeOfRevenue(typeOfRevenue)
    {
        this.arrTypeOfRevenue = this.arrTypeOfRevenue.filter(tmp => tmp !== typeOfRevenue)
    }

    updateTypeOfRevenue(typeOfRevenue, newTypeOfRevenue)
    {
        temp = this.arrTypeOfRevenue.find(tmp => tmp.typeOfRevenue === typeOfRevenue);
        if(temp)
        {
            temp.typeOfRevenue = newTypeOfRevenue;
        }
    }

    addRevenue(value, typeOfRevenue, date, currency)
    {
        tmp = new tmp(value, typeOfRevenue, date, currency);
        this.arrRevenue.push(tmp);
    }

    getRevenue()
    {
        return this.arrRevenue;
    }

    updateRevenue(oldValue, newValue, newTypeOfRevenue, newDate, newCurrency)
    {
        tmp = this.arrRevenue.find(tp => tp.value === oldValue);
        if (tmp)
        {
            tmp.value = newValue;
            tmp.typeOfRevenue = newTypeOfRevenue;
            tmp.date = newDate;
            tmp.currency = newCurrency;
        }
    }

    removeRevenue(value)
    {
        this.arrRevenue.splice(value, 1);
    }

    addExpenses(value, typeOfExpenses, date, currency)
    {
        tmp = new expenses(value, typeOfExpenses, date, currency);
        this.arrExpense.push(tmp);
    }

    getExpenses()
    {
        return this.arrExpense;
    }

    updateExpenses(oldValue, newValue, newTypeOfExpenses, newDate, newCurrency)
    {
        tmp = this.arrExpense.find(tp => tp.value === oldValue);
        if (tmp)
            {
                tmp.value = newValue;
                tmp.typeOfExpenses = newTypeOfExpenses;
                tmp.date = newDate;
                tmp.currency = newCurrency;
            }
    }

    removeExpenses(value)
    {
        this.arrExpense.splice(value, 1);
    }

    getBalance(start, end)
    {
        totalRevenue = this.arrRevenue.filter(tp => new Date(tp.date) >= new Date(start) && new Date(tp.date) <= new Date(end)).reduce((sum, tp) => sum + tp.value, 0);
        totalExpenses = this.arrExpense.filter(tp => new Date(tp.date) >= new Date(start) && new Date(tp.date) <= new Date(end)).reduce((sum, tp) => sum + tp.value, 0);

        return totalRevenue - totalExpenses;
    }

    filterExpensesAndReveneu(type, start, end, isRevenue = true)
    {
        transactions = isRevenue ? this.arrRevenue : this.arrExpense;
        return transactions.filter(tp => tp.type === type && new Date(tp.date) >= new Date(start) && new Date(tp.date) <= new Date(end));
    }
}

budget = new budget();

budget.addCurrency('ЮАНИ');

budget.addTypeOfExpenses('Рис');

budget.addTypeOfRevenue('Онли');

budget.addRevenue(1488, 'Онли', '2024-10-01', 'ЮАНИ');

budget.addExpenses(244, 'Рис', '2024-10-02', 'ЮАНИ');

console.log('Баланс за октябрь:', budget.getBalance('2024-10-01', '2024-10-31'));

console.log('Фильтр расходов за октябрь:', budget.filterTransactions('Food', '2024-10-01', '2024-10-31', false));
