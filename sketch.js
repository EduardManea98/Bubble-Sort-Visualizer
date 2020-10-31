var list = []; //list of items
var numberOfItems,w; //w == width of the rectangle
var n = 0; //iterator for draw method
var buttonStart, buttonReset;
var startSorting = false;
var slider_nr_of_items,slider_frameRate;
/*-----------------------------------------------------*/

//return random number between "min" and "max" values
//(min included, max excluded)
function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//create list of items
function createList() {
    list = [];
    for (var i = 0; i < numberOfItems; i++){
        list.push(rand(15,321));
    }
}

//draw the list (the rectangles)
function drawRectangles() {
    for (var i = 0; i < list.length; i++) {
        fill(list[i], 100, 100);
        rect(i * w, height, w, 0 - list[i]);

        //draw their numbers
        if (list.length < 70) {
            textSize(w / 2);
            textAlign(CENTER);
            fill('black');
            text(list[i], i * w + w/2, height - 3);
        }
    }
}

//swap two items in an array (arr)
//(i & j) - positions where I want to swap the items
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

//delete items from list
function deleteItems() {
    var diff = numberOfItems - slider_nr_of_items.value();
    while (diff != 0) {
      list.pop();
      diff--;
    }
    numberOfItems = slider_nr_of_items.value();
}

//add items to list
function addItems() {
    var diff = slider_nr_of_items.value() - numberOfItems;
    for (var i = 0; i < diff; i++) {
      list.push(rand(10, 321));
    }
    numberOfItems = slider_nr_of_items.value();
}

function setup() {
    createCanvas(1000, 600);
    colorMode(HSB);

    //buttons settings
    buttonStart = createButton('Start');
    buttonStart.mousePressed(() => {
        startSorting = true;
        n = 0;
    });

    buttonReset = createButton('Reset');
    buttonReset.mousePressed(() => {
        createList();
        startSorting = false;
        n = 0;
    });

    //sliders
    slider_nr_of_items = createSlider(40, 150, 100, 1);
    slider_frameRate = createSlider(20, 60, 35, 1);

    numberOfItems = slider_nr_of_items.value();
    w = width / numberOfItems;
    createList();
}

function draw() {
    background(217, 0, 45); //HSB mode
    
    frameRate(slider_frameRate.value());

    drawRectangles();

    if (startSorting == true) {
        if (n < list.length - 1) {
            for (var j = n; j < list.length; j++) {
                if (list[n] > list[j]) {
                    swap(list, n, j);
                }
            }
            n++;
        }
        if (n == list.length - 1) {
            startSorting = false;
            n = 0;
        }
    }

    //add, pop items from list according to slider
    else {
        //add items
        if (numberOfItems < slider_nr_of_items.value()) {
            addItems();
        }
        //delete items
        else if (numberOfItems > slider_nr_of_items.value()) {
            deleteItems();
        }
        w = width / numberOfItems;
    }
}