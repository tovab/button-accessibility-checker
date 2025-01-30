# Extension for Detecting Inaccessible Buttons

## Overview
This extension identifies elements that visually resemble buttons but are not accessible as buttons to screen readers. Traverses the DOM, returning a list of elements that are: 
   - do not have built-in keyboard accessibility - i.e. not <button> or <a> (with href)
   - have the pointer cursor, which makes them be seen as buttons

## Limitations of the Algorithm
### False Negatives:
- The algorithm misses elements that look/act like buttons but lack a pointer cursor.
- This case is rare - the pointer cursor is a widely accepted UX standard.

### False Positives:
1. **Cursor on button's parent**
   - A button's immediate parent has a `pointer` cursor; the button takes up the entire space of the parent.
   - **Example:**
   ```html
   <div id="parent" style="pointer: cursor">
     <button style="width: 100%; height: 100%">Click</button>
   </div>
   ```

2. **Programmatically Accessible Elements:**
   - "Fake" button is flagged as inaccessible even if `tabindex` attribute and `keydown` listener are present. 


## Limitation of the Extension
- The code runs **on page load** and **does not detect dynamically added buttons**.

