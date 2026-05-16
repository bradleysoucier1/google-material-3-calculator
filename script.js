class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetDisplay = false;
        
        this.setupEventListeners();
        this.setupKeyboardSupport();
        this.updateDisplay();
    }

    setupEventListeners() {
        // Number buttons
        document.querySelectorAll('[data-number]').forEach(btn => {
            btn.addEventListener('click', () => this.handleNumber(btn.dataset.number));
        });

        // Operator buttons
        document.querySelectorAll('[data-operator]').forEach(btn => {
            btn.addEventListener('click', () => this.handleOperator(btn.dataset.operator));
        });

        // Function buttons
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', () => this.handleAction(btn.dataset.action));
        });
    }

    setupKeyboardSupport() {
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    handleKeyboard(e) {
        // Numbers
        if (e.key >= '0' && e.key <= '9') {
            this.handleNumber(e.key);
        }
        // Decimal
        else if (e.key === '.') {
            e.preventDefault();
            this.handleNumber('.');
        }
        // Operations
        else if (e.key === '+') {
            e.preventDefault();
            this.handleOperator('+');
        }
        else if (e.key === '-') {
            e.preventDefault();
            this.handleOperator('-');
        }
        else if (e.key === '*') {
            e.preventDefault();
            this.handleOperator('*');
        }
        else if (e.key === '/') {
            e.preventDefault();
            this.handleOperator('/');
        }
        // Calculate
        else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            this.handleAction('equals');
        }
        // Delete
        else if (e.key === 'Backspace') {
            e.preventDefault();
            this.handleAction('delete');
        }
        // Clear
        else if (e.key === 'Escape') {
            e.preventDefault();
            this.handleAction('clear');
        }
        // Percentage
        else if (e.key === '%') {
            e.preventDefault();
            this.handleAction('percentage');
        }
    }

    handleNumber(num) {
        // If we should reset the display, start fresh
        if (this.shouldResetDisplay) {
            this.currentValue = num === '.' ? '0.' : num;
            this.shouldResetDisplay = false;
        } else {
            // Prevent multiple decimals
            if (num === '.' && this.currentValue.includes('.')) {
                return;
            }
            // Prevent leading zeros
            if (this.currentValue === '0' && num !== '.') {
                this.currentValue = num;
            } else {
                this.currentValue += num;
            }
        }
        this.updateDisplay();
    }

    handleOperator(op) {
        // If there's a pending operation, calculate it first
        if (this.operation !== null && !this.shouldResetDisplay) {
            this.calculate();
        }

        this.previousValue = this.currentValue;
        this.operation = op;
        this.shouldResetDisplay = true;
    }

    handleAction(action) {
        switch (action) {
            case 'clear':
                this.currentValue = '0';
                this.previousValue = '';
                this.operation = null;
                this.shouldResetDisplay = false;
                break;
            case 'delete':
                if (this.currentValue.length > 1) {
                    this.currentValue = this.currentValue.slice(0, -1);
                } else {
                    this.currentValue = '0';
                }
                break;
            case 'percentage':
                this.handlePercentage();
                break;
            case 'equals':
                this.calculate();
                break;
        }
        this.updateDisplay();
    }

    handlePercentage() {
        const current = parseFloat(this.currentValue);
        if (this.operation && this.previousValue !== '') {
            // Calculate percentage of previous value
            const previous = parseFloat(this.previousValue);
            this.currentValue = String((previous * current) / 100);
        } else {
            // Just convert to percentage
            this.currentValue = String(current / 100);
        }
    }

    calculate() {
        if (this.operation === null || this.previousValue === '') {
            return;
        }

        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);

        let result;

        try {
            switch (this.operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        this.displayError();
                        return;
                    }
                    result = prev / current;
                    break;
                default:
                    return;
            }

            // Round to avoid floating point errors
            result = Math.round(result * 100000000) / 100000000;
            this.currentValue = String(result);
        } catch (e) {
            this.displayError();
            return;
        }

        this.operation = null;
        this.previousValue = '';
        this.shouldResetDisplay = true;
    }

    displayError() {
        this.currentValue = 'Error';
        this.operation = null;
        this.previousValue = '';
        this.shouldResetDisplay = true;
    }

    updateDisplay() {
        // Format large numbers with commas
        let displayValue = this.currentValue;
        
        if (displayValue !== 'Error' && !isNaN(displayValue) && displayValue !== '') {
            const number = parseFloat(displayValue);
            if (number >= 1000 || number <= -1000) {
                displayValue = new Intl.NumberFormat('en-US', {
                    maximumFractionDigits: 10
                }).format(number);
            }
        }

        this.display.value = displayValue;
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
