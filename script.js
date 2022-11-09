// Establish DOM elements as variables
const grocerySubmit = document.getElementById('addGrocery')
const list = document.getElementById('list')
const clearBtn = document.getElementById('clear')

// Instantiate default state value:
const initialState = {
    groceries: []
}

// establish the reducer. Takes initial state value and an action as arguments.
const groceryReducer = (state = initialState.groceries, action) => {
    switch(action.type) {
        case 'grocery/add':
            return [
                ...state,
                {
                    text: action.text
                }
            ]
        case 'grocery/clear':
            return []
        default:
            return state
    }
}

//Establish Sore and Create Actions
let store = Redux.createStore(groceryReducer)

//Clear the list
const clearList = () => {
    //the following will clear the input field after submit
    document.getElementById('newItem').value = ''

    store.dispatch({
        type: 'grocery/clear'
    })
    console.log(store.getState())
}

//adding a new item, not allowing page to refresh
const newGrocery = (e) => {
    e.preventDefault()
    let groceryText = document.getElementById('newItem').value
    store.dispatch({
        type: 'grocery/add',
        text: groceryText
    })
    console.log(store.getState())
}

//adding event listeners
grocerySubmit.addEventListener('click', (e) => {newGrocery(e)})
clearBtn.addEventListener('click', clearList)

//render data. a function that takes our state variable and loops over it, rendering a brand new tag for each element in the array.
const renderList = (state) => {
    
    //clear the content of the list on each render, just before re-rendering state
    while(list.firstChild) {
        list.removeChild(list.firstChild)
    }
    state.forEach(grocery => {
        // Generate a new list element for each grocery item
        let li = document.createElement('li')
        // Append the new element to our list DOM element, we targeted
        // it at the beginning of this code-along!
        list.appendChild(li)
        // Populate the text content of the list item
        li.textContent = grocery.text
    })
}


// build out a render function that fetches the current state, and feeds it to this renderList function.
const render = () => {
    const state = store.getState()
    renderList(state)
}

store.subscribe(render)
