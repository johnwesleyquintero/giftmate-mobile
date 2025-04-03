### Color Palette

1. **Primary Colors:**
   - **Pink:** `#FF6B8B`
   - **Light Pink:** `#FFE6EE`
   - **Orange:** `#FF8E53`

2. **Secondary Colors:**
   - **Gray:** `#8E8E93`
   - **Light Gray:** `#C6C6C8`
   - **Dark Gray:** `#C7C7CC`

3. **Background Colors:**
   - **White:** `#FFFFFF`
   - **Off White:** `#FFF9FB`
   - **Light Background:** `#FFF9F7`

4. **Text Colors:**
   - **Black:** Default text color
   - **Red:** `#FF3B30` (used for logout text)

5. **Shadow Colors:**
   - **Shadow Pink:** `#FF6B8B`

### Example Usage in Styles

Here's how these colors are used in your styles:

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9FB', // Off White
  },
  header: {
    backgroundColor: '#FF6B8B', // Pink
    shadowColor: '#FF6B8B', // Shadow Pink
  },
  button: {
    backgroundColor: '#FF6B8B', // Pink
  },
  buttonText: {
    color: '#FFFFFF', // White
  },
  logoutText: {
    color: '#FF3B30', // Red
  },
  tabBar: {
    backgroundColor: 'white', // White
    borderTopColor: '#FFE6EE', // Light Pink
  },
  optionText: {
    color: '#8E8E93', // Gray
  },
});
```

### Explanation

- **Primary Colors** are used for buttons, headers, and active elements.
- **Secondary Colors** are used for text and inactive elements.
- **Background Colors** provide a consistent look across different screens.
- **Text Colors** ensure readability and highlight important actions like logout.

--
This palette can be used to maintain a consistent theme across our application.