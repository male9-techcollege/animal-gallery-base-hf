/* References: 
- Folder template-strings-mc-with-kasper (we were told to do this assignment after that class)
- My delivery of gallery-med-heinz from GF2 (Canary Islands) and accompanying course notes (was there a delay set on this one too? very slow at opening the modal...)
- My delivery of gallery-gf2 from GF2 (animal gallery)
- Obviously the reference repository with the functionality, including a spinner (circular, spinning preloader from LottieFiles.com): https://github.com/bo-nicolaisen/animal-gallery

Differences from the gallery based on Heinz' class:
- no Close button; the container of the picture and its caption is the button to exit the modal (clicking outside of the picture does not allow the user to exit)
- long description of objects in array, which is only displayed in the modal (so using the cloneNode() method is probably not appropriate)
- a title for each picture on top of a caption; it is above the picture on the landing page, but positioned on top of the picture in the modal
- a spinner appears before the gallery pictures are loaded
- no slider  
- the Escape button normally allows one to exit a modal, but not in Bo's version
- on the landing page, the pictures don't all fill the same height (but I had fixed that problem in my version from the GF)
*/
/* COURSE NOTES (initially on paper, incomplete):
For cards:
for (let i = 0; i < 10; i++)
for means as long as
i < 10 = i is less than 10 (i is inferior to the array length)
i++ = then add 1 to i

let templateString = ``; (empty string, note the back ticks instead of quotation marks)
forEach ((arrayItem)) => {
    templateString = `(enter HTML code here)`;
    selectionContainer.innerHTML = templateString; 
};

(arrayItem could also be called product)
*/

/* .......................................................................... */
/* NOTES FROM HF: Demonstration by Kasper of solution with string template 

The following are incomplete notes. Solution with 2 functions only (but there was more JS in the file).

Define your own attributes in DOM by using data attributes: e.g. data-chosenname="" 
    "To get a data attribute through the dataset object, get the property by the part of the attribute name after data- (note that dashes are converted to camel case)."
    https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes

let kaspersData = fetchData();

function createGalleryView() {
    let str = "";
    let sthsth = `
    <article onclick="createSingleItemView(this)" data-whatever=${index} data-heldigtal="24" class="gallery-card">
        <h2></h2>
        <p></p>
    </article>
    `;

};

function sth() {
    let sth = nameOfArticleDefinedAsVariable.dataset.whatever;
};
*/

/* .......................................................................... */
/* Code of gallery-med-heinz (I made changes to that before resorting to the code provided in the example to duplicate; I also deleted a bunch of comments from it)

const displayGallery = () => {
    for (let item of arrImages) {
        console.log(item);

        const li = document.createElement('li');
        const article = document.createElement('article');
        const img = document.createElement('img');
        const caption = document.createElement('p');

        caption.innerText = item.title;
        img.src = `assets/images/gallery/small/${item.file}`;
        img.alt = `${item.title}`;

NOTES FROM GF: "In simple words, the console. log() returns the object in its string representation and console. dir() recognizes the object just as an object and outputs its properties. Both log() and dir() returns the string just as a string." https://www.geeksforgeeks.org/difference-between-console-dir-and-console-log-2/ 
        console.log(li);
        console.dir(img);

        article.append(img);
        article.append(caption);
        li.append(article);

        console.log(article);
        document.getElementById('gallery').append(li);
    };
};

displayGallery();

NOTES FROM GF: "The DOMContentLoaded event fires when the HTML document has been completely parsed, and all deferred scripts (<script defer src="…"> and <script type="module">) have downloaded and executed. It doesn't wait for other things like images, subframes, and async scripts to finish loading.
DOMContentLoaded does not wait for stylesheets to load, however deferred scripts do wait for stylesheets, and the DOMContentLoaded event is queued after deferred scripts. Also, scripts which aren't deferred or async (e.g., <script>) will wait for already-parsed stylesheets to load.
A different event, load, should be used only to detect a fully-loaded page. It is a common mistake to use load where DOMContentLoaded would be more appropriate." https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event 

document.addEventListener('DOMContentLoaded', () => {
TO DO (notes from HF): I could use cloneNode() in a different way than in Heinz' master class.
To make the following display both the image and a caption in modal, the selector queried has to be the container of both.
BUT, since a different caption is displayed in the modal than on the landing page, I can apply a hidden class to hide the caption that I don't want to show (I had planned a similar solution for my to-do app). 
    const imgElements = Array.from(document.querySelectorAll('img'));
    console.log(imgElements);

NOTES FROM HF: I replaced the div of my delivery of gallery-med-heinz from GF2 with a dialog element. The code will still work, but the modal's default appearance is going to be different. 

    const modalDialog = document.createElement('dialog');

    modalDialog.classList.add('lightbox');
    document.body.append(modalDialog);
    console.log(modalDialog);

TO DO: the image and its caption are the button in this gallery modal. 
    const closeButton = document.createElement('div');
    closeButton.innerText = '×';
    closeButton.classList.add('close-lightbox');
    console.log(closeButton);

    const buttonContainer = document.createElement('div');

    const buttonLeft = document.createElement('button');
    const leftButtonIcon = document.createElement('img');
    leftButtonIcon.src = './assets/images/icons/chevron-left-solid-black.svg';
    buttonLeft.append(leftButtonIcon);
    buttonLeft.classList.add('left-button');
    console.log(buttonLeft);

    const buttonRight = document.createElement('button');
    const rightButtonIcon = document.createElement('img');
    rightButtonIcon.src = './assets/images/icons/chevron-right-solid-black.svg';
    buttonRight.append(rightButtonIcon);
    buttonRight.classList.add('right-button');
    console.log(buttonRight);

    let currentIndex = 0;

    const openModal = index => {
        console.log(index);
        currentIndex = index;
The point of the following is to fetch the value (the picture to be blown up) through its index. 
"The cloneNode() method creates a copy of a node, and returns the clone.
The cloneNode() method clones all attributes and their values.
***Set the deep parameter to true if you also want to clone descendants (children).*** (...)
    Syntax  
    node.cloneNode(deep) (...)
false - Default. Clone only the node and its attributes."
https://www.w3schools.com/jsref/met_node_clonenode.asp 
NOTES FROM HF: Further research about the use of the figure element (beyond my previous analysis of the rather confusing (slightly contradictory) explanation of the HTML standard):
    "The <figure> element should be independant of the flow of the rest of the document, meaning it could be moved or even removed without affecting the flow of the document. (...)
    Best Practices
    The <figure> element should be used only where the contents are part of the surrounding flow."
    https://www.thewebmaster.com/html/tags/figure
    Modal = surrounding flow: it would make sense if the images were inside a figure with a figcaption **once they are in the modal**. I created articles in the main flow.
    Supporting source:
    "User Flow: Creating Seamless Experiences + Free Template (...)
    In this article, we’re going to dive into what a user flow is. We’ll explore why it’s so crucial for creating products that people love to use. (...)
    A user flow diagram, also known as a user flow chart or user flow map, is a visual tool that outlines the path users take as they interact with your digital product. It’s like a step-by-step map that shows each action a user might take, from entering your site or app to completing a specific goal, such as making a purchase or signing up for an account. (...)
    Not all users will follow the exact same path. Some might take shortcuts, while others might need more information before moving forward. Consider these alternative paths and include them in your user flow diagram. (...)
    To include these different routes in your user flow diagram, you’ll add branches off the main flow. For example, from a product page, for users who are ready to buy, one arrow might lead directly to checkout. Another arrow might branch off to a reviews page — this is for users who need more information before committing."
    https://productschool.com/blog/user-experience/user-flow
        const imgClone = imgElements[currentIndex].cloneNode();
        console.log(imgClone);

        modalDialog.innerHTML = '';
        modalDialog.append(closeButton);
        modalDialog.append(imgClone);
        modalDialog.append(buttonContainer);
        buttonContainer.append(buttonLeft);
        buttonContainer.append(buttonRight);
        modalDialog.classList.add('active');
    };

    const closeModal = () => {
        modalDialog.classList.remove('active');
    };

const showPrev = () => {
    currentIndex = (currentIndex - 1 + arrImages.length) % arrImages.length;
    openModal(currentIndex);
};

const showNext = () => {
    currentIndex = (currentIndex + 1) % arrImages.length;
    openModal(currentIndex);
};

imgElements.forEach((img, index) => {
    console.log(index, img);

    img.addEventListener('click', () => openModal(index));
});

closeButton.addEventListener('click', () => closeModal());

buttonLeft.addEventListener('click', (e) => {
    console.log('User clicked on the left button');

    if (!modalDialog.classList.contains("active")) return;

    showPrev();
});

buttonRight.addEventListener('click', (e) => {
    console.log('User clicked on the right button');

    if (!modalDialog.classList.contains("active")) return;

    showNext();
});
});
*/



/*delay på data hentning i ms */
const myLoadTime = 2000;
/* This was hidden in the example to duplicate (constant for a function instead of let ... = null):
const myData = fetchData();
*/
// reset variables
let myData = null;

/* This was the only addition to make based on the example to duplicate, 
aside from the changes to the function that we weren't supposed to touch. */
let myGalleryElement = null;

/* kicks off app when the DOM is loaded */
/* It's interesting that the load event is used here instead of the DOMContentLoaded event used by Heinz in the GF. */
window.addEventListener("load", initApp);

/* Because of the event listener above, this is the first function to run. 
displayLoadingIcon() is not defined as an async function. It runs for 2 seconds because fetchData() is set to be executed 
after such a timeout.
In the example to duplicate (not the exercise file), fetchData() was defined as an async function.
Since the await operator is used in the function fetchData() from the example, it has to be described as async, otherwise 
there is an error.
fetchData() contains a constant with an array of pictures for the gallery, and it sends this array back to initApp().
When initApp is fully executed, it is the end of that flow.
*/
function initApp() {
    console.log('init');
    myGalleryElement = document.getElementById('app');
    displayLoadingIcon();
    fetchData();
};

/* initGallery is called in the function fetchData, which is called in initApp */
function initGallery(fetchedData) {
    myData = fetchedData;
    createGallery();
};

/* createGallery is called in initGallery above (which is called in fetchData, which is called in initApp), 
and also in createDetailedView */
function createGallery() {
    //myData
    resetGallery();

    myIndex = 0;
    myData.map((myAnimal) => {
        createCard(myAnimal, myIndex);
        myIndex++;
    });
};

/* resetGallery is called in createGallery (which is called in initGallery, which is called in fetchData, which is called in initApp) 
and also in createDetailedView */
function resetGallery() {
    myGalleryElement.innerHTML = "";
};

/* displayLoadingIcon is called in initApp */
function displayLoadingIcon() {
    let myLoadingIcon = document.createElement('lottie-player');
    myLoadingIcon.classList.add('loadingIcon');
    myLoadingIcon.src = "https://assets2.lottiefiles.com/packages/lf20_rwq6ciql.json";
    myLoadingIcon.background = "transparent";
    /* Syntax
    js
    setAttribute(name, value) 
    https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute 
    This adds or updates an attribute of a HTML element. */
    myLoadingIcon.setAttribute('autoplay', '');
    myGalleryElement.appendChild(myLoadingIcon);
};

/* createCard is called in createGallery (which is called in initGallery, which is called in fetchData, which is called in initApp), 
and it is through createGallery that myData (from function fetchData) was relayed. */
function createCard(myCardData, myIndex) {

    let galleryCard = document.createElement("article");

    galleryCard.setAttribute('data-index', myIndex);

    galleryCard.classList.add('galleryCard');
    galleryCard.style.cursor = 'Pointer';

    galleryCard.addEventListener('click', (e) => {

        /* "The stopPropagation() method prevents propagation of the same event from being called.
        Propagation means bubbling up to parent elements or capturing down to child elements."
        https://www.w3schools.com/jsref/event_stoppropagation.asp */
        e.stopPropagation();
        console.log(e.target);
        /* "The currentTarget property returns the element whose event listener triggered the event. (...)
        The currentTarget property is useful during capturing and bubbling. (...)
        The currenttarget property refers to the element whose event listener triggered the event, opposed to the target property, which returns the element that triggered the event." 
        https://www.w3schools.com/jsref/event_currenttarget.asp
        "The target property returns the element where the event occured."
        https://www.w3schools.com/jsref/event_target.asp
        */
        /* Reminder: dataset.index is a reference to the custom attribute data-index (above).
        This tells the browser which card to show in the modal to open. */
        myIndex = e.currentTarget.dataset.index;
        createDetailedView(myIndex);

    });

    let galleryName = document.createElement("h2");
    galleryName.innerText = myCardData.name;

    let galleryImage = document.createElement("img");
    galleryImage.src = myCardData.picture;

    let galleryShortDes = document.createElement("p");
    galleryShortDes.innerText = myCardData.shortDescription;

    galleryCard.appendChild(galleryName);
    galleryCard.appendChild(galleryImage);
    galleryCard.appendChild(galleryShortDes);

    myGalleryElement.appendChild(galleryCard);
};

/* createDetailedView is called in createCard (with an event listener to open a modal on click;
the detailed view is in a modal).
myIndex is info relayed from that function. */
function createDetailedView(myIndex) {

    /* myData is a global variable */
    let myCardData = myData[myIndex];

    resetGallery();

    let detailCard = document.createElement("article");

    detailCard.setAttribute('data-index', myIndex);
    detailCard.classList.add('detailView');
    detailCard.style.cursor = 'Pointer';

    detailCard.addEventListener('click', (e) => {

        e.stopPropagation();
        createGallery();

    });

    let galleryName = document.createElement("h2");
    galleryName.innerText = myCardData.name;

    let galleryImage = document.createElement("img");
    galleryImage.src = myCardData.picture;

    let galleryDes = document.createElement("p");
    galleryDes.innerText = myCardData.description;

    detailCard.appendChild(galleryImage);
    detailCard.appendChild(galleryName);
    detailCard.appendChild(galleryDes);

    myGalleryElement.appendChild(detailCard);
};

/*  get data function  DO NOT TOUCH!!!!! 
Denne funktion vil typisk være en funktion der henter data fra et API 

NOTE: the assignment's text told us not to touch this function, but the model to follow works by simply adding the following variable:
const myData = fetchData();
to the code above the data function "not to touch", and: 
its function fetchData() is defined as async function fetchData() instead,
AND
that function contains more code, in spite of the fact that we were not supposed to touch that code...
......................................................*/

/* The example to duplicate says:
async function fetchData() 
NOT
function fetchData()
because the example uses the await operator (as explained above).
*/
async function fetchData() {
    // data object
    /* The example to duplicate added the following to function fetchData():
    console.log('fetching data');
    await new Promise(resolve => setTimeout(resolve, myLoadTime));
    */
    console.log('fetching data in 2s');
    await new Promise((resolve) => {
        /* myLoadTime is the 1st variable defined in the file, 2 seconds.
        "The setTimeout() method of the Window interface sets a timer which executes a function or specified piece of code once the timer expires."
        https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout */
        setTimeout(resolve, myLoadTime);
    });

    const myData = [
        {
            name: 'Elefant',
            picture: 'assets/img/elephant.jpg',
            description: 'Loxodonta africana, også kendt som afrikansk elefant, er verdens største landdyr. Den har en grå hud og store ører, som den bruger til at regulere kropstemperaturen og kommunikere med andre elefanter. Afrikanske elefanter lever i store flokke og spiser op til 150 kg planter om dagen. De er også kendt for deres stærke intelligens og følelsesmæssige bånd til deres familie og flok. På grund af ulovlig jagt og tab af levesteder er afrikanske elefanter klassificeret som truede og er beskyttet af lovgivning',
            shortDescription: 'Loxodonta africana, også kendt som afrikansk elefant.'
        },

        {
            name: 'Tiger',
            picture: 'assets/img/standard_tiger.jpg',
            description: 'Panthera tigris, også kendt som tigeren, er en stor kat, der er hjemmehørende i Asien. Tigeren har en gul eller orange pels med mørke striber og har normalt en lang kraftig hale. Der findes forskellige underarter af tigeren, og størrelsen og farven kan variere afhængigt af underarten og habitatet. Tigeren er kendt for sin styrke, hurtighed og smidighed, og den er en top-rovdyr i sit økosystem. Desværre er mange af underarterne af tigeren truede på grund af tab af levesteder og ulovlig jagt, og bevaring af tigeren og dens levesteder er en vigtig bevaringsindsats.',
            shortDescription: 'Panthera tigris, også kendt som tigeren.'
        },

        {
            name: 'Tarantel',
            picture: 'assets/img/Brachypelma_smithi.jpg',
            description: 'Brachypelma smithi, også kendt som den mexicansk rødknæs tarantel, er en stor og farverig edderkop, der er hjemmehørende i Mexico. Den har en mørk krop med røde og orange striber på benene og en karakteristisk rød knæled. Brachypelma smithi er en populær art blandt edderkoppeentusiaster på grund af dens smukke farver og rolige natur.',
            shortDescription: 'Brachypelma smithi, også kendt som den mexicansk rødknæs tarantel.'
        },

        {
            name: 'Koala',
            picture: 'assets/img/_WW236934.jpg',
            description: 'Phascolarctos cinereus, også kendt som koala, er en pungdyrart, der er hjemmehørende i Australien. Den har en blød, tyk pels, store ører og en stor næse, og dens krop er tilpasset til at leve hovedsageligt af eukalyptusblade. Koalaer lever hovedsageligt i trætoppene og er kendt for deres afslappede og søvnige opførsel, da de sover op til 20 timer om dagen.',
            shortDescription: 'Phascolarctos cinereus, også kendt som koala.'
        },

        {
            name: 'Haj',
            picture: 'assets/img/great-white.jpg',
            description: 'Carcharodon carcharias, også kendt som en hvidhaj eller great white haj, er en stor rovdyr, der lever i kystfarvande over hele verden. Den har en grå-blå krop med en trekantet finne på ryggen og en stor kraftig kæbe med skarpe tænder. Carcharodon carcharias er kendt for at være en top-rovdyr og jager primært sæler og fisk. Den er også kendt for dens sjældne, men berygtede, angreb på mennesker, selvom sådanne angreb ofte er utilsigtede og sjældne.',
            shortDescription: 'Carcharodon carcharias, også kendt som en hvidhaj.'
        }
    ];

    /* The example to duplicate added the following to function fetchData():
    initGallery(myData);
    INSTEAD OF
    return myData; 
    which was in a comment in the example to duplicate instead of being in the code.
    */

    initGallery(myData);
};

/* The example to duplicate has the following in a comment:

async function test() {
    console.log('start timer');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('after 1 second');
}

test(); */