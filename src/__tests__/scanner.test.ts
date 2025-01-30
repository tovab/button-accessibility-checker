import { findInaccessibleButtons } from "../scanner";

/** Helper function to create an element with styles & attributes */
function createElement(tag: string, styles: Partial<CSSStyleDeclaration> = {}, attributes: Record<string, string> = {}) {
    const element = document.createElement(tag);
    Object.assign(element.style, styles);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
}

describe('findInaccessibleButtons', () => {
    beforeEach(() => {
        document.body.innerHTML = ''; // Reset DOM before each test
    });

    it('should find div elements that look like buttons but are not keyboard accessible', () => {
        const divButton = createElement('div', { cursor: 'pointer' });
        document.body.appendChild(divButton);

        const result = findInaccessibleButtons();
        expect(result).toContain(divButton);
    });

    it('should not flag <button> elements', () => {
        const button = createElement('button');
        document.body.appendChild(button);

        const result = findInaccessibleButtons();
        expect(result).not.toContain(button);
    });

    it('should not flag <a> elements with href', () => {
        const link = createElement('a', {}, { href: '#' });
        document.body.appendChild(link);

        const result = findInaccessibleButtons();
        expect(result).not.toContain(link);
    });

    it('should not flag children of button', () => {
        const button = createElement('button');
        document.body.appendChild(button);
        const div = createElement('div');
        
        button.appendChild(div);
        document.body.appendChild(button);
       
        const result = findInaccessibleButtons();
        expect(result).not.toContain(div);
    });

    it('should not flag children of element that looks like button', () => {
        const divButton = createElement('div', { cursor: 'pointer' });
        document.body.appendChild(divButton);

        const child = createElement('div', { cursor: 'pointer' });
        divButton.appendChild(child);
       
        const result = findInaccessibleButtons();
        expect(result).not.toContain(child);
    });

    it('should not flag elements without pointer cursor', () => {
        const div = createElement('div', { cursor: 'default' });
        document.body.appendChild(div);

        const result = findInaccessibleButtons();
        expect(result).not.toContain(div);
    });

    it('should traverse nested elements', () => {
        const container = createElement('div');
        const parent = createElement('div');
        const nestedDiv = createElement('div', { cursor: 'pointer' });

        parent.appendChild(nestedDiv);
        container.appendChild(parent);
        document.body.appendChild(container);

        const result = findInaccessibleButtons();
        expect(result).toContain(nestedDiv);
    });

    it('should return an empty array if no inaccessible buttons are found', () => {
        const button = createElement('button');
        const link = createElement('a', {}, { href: '#' });

        document.body.append(button, link);

        const result = findInaccessibleButtons();
        expect(result).toHaveLength(0);
    });
});
