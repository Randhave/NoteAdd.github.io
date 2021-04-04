console.log("Hello friends");
showNotes();        //here we are to call shwoNotes functions , for showing all notes startingly

let addBtn = document.getElementById('addBtn');        //grap addNote button by getElementById
addBtn.addEventListener("click", () => {
    //when user click on "Add note " button bellow functions are run
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];     //if notes are not available , then created notesObj empty array
    }
    else {
        notesObj = JSON.parse(notes);       // notes are available in localStorage it push in notesObj Empty Arry
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notes);
    showNotes();    // after pushiing notes in notesObj then, it show notes throgh showNotes functions
});

function showNotes() { //This are the showNotes functions showing Your all notes

    let notes = localStorage.getItem("notes"); //it means any notes are present in localstorage  get this and store "notes"
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";  //intially we are intilise empty screen , and added newly notes 
    notesObj.forEach(function (element, index) {
        html += `
                    <div class="noteCard my-3 mx-3 card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">Note${index + 1}</h5>
                            <p class="card-text">${element}</p>
                            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete note</button>
                        </div>
                    </div>
                `
    });
    let showNOTE = document.getElementById("notes");
    if (notesObj.length != 0) {
        showNOTE.innerHTML = html;
    }
    else {
        showNOTE.innerHTML = `Nothing to show  ! Make your notes with click on "Add note" `
    }
}

// 
function deleteNote(index) {
    // console.log("deleting note is fired", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);  //splice function are delete given frist argument and second argumetn is counting to delete how many items are delete
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


//   HERE FILTER FUNCTION ->  if you input in input search baar it matches your all notes, if matches any of then it  show else hide all notes if not matches
let search = document.getElementById("searchTxt");
search.addEventListener("input", () => {

    let inputVal = search.value.toLowerCase();
    // console.log('INPUT event is fired', inputVal);

    let noteCards = document.getElementsByClassName("noteCard");      // noteCards class present in above html templete
    Array.from(noteCards).forEach(function (element) {   //  Array.from ka mtlb ki jo notes he vo array me store he object ke form me 
                                                         //  .forEach ka mtlb jo function diya he usme vo run hoga sabhi object ke element ke liye

        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {         //here its checked , jo apako search krna he vo inputVal me moujud he ya nhi
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    });

});

//In above program if else condition are common in all function , beacuae it check notes are available or not 
//if avaiable notes then code run 
//if not available then "notesObj" Empty array are reamin still 