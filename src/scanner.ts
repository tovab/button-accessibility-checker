
/** 
 * Returns true if the element has the 'pointer' cursor.
 * This is the most standard visual cue. Other cues might include hoverability or the text on the element,
 * but I believe that these are not so consistent, and almost all clickable elements on the web have the pointer cursor.
 */
function looksLikeButton(element: Element){
    return getComputedStyle(element).cursor ===  'pointer';
}

/** 
 * Returns true if the element is an HTML element with built-in keyboard accessibility - <button> or <a> (with href).
 */  
function isAccessibleButton(element: Element){
    return  element.tagName === 'BUTTON' ||  (element.tagName === 'A' && element["href"]);
}

/** 
 * Traverses the DOM to find buttons that are not keyboard accessible. 
 * Adds them to the provided array as they are found. 
 */
function findInaccessibleRecursive(node: Element): Element[] {
    let inaccessibleElements: Element[] = [];

    for (const element of Array.from(node.children)) {
        if (isAccessibleButton(element)) {
            continue; 
        }

        if (looksLikeButton(element)) {
            inaccessibleElements =[element];
            continue;
        }

        inaccessibleElements = [...inaccessibleElements, ...findInaccessibleRecursive(element)];
    }

    return inaccessibleElements;
}
  
export function findInaccessibleButtons(){
    return findInaccessibleRecursive(document.body);
}