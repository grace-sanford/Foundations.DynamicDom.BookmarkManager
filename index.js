//================================================
//#region STATE MANAGEMENT
//================================================


//If we were to ADD a bookmark to the bookmark manger, here's how we would do it. This function won't actually add a bookmark until it's called in the event listener. Basically, create an array of objects representing all of the user's added bookmarks.
const bookmarkManager = [];
const addBookmark = (link, name) => {
    const bookmark = {name: "link"}
    bookmarkManager.push(bookmark)
}


//If we were to REMOVE a bookmark from the bookmark manager, here's how we 
//would do it. This function won't actually remove a bookmark until it's called
//in the event listener.

const removeBookmark = (bookmarkManager, bookmark) => {
    //Can you find the bookmark?
    const idx = bookmarkManager.indexOf(bookmark);
    return idx !== -1
    ? //If the bookmark is found, remove it.
    bookshelfManager.slice(0,idx).concat(bookshelfManager.slice(idx + 1))
    : //Otherwise, it's the same book mark manager list
    bookmarkManager;
};


//#endregion STATE MANAGEMENT



//================================================
//#region RENDERING
//================================================

////////////////------------RENDER BOOKMARKS--------------//////////////
const renderBookmark = (bookmark) => {

    //Select the add button that will add the bookmark with user input when clicked
    const addBtn = document.querySelector(".addBtn")
    addBtn.addEventListener("click", () => {
        const li = document.createElement('li');

        li.textContent = bookmark.name
        li.href = bookmark.link

        const bookmarkManager = getBookmarkManger();
        const updateBookmarkManager = addBookmark(bookmarkManager, bookmark);
        setBookmarkManager(updateBookmarkManager);

        renderApp({
            name: "Bookmark Manager",
            bookmarkManager: getBookmarkManger()
        });
    });

    //Add a button that will remove the bookmark when clicked
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "-";
    removeBtn.addEventListener("click", () => {
        const bookmarkManager = getBookmarkManger();
        const updateBookmarkManager = removeBookmark(bookmarkManager, bookmark);
        setBookmarkManager(updateBookmarkManager);

        renderApp({
            name: "Bookmark Manager",
            bookmarkManager: getBookmarkManger()
        });
    });

    li.prepend(removeBtn);

    return li;
};






/////////////////--------RENDER BOOKMARK MANAGER------/////////////
const renderBookmarkManger = (bookmarkManager) => {
    const ul = document.querySelector('list');

    //We want to TRANSFORM the elements in the array of objects representing 
    //all the user's added bookmarks into html elements in a list
    const renderBookmarks = bookmarkManager.map(renderBookmark);

    ul.replaceChildren(...renderBookmarks);

    return ul;
};






////////////////-----------RENDER APP--------------//////////////////
//Work backward: render the app first
//render app takes an app and updates the page with the name
//and the book mark manager page

const renderApp = (app) => {
    const main = document.querySelector('main');

    const h1 = document.createElement('h1');
    h1.textConent = app.name;

    const renderBookmarkManger = renderBookmarkManger(app.bookmarkManager)
    main.replaceChildren(h1, renderBookmarkManger);
}

renderApp({
    name: "Bookmark Manager",
    bookmarkManager: getBookmarkManger()
});

//#endregion RENDERING