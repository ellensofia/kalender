window.addEventListener('DOMContentLoaded', main)

/**
* Global state - Single source of truth. Array where the todo objects are stored 
*/ 
let todos = [];

/**
 * Single-use function when the application starts
 */
function main() {
    getFromLocalStorage();
    initTodos();
    renderCalander()
    weekday();
}
