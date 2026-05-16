class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.historyList = document.getElementById('historyList');
        this.historyToggle = document.getElementById('historyToggle');
        this.historyPanel = document.getElementById('historyPanel');
        this.clearHistoryBtn = document.getElementById('clearHistory');
        
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetDisplay = false;
        this.history = [];
        
        this.setupEventListeners();
        this.setupKeyboardSupport();
        this.setupHistoryToggle();
        this.loadHistory();
        this.updateDisplay();
    }

    setupEventListeners() {
        // Wait for Material Web Components to be ready
        customElements.whenDefined('md-filled-button').then(() => {
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
        });
    }

    setupKeyboardSupport() {
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    setupHistoryToggle() {
        this.historyToggle.addEventListener('click', () => {
            this.historyPanel.classList.toggle('active');
        });
        
        this.clearHistoryBtn.addEventListener('click', () => {
            this.history = [];
            this.historyList.innerHTML = '';
            localStorage.removeItem('calculatorHistory');
        });
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
        let operationSymbol = this.operation;

        try {
            switch (this.operation) {
                case '+':
                    result = prev + current;
                    operationSymbol = '+';
                    break;
                case '-':
                    result = prev - current;
                    operationSymbol = '−';
                    break;
                case '*':
                    result = prev * current;
                    operationSymbol = '×';
                    break;
                case '/':
                    if (current === 0) {
                        this.displayError();
                        return;
                    }
                    result = prev / current;
                    operationSymbol = '÷';
                    break;
                default:
                    return;
            }

            // Round to avoid floating point errors
            result = Math.round(result * 100000000) / 100000000;
            
            // Add to history
            this.addToHistory(`${prev} ${operationSymbol} ${current} = ${result}`);
            
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

    addToHistory(entry) {
        this.history.unshift(entry);
        if (this.history.length > 10) {
            this.history.pop();
        }
        this.saveHistory();
        this.updateHistoryDisplay();
    }

    saveHistory() {
        try {
            localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
        } catch (e) {
            console.warn('Failed to save history:', e);
        }
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem('calculatorHistory');
            if (saved) {
                this.history = JSON.parse(saved);
                this.updateHistoryDisplay();
            }
        } catch (e) {
            console.warn('Failed to load history:', e);
        }
    }

    updateHistoryDisplay() {
        this.historyList.innerHTML = '';
        this.history.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry;
            li.addEventListener('click', () => {
                const result = entry.split('=')[1].trim();
                this.currentValue = result;
                this.updateDisplay();
                this.historyPanel.classList.remove('active');
            });
            this.historyList.appendChild(li);
        });
    }

    updateDisplay() {
        // Format large numbers with commas
        let displayValue = this.currentValue;
        
        if (displayValue !== 'Error' && !isNaN(displayValue) && displayValue !== '') {
            const number = parseFloat(displayValue);
            if (Math.abs(number) >= 1000 || (number !== 0 && Math.abs(number) < 0.001)) {
                // Use scientific notation for very small numbers
                if (Math.abs(number) < 0.001 && number !== 0) {
                    displayValue = number.toExponential(6);
                } else {
                    displayValue = new Intl.NumberFormat('en-US', {
                        maximumFractionDigits: 10
                    }).format(number);
                }
            }
        }

        this.display.value = displayValue;
    }
}

// Initialize calculator
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
