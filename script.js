
let booksList;
let booksLike;
let elem;
let clone;
var els;
var reads;
var bookId;

var checks;
var edits;

let zone1;
let zone2;

var books = [];
var favorite = [];




function onLoadBody(){
	zone1 = document.querySelector('#drop-like');
	zone2 = document.querySelector('#drop-list');
	booksList = document.querySelector('#books-list');
	booksLike = document.querySelector('#books-like');
	elem = booksList.querySelector('.list__book');
	clone = elem.cloneNode(true);
	clone.style.display = "flex";
	if (localStorage.getItem('books')) {
		for(var i = 0; i <books.length; i++){
			if(!books[i].read){
				let first = booksList.firstChild;
				let newClone = clone.cloneNode(true);
				newClone.setAttribute('id',i);
				newClone.children[0].children[1].innerHTML = books[i].file;
				booksList.insertBefore(newClone,first);
			}
		}
		for(var i = 0;i < books.length;i++){
			if(books[i].read){
				let first = booksList.firstChild;
				let newClone = clone.cloneNode(true);
				newClone.setAttribute('id',i);
				newClone.children[0].children[1].innerHTML = books[i].file;
				newClone.style.backgroundColor = "#ABB2B9";
				newClone.children[1].children[1].innerHTML = "прочитал";
				booksList.insertBefore(newClone,first);
		}
		
	}
	}
	if(localStorage.getItem('favorite')){
		for(var i = 0; i < favorite.length; i++){
			if(!favorite[i].read){
				let first = booksLike.firstChild;
				let newClone = clone.cloneNode(true);
				newClone.setAttribute('id',"l"+i);
				newClone.children[0].children[1].innerHTML = favorite[i].file;
				booksLike.insertBefore(newClone,first);
			}
		}
		for(var i = 0; i < favorite.length; i++){
			if(favorite[i].read){
				let first = booksLike.firstChild;
				let newClone = clone.cloneNode(true);
				newClone.setAttribute('id',"l"+i);
				newClone.children[0].children[1].innerHTML = favorite[i].file;
				newClone.style.backgroundColor = "#ABB2B9";
				newClone.children[1].children[1].innerHTML = "прочитал";
				booksLike.insertBefore(newClone,first);
			}

			
		}
	}
	Drag();
	RemoveBook();
	ReadBook();
	ShowBook();
	EditBook();
}

function move(id){
	let newClone = document.getElementById(id).cloneNode(true);
	zone1.ondrop = function(){
		if(id.substr(0,1) != 'l'){
			console.log(1);
		let first = booksLike.firstChild;
		newClone.setAttribute('id',"l"+(booksLike.children.length-1));
		booksLike.insertBefore(newClone,first);
		const book = {
			login: books[id].login,
			file: books[id].file,
			read: books[id].read
		};
		
		booksList.children[(booksList.children.length-3)-id].remove();
		for(var i = 0; i < booksList.children.length-2; i++){
			booksList.children[i].setAttribute('id',booksList.children.length-3-i);
		}
		books.splice(id,1);
		localStorage.setItem("books",JSON.stringify(books));
		favorite.push(book);
		localStorage.setItem("favorite",JSON.stringify(favorite));
		RemoveBook();
		ReadBook();
		ShowBook();
		EditBook();
}
}
	zone2.ondrop = function(){
		if(id.substr(0,1) == 'l'){
		let first = booksList.firstChild;
		newClone.setAttribute('id',(booksList.children.length-2));
		booksList.insertBefore(newClone,first);
		const book = {
			login: favorite[id.slice(1)].login,
			file: favorite[id.slice(1)].file,
			read: favorite[id.slice(1)].read
		};
		booksLike.children[(booksLike.children.length-2)-(id.slice(1))].remove();
		for(var i = 0; i < booksLike.children.length-1; i++){
			booksLike.children[i].setAttribute('id',"l"+(booksLike.children.length-2-i));
		}
		favorite.splice(id.slice(0,1),1);
		localStorage.setItem("favorite",JSON.stringify(favorite));
		books.push(book);
		localStorage.setItem("books",JSON.stringify(books));
		RemoveBook();
		ReadBook();
		ShowBook();
		EditBook();
	}
	}
}

function Drag(){
	zone1.ondragover = allowDrop;
	zone2.ondragover = allowDrop;

	function allowDrop(event){
		event.preventDefault();
	}
}

function ShowBook(){
	checks = document.getElementsByName('check');
	checks.forEach(function(item){
		item.addEventListener("click",function(){
			document.querySelector(".check__read").style.display = "block";
			document.querySelector(".check__edit").style.display = "none";
			if(item.closest("#books-list")){
				bookId = item.closest(".list__book").getAttribute('id');
				document.querySelector(".check").children[0].children[0].innerHTML = books[bookId].file;
				document.querySelector(".check").children[0].children[1].innerHTML = books[bookId].login;
			}
			else if(item.closest("#books-like")){
				bookId = item.closest(".list__book").getAttribute('id').slice(1);
				document.querySelector(".check").children[0].children[0].innerHTML = favorite[bookId].file;
				document.querySelector(".check").children[0].children[1].innerHTML = favorite[bookId].login;
			}
		});
	});
}

function EditBook(){
	edits = document.getElementsByName('edit');
	edits.forEach(function(item){
		item.addEventListener("click",function(){
			document.querySelector(".check__edit").style.display = "flex";
			document.querySelector(".check__read").style.display = "none";
			if(item.closest("#books-list")){
				bookId = item.closest(".list__book").getAttribute('id');
				document.querySelector("#edit-name").value = books[bookId].file;
				document.querySelector(".edit-text").value = books[bookId].login;
			}
			else if(item.closest("#books-like")){
				bookId = item.closest(".list__book").getAttribute('id');
				document.querySelector("#edit-name").value = favorite[bookId.slice(1)].file;
				document.querySelector(".edit-text").value = favorite[bookId.slice(1)].login;
			}
		});
	});
}

function SaveBook(){
	if (document.querySelector("#edit-name").value) {
		if(bookId.substr(0,1) != "l"){
			books[bookId].file = document.querySelector("#edit-name").value;
			books[bookId].login = document.querySelector(".edit-text").value;
			document.getElementById(bookId).children[0].children[1].innerHTML =
			books[bookId].file;
			localStorage.setItem('books', JSON.stringify(books));
		}
		else if(bookId.substr(0,1) == "l"){
			favorite[bookId.slice(1)].file = document.querySelector("#edit-name").value;
			favorite[bookId.slice(1)].login = document.querySelector(".edit-text").value;
			document.getElementById(bookId).children[0].children[1].innerHTML =
			favorite[bookId.slice(1)].file;
			localStorage.setItem('favorite', JSON.stringify(favorite));
		}
		document.querySelector(".check__edit").style.display = "none";
	}
}

function ReadBook(){
	reads = document.getElementsByName('read');
	reads.forEach(function(item){
		item.addEventListener("click",function(){
			if(item.closest("#books-list")){
				if (!books[item.closest(".list__book").getAttribute('id')].read) {
					books[item.closest(".list__book").getAttribute('id')].read = true;
					localStorage.setItem('books',JSON.stringify(books));
					item.closest(".list__book").style.backgroundColor = "#ABB2B9";
					item.closest('.list__book').children[1].children[1].innerHTML = "прочитал";
					let first = booksList.firstChild;
					if(item.closest(".list__book").getAttribute('id') !=booksList.children[0].getAttribute('id')){
						let newClone = item.closest('.list__book');
						item.closest('.list__book').remove();
						booksList.insertBefore(newClone,first);
					}
				}
				else if(books[item.closest(".list__book").getAttribute('id')].read){
					books[item.closest(".list__book").getAttribute('id')].read = false;
					localStorage.setItem('books',JSON.stringify(books));
					item.closest(".list__book").style.backgroundColor = "white";
					item.closest('.list__book').children[1].children[1].innerHTML = "прочитана";
					let newClone = item.closest(".list__book");
					item.closest(".list__book").remove();
					let sec = booksList.children[booksList.children.length-2];
					booksList.insertBefore(newClone,sec);
				}
		}
			else if(item.closest("#books-like")){
				if (!favorite[item.closest(".list__book").getAttribute('id').slice(1)].read) {
					favorite[item.closest(".list__book").getAttribute('id').slice(1)].read = true;
					localStorage.setItem('favorite',JSON.stringify(favorite));
					item.closest(".list__book").style.backgroundColor = "#ABB2B9";
					item.closest('.list__book').children[1].children[1].innerHTML = "прочитал";
					let first = booksLike.firstChild;
					if(item.closest('.list__book').getAttribute('id').slice(1) != booksLike.children[0].getAttribute('id').slice(1)){
						let newClone = item.closest('.list__book');
						item.closest('.list__book').remove();
						booksLike.insertBefore(newClone,first);
					}
				}
				else if(favorite[item.closest(".list__book").getAttribute('id').slice(1)].read){
					favorite[item.closest(".list__book").getAttribute('id').slice(1)].read = false;
					localStorage.setItem('favorite',JSON.stringify(favorite));
					item.closest(".list__book").style.backgroundColor = "white";
					item.closest('.list__book').children[1].children[1].innerHTML = "прочитана";
					let newClone = item.closest(".list__book");
					item.closest(".list__book").remove();
					let sec = booksLike.children[booksLike.children.length-1];
					booksLike.insertBefore(newClone,sec);
				}
		}
		});
	});
}

function RemoveBook(){
	els = document.getElementsByName('del');
	els.forEach(function(item){
		item.addEventListener("click",function(){
			if(item.closest("#books-list")){
				books.splice(item.closest(".list__book").getAttribute('id'),1);
				localStorage.setItem('books', JSON.stringify(books));
			}
			else if (item.closest("#books-like")){
				favorite.splice((item.closest(".list__book").getAttribute('id').slice(1)),1);
				localStorage.setItem('favorite', JSON.stringify(favorite));
			}
			item.closest(".list__book").remove();

			
			
		});
	});
}


function ShowFileBlock(){
	document.getElementById("list__upload").style.display = "block";
	document.getElementById("list__self").style.display = "none";
}

function ShowWriteBlock(){
	document.getElementById("list__self").style.display = "block";
	document.getElementById("list__upload").style.display = "none";
}

if(localStorage.getItem('books')){
	books = JSON.parse(localStorage.getItem('books'));
}

if (localStorage.getItem('favorite')) {
	favorite = JSON.parse(localStorage.getItem('favorite'));
}


function submitFile(event){
	event.preventDefault();
	const file = this.elements['add-form__file'].files[0];
	this.elements['add-form__file'].value = "";
	const form = new FormData(event.target);
	form.append('login','login value');
	form.append('file',file);
	fetch('https://apiinterns.osora.ru/',
		{method: 'POST',
		body: form}).then((res)=>res.json())
		.then((data)=>{
			const book = {
				login: data.text,
				file: data.title,
				read: false
			};

			books.push(book);

			localStorage.setItem('books', JSON.stringify(books));

			let first = booksList.firstChild;
			let newClone = clone.cloneNode(true);
			newClone.setAttribute('id',books.length-1);
			newClone.children[0].children[1].innerHTML = book.file;
			booksList.insertBefore(newClone,first);
			RemoveBook();
			ReadBook();
			ShowBook();
			EditBook();
		});
}

function submitTitle(event){
	event.preventDefault();
	const book = {
		login: this.elements['discription-book'].value,
		file: this.elements['name-book'].value,
		read: false
	};
	books.push(book);
	localStorage.setItem('books', JSON.stringify(books));
	let first = booksList.firstChild;
	let newClone = clone.cloneNode(true);
	newClone.setAttribute('id',books.length-1);
	newClone.children[0].children[1].innerHTML = this.elements['name-book'].value;
	booksList.insertBefore(newClone,first);
	this.elements['name-book'].value = "";
	this.elements['discription-book'].value = "";
	RemoveBook();
	ReadBook();
	ShowBook();
	EditBook();
}

document.addEventListener('DOMContentLoaded', function(){
	document.querySelector('.add-form').addEventListener('submit',submitFile);
	document.querySelector('#form-write').addEventListener('submit',submitTitle);
});


