//================================================
//#region STATE MANAGEMENT
//================================================


// /**
//  * Rough implementation of a React hook that maintains state
//  * @param {*} initial the initial value of teh state 
//  * @returns [getter, setter]
//  */

// const useState = (initial) => {

//     //this is like `let bookshelf = bookData`, but we're putting it in a function; you can't access the treasure
//     //chest directly, you can only use the keywords I gave you
//     let closure = initial;
//     const getState = () => closure;
//     const setState = (update) => (closure = update);
//     return [getState, setState];
// };

// //bookshelf refers to the closure
// //setBookshelf updates the closure
// //we're using the function useState to remember bookData
// const [getBookshelf, setBookshelf] = useState([]);


//Select DOM elements
const bookmarkLink = document.querySelector(".link");
const bookmarkName = document.querySelector(".name");
const addBtn = document.querySelector(".addBtn")
const bookmarks = document.querySelector(".bookmarks")

//Basically, use an array of objects to maintain all of the user's added inputs.

const bookmarkData = [];

/**
 * `createBookmarkElement takes an object representing the user's input and an index 
 * and return a correspoing html element 
 */

const createBookmarkElement = (bookmark, i) => {
    //Create li list element
    const li = document.createElement("li");
    li.classList.add("bookmark");

    //Create a link with the name
    const a = document.createElement("a");
    a.setAttribute("href", bookmark.link);
    a.textContent = bookmark.name;
    li.append(a)

    //Remove btn

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "-";
    removeBtn.addEventListener("click", () => {
        //Remove link and re-render
        bookmarkData.splice(i,1);
        renderBookmarks();
    });
    li.prepend(removeBtn);
    
    return li;
};


//#endregion STATE MANAGEMENT


//================================================
//#region RENDERING
//================================================

/**
 * `renderBookmarks` creates a bookmark element for each bookmark in bookmarkData, and re-renders the screen.
 */

const renderBookmarks = () => {
    const bookmarkElements = bookmarkData.map(createBookmarkElement);
    bookmarks.replaceChildren(...bookmarkElements);
};

/**
 * `addBtn` Event Listener creates and then adds a new bookmark object to bookmarkData array when the addBtn is clicked, and then refresh the page again.
 */

addBtn.addEventListener("click", () => {

    //const userInput = getBookmark();

    const link = bookmarkLink.value;
    const name = bookmarkName.value;

    if (!link || !name){
        console.log("No input. Please try again.")
        return;
    }
    //add new object to the bookmarkData array
    bookmarkData.push({ link, name });
    renderBookmarks();
});

//#endregion RENDERING
