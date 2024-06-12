import "./style.css"
import dayjs from "dayjs";

let formInput = document.getElementById("formInput")

let parent = document.getElementById("parent")

function createData(event){
event.preventDefault();

let note = event.target.note.value;

// console.log(note)
//[{"pesan pertama"},{"pesan kedua"},{""}]

let dataStorage = localStorage.getItem("dataStorage")

if(dataStorage==null){
    localStorage.setItem("dataStorage", "[]")
}
//kita dapatkan data dari storage "[]"
 dataStorage = localStorage.getItem("dataStorage")
//kita pecahkan atau uraikan biar stringnya lepas
 let noteDataJson = JSON.parse(dataStorage)
//[]

// kita push data objek ke dalam noteDataJson
noteDataJson.push({
id : dayjs().format(),
note : note,
date : dayjs().format()
})
//[{id : , dsb}]


//kita upload data noteDataJson ke local storage serta ubah kembali datanya ke dalam bentuk string
localStorage.setItem("dataStorage", JSON.stringify(noteDataJson))

event.target.note.value = " ";
alert("data berhasil ditambah");
window.location.reload()
}

// component noteCard
function NoteCard(id, content, date){

    // kita buat elemen div
    let div = document.createElement("div");
    div.setAttribute("id", id)
    div.setAttribute("class", "w-full min-h-[120px] p-2 mt-4 flex flex-col bg-white shadow-md rounded-md relative")

    // buat element p
    let p = document.createElement("p");
    p.setAttribute("class", "font-light")
    p.textContent = content;

    //buat element small
    let small = document.createElement("small");
    small.setAttribute("class", "italic text-slate-500 text-xs mt-auto")
    small.textContent= date;

    // buat element button close 
    let buttonClose = document.createElement("button");
    buttonClose.setAttribute("class", "w-10 h-10 bg-red-500 flex justify-center items-center rounded-md absolute right-2 top-2 text-white")
    buttonClose.textContent= "X";
    buttonClose.addEventListener("click", ( )=>{deleteCard(id)});

    // kita masukan element p, small, dan button ke dalam element div

    div.appendChild(p);
    div.appendChild(small);
    div.appendChild(buttonClose);

    return div;
}

// function untuk merender data dari localstorage ke html
function renderToHtml(){

    // kita ambil data dari localstorage
    let dataStorage = localStorage.getItem("dataStorage");

    // jika tidak ada data di localstorage maka abaikan
    if(dataStorage==null){
        return;
    }

    // ubah data string dari storage data menjadi object
    let storageDataJson = JSON.parse(dataStorage);
    
    // maping data dari storageDataJson ke html
    storageDataJson.reverse().map((e)=>{
        parent.appendChild(NoteCard(e.id, e.note, e.date))
    })
}

function deleteCard(id){
window.confirm("Apakah anda akan delete data ?")
if(!confirm){
    return;
}

let dataStorage = localStorage.getItem("dataStorage")

let dataStorageJson = JSON.parse(dataStorage);

//filter data array

let newArray = dataStorageJson.filter((e)=>{
return e.id != id;
//2 != 3 => true 
//3 != 3 => false
})

localStorage.setItem("dataStorage", JSON.stringify(newArray))

window.location.reload();


}

renderToHtml();

formInput.addEventListener("submit", createData)