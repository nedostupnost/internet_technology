class Currency
{
    constructor(currency)
    {
        this.currency = currency;
        this.arrCurrencyExchangeRate = [];
    }

    addCurrencyExchangeRate(date, rateOfCurrency)
    {
        this.arrCurrencyExchangeRate.push({ date, rateOfCurrency });
    }

    getCurrencyExchangeRate()
    {
        return this.arrCurrencyExchangeRate;
    }
}

class TypeOfExpenses
{
    constructor(typeOfExpenses)
    {
        this.typeOfExpenses = typeOfExpenses;
    }
}

class TypeOfRevenue
{
    constructor(typeOfRevenue)
    {
        this.typeOfRevenue = typeOfRevenue;
    }
}

class Expenses
{
    constructor(value, typeOfExpenses, date, currency)
    {
        this.value = value;
        this.typeOfExpenses = typeOfExpenses;
        this.date = date;
        this.currency = currency;
    }
}

class Revenue
{
    constructor(value, typeOfRevenue, date, currency)
    {
        this.value = value;
        this.typeOfRevenue = typeOfRevenue;
        this.date = date;
        this.currency = currency;
    }
}

class Budget
{
    constructor()
    {
        this.arrCurrency = [];
        this.arrTypeOfExpenses = [];
        this.arrTypeOfRevenue = [];
        this.arrRevenue = [];
        this.arrExpenses = [];
    }

    addCurrency(currency)
    {
        this.arrCurrency.push(new Currency(currency));
    }

    getCurrency()
    {
        return this.arrCurrency;
    }

    removeCurrency(currency)
    {
        this.arrCurrency = this.arrCurrency.filter(tmp => tmp.currency !== currency);
    }

    updateCurrency(currency, newCurrency)
    {
        const temp = this.arrCurrency.find(tmp => tmp.currency === currency);
        if (temp)
        {
            temp.currency = newCurrency;
        }
    }

    addTypeOfExpenses(typeOfExpenses)
    {
        this.arrTypeOfExpenses.push(new TypeOfExpenses(typeOfExpenses));
    }

    getTypeOfExpenses()
    {
        return this.arrTypeOfExpenses;
    }

    removeTypeOfExpenses(typeOfExpenses)
    {
        this.arrTypeOfExpenses = this.arrTypeOfExpenses.filter(tmp => tmp.typeOfExpenses !== typeOfExpenses);
    }

    updateTypeOfExpenses(typeOfExpense, newTypeOfExpense)
    {
        const temp = this.arrTypeOfExpenses.find(tmp => tmp.typeOfExpenses === typeOfExpense);
        if (temp)
        {
            temp.typeOfExpenses = newTypeOfExpense;
        }
    }

    addTypeOfRevenue(typeOfRevenue)
    {
        this.arrTypeOfRevenue.push(new TypeOfRevenue(typeOfRevenue));
    }

    getTypeOfRevenue()
    {
        return this.arrTypeOfRevenue;
    }

    removeTypeOfRevenue(typeOfRevenue)
    {
        this.arrTypeOfRevenue = this.arrTypeOfRevenue.filter(tmp => tmp.typeOfRevenue !== typeOfRevenue);
    }

    updateTypeOfRevenue(typeOfRevenue, newTypeRevenue)
    {
        const temp = this.arrTypeOfRevenue.find(tmp => tmp.typeOfRevenue === typeOfRevenue);
        if (temp)
        {
            temp.typeOfRevenue = newTypeRevenue;
        }
    }

    addRevenue(value, typeOfRevenue, date, currency)
    {
        const tmp = new Revenue(value, typeOfRevenue, date, currency);
        this.arrRevenue.push(tmp);
    }

    getRevenue()
    {
        return this.arrRevenue;
    }

    updateRevenue(oldValue, newValue, newTypeOfRevenue, newDate, newCurrency)
    {
        const tmp = this.arrRevenue.find(tp => tp.value === oldValue);
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
        this.arrRevenue = this.arrRevenue.filter(tmp => tmp.value !== value);
    }

    addExpenses(value, typeOfExpenses, date, currency)
    {
        const tmp = new Expenses(value, typeOfExpenses, date, currency);
        this.arrExpenses.push(tmp);
    }

    getExpenses()
    {
        return this.arrExpenses;
    }

    updateExpenses(oldValue, newValue, newTypeOfExpenses, newDate, newCurrency)
    {
        const tmp = this.arrExpenses.find(tp => tp.value === oldValue);
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
        this.arrExpenses = this.arrExpenses.filter(tmp => tmp.value !== value);
    }

    getBalance(start, end)
    {
        const totalRevenue = this.arrRevenue.filter(tp => new Date(tp.date) >= new Date(start) && new Date(tp.date) <= new Date(end)).reduce((sum, tp) => sum + tp.value, 0);
        const totalExpenses = this.arrExpenses.filter(tp => new Date(tp.date) >= new Date(start) && new Date(tp.date) <= new Date(end)).reduce((sum, tp) => sum + tp.value, 0);
        return totalRevenue - totalExpenses;
    }

    filterExpensesAndRevenue(type, start, end, isRevenue = true)
    {
        const transactions = isRevenue ? this.arrRevenue : this.arrExpenses;
        return transactions.filter(tp => (isRevenue ? tp.typeOfRevenue : tp.typeOfExpenses) === type && new Date(tp.date) >= new Date(start) && new Date(tp.date) <= new Date(end));
    }
}

const budget = new Budget();

budget.addCurrency('ЮАНИ');
budget.addTypeOfExpenses('Рис');
budget.addTypeOfRevenue('Онли');

budget.addRevenue(1488, 'Онли', '2024-10-01', 'ЮАНИ');
budget.addExpenses(244, 'Рис', '2024-10-02', 'ЮАНИ');

console.log('Баланс за октябрь:', budget.getBalance('2024-10-01', '2024-10-31'));
console.log('Фильтр расходов за октябрь:', budget.filterExpensesAndRevenue('Рис', '2024-10-01', '2024-10-31', false));

budget.addRevenue(240, 'Онли', '2024-10-02', 'ЮАНИ');

console.log('Фильтр расходов за октябрь:', budget.filterExpensesAndRevenue('Рис', '2024-10-01', '2024-10-31', false));

budget.removeExpenses(244);
console.log('Баланс за октябрь:', budget.getBalance('2024-10-01', '2024-10-31'));