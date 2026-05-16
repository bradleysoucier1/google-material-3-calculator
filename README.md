# Material 3 HTML Calculator

A modern, responsive calculator built with Google Material 3 design principles. Features a clean interface with full keyboard support and dark mode compatibility.

## 🎨 Features

- **Material 3 Design System**: Modern color palette and typography following Google's latest design standards
- **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop devices
- **Dark Mode Support**: Automatically adapts to system color scheme preferences
- **Keyboard Support**: Complete keyboard controls for enhanced productivity
- **Beautiful UI**: Smooth animations, elevation shadows, and intuitive layout
- **Error Handling**: Graceful handling of edge cases (division by zero, etc.)
- **Accessibility**: Focus indicators and semantic HTML for screen readers
- **No Dependencies**: Pure vanilla JavaScript, HTML, and CSS

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Number input |
| `.` | Decimal point |
| `+`, `-`, `*`, `/` | Operations |
| `Enter` or `=` | Calculate result |
| `Backspace` | Delete last character |
| `Escape` | Clear all (AC) |
| `%` | Percentage |

## 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/bradleysoucier1/google-material-3-calculator.git
   cd google-material-3-calculator
   ```

2. Open `index.html` in your web browser:
   - Using a local server (recommended):
     ```bash
     python -m http.server 8000
     # or
     npx http-server
     ```
   - Or simply double-click `index.html`

3. Start calculating! 🧮

## 📱 Usage

### Basic Operations
- **Addition**: `5 + 3 =` → `8`
- **Subtraction**: `10 - 4 =` → `6`
- **Multiplication**: `6 × 7 =` → `42`
- **Division**: `20 ÷ 4 =` → `5`

### Advanced Features
- **Percentage**: `50 % =` → `0.5` (or calculate percentage of a number)
- **Decimal**: `3.14 + 2.86 =` → `6`
- **Delete**: Use DEL button or Backspace to remove last digit
- **Clear**: Use AC button or Escape key to reset

## 🎨 Customization

### Material 3 Color Tokens

Edit the CSS variables in `style.css` to customize colors:

```css
:root {
    --md-sys-color-primary: #6750a4;
    --md-sys-color-secondary: #625b71;
    --md-sys-color-tertiary: #7d5260;
    --md-sys-color-error: #b3261e;
    /* ... more colors ... */
}
```

### Typography

Modify the typography settings to match your brand:

```css
--md-sys-typescale-body-large-font-size: 16px;
--md-sys-typescale-body-large-font-weight: 500;
```

## 🌙 Dark Mode

The calculator automatically detects and respects the user's system dark mode preference using:

```css
@media (prefers-color-scheme: dark) {
    /* Dark mode colors */
}
```

Users can also toggle dark mode in their system settings, and the calculator will update instantly.

## 📱 Responsive Design

- **Desktop** (> 400px): Full-size layout with comfortable spacing
- **Tablet** (≤ 400px): Optimized layout with adjusted sizes
- **Mobile** (≤ 320px): Compact layout for small screens

## 🧪 Testing

Try these operations to verify functionality:

1. **Basic math**: `25 + 17 = 42`
2. **Chain operations**: `10 + 5 - 3 × 2 ÷ 1 = 11`
3. **Decimals**: `3.14159 + 2.85841 = 6`
4. **Percentage**: `200 × 15% = 30`
5. **Error handling**: `1 ÷ 0` → Shows "Error"
6. **Keyboard**: Use numeric keypad or type numbers

## 🔧 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 File Structure

```
google-material-3-calculator/
├── index.html       # HTML structure
├── style.css        # Material 3 styling
├── script.js        # Calculator logic
└── README.md        # This file
```

## 💡 Implementation Details

### Calculator Class

The calculator is implemented using a single `Calculator` class that:

1. **Manages State**: Tracks current value, previous value, and pending operations
2. **Handles Input**: Processes number, operator, and function inputs
3. **Calculates Results**: Performs arithmetic operations with proper precedence
4. **Supports Keyboard**: Maps keyboard events to calculator actions
5. **Updates Display**: Keeps the display synchronized with state changes

### Key Methods

- `handleNumber(num)`: Process numeric input
- `handleOperator(operator)`: Handle operation selection
- `calculate()`: Execute pending calculation
- `handleKeyboard(e)`: Process keyboard input
- `updateDisplay()`: Render current value

## 🎯 Features Explained

### Operation Chaining
The calculator supports chaining operations. When you select a new operator before pressing equals, it automatically calculates the previous result.

Example: `10 + 5 × 3 =` calculates as `(10 + 5) × 3 = 45`

### Percentage Calculation
- Standalone: `50%` → `0.5`
- With operation: `200 × 15%` → `30`

### Error Handling
Division by zero displays "Error" and resets the calculator state.

## 🚀 Future Enhancements

Potential features for future versions:
- Scientific calculator mode (sin, cos, tan, log, etc.)
- Calculation history
- Copy result to clipboard
- Themes/skins
- Touch feedback (haptics on mobile)
- Export calculations

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ using Material 3 Design System**
