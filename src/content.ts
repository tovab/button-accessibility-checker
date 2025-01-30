import { findInaccessibleButtons } from "./scanner";

const inaccessibleButtons = findInaccessibleButtons();

if(inaccessibleButtons.length) {
  console.warn('Inaccessible Buttons:', inaccessibleButtons);
} else {
  console.log('Great job! All buttons are accessible ♿❤️🏆')
}