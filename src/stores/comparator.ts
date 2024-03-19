import { defineStore } from 'pinia';

const useComparator = defineStore('comparator', {
    state : () => ({
        cost: 200000,
        amountLoaned: 214000,
        rate: 3,
        notaryFees: 14000,
        nbYears: 30,
        yearlyGain: 18000,
        charges: 2500,
        interests: [] as number[],
        totalInterests: 0,
        amortissement: 0,
        taxes: [] as number[],
        maxYears: 25
    }),

    getters : {
        
    },

    actions : {
        getYears() {
            return this.nbYears <= this.maxYears ? this.nbYears : this.maxYears;
        },
        calculateMonthlyPayment () {
            const numberOfPayments = this.getYears() * 12;
            const monthlyInterestRate = this.rate / 100 / 12;
            const monthlyPayment = (this.amountLoaned * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

            return monthlyPayment.toFixed(2);
        },
        calculateInterests() {
            const monthlyPayment = this.calculateMonthlyPayment();

            let restCost = this.amountLoaned;
            for (let year = 1; year <= this.getYears(); year++) {
                let yearlyInterest = 0;
                for (let month = 1; month <= 12; month++) {
                    const monthlyInterest = restCost * this.rate / 100 / 12;
                    yearlyInterest = yearlyInterest + monthlyInterest;
                    const monthlyCapitalPayment = parseFloat(monthlyPayment) - monthlyInterest;
                    restCost = restCost - monthlyCapitalPayment;
                }
                this.interests.push(yearlyInterest);
            }
            this.totalInterests = this.interests.reduce((a, b) => a + b, 0);
        },
        calculateImposition() {
            this.taxes = [];
            this.amortissement = this.cost / this.getYears();
            let negativTaxe = this.notaryFees;
            for (let year = 0; year < this.nbYears; year++) {
                const yearlyInterest = this.interests[year] ?? 0;
                const taxe = this.yearlyGain - this.charges - yearlyInterest - this.amortissement - negativTaxe;
                if (taxe > 0) {
                    this.taxes.push(taxe * 15 / 100);
                    negativTaxe = 0;
                } else {
                    this.taxes.push(0);
                    negativTaxe = Math.abs(taxe);
                }
                if (year == 29) {
                    this.amortissement = 0;
                }
            }
        }
    }
})

export default useComparator;