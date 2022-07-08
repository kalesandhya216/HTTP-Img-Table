
let cl = console.log;

const Info = document.getElementById("Info");
const tableData = document.getElementById("tableData");
const loaderGif = document.getElementById("loaderGif");


let apiUrl = "https://fakestoreapi.com/products";

let newImgArr = [];

let postArray = [];

function fetchData(methodName, url, tempfun, data){

    loaderGif.classList.remove('d-none');

    let xhr = new XMLHttpRequest();

    xhr.open(methodName, url);

    xhr.onload = function(){
        if((xhr.status === 200 || xhr.status === 201) && xhr.readyState === 4){
            loaderGif.classList.add('d-none');
            if(methodName === "GET"){
                newImgArr = JSON.parse(xhr.response);
                
                tempfun(newImgArr);
            }
        }
        if(xhr.status === 404){
            alert('page not found');
        }  
        
    }
    


    xhr.send(data);
    }


fetchData('GET', apiUrl, templating);

function templating(imgArr){
    let result = "";
    imgArr.forEach((element) => {
        result += `
                    <div class="col-md-2">
                        <div class="card mb-4" data-id="${element.id}">
                            <div class="card-body">
                                <figure class="myCard">
                                    <img src="${element.image}" alt="">
                                </figure>
                                <div class="text-right">
                                    <button class="btn btn-primary btn-lg" onClick="onAddHandler(this)">Add</button>
                                    <button class="btn btn-danger btn-lg d-none" onClick="onRemoveHandler(this)">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                  `
    });
    Info.innerHTML = result;
}


function generateTable(arr){
    let result = "";
    arr.forEach(element => {
        result += `
                    <tr>
                        <td>${element.id}</td>
                        <td><img src="${element.image}"></td>
                        <td>${element.title}</td>
                    </tr>
                  `
    });
    tableData.innerHTML = result;
}


const onAddHandler = (ele) => {
    let Id = +(ele.closest('.card').dataset.id);
    cl(Id);
    ele.classList.add('d-none');
    ele.nextElementSibling.classList.remove('d-none');

    let getObj = newImgArr.find(o => {
        return Id === o.id;
    });
    cl(getObj);

    let createNewObj = {
        id : getObj.id,
        image : getObj.image,
        title : getObj.title
    }
    cl(createNewObj);
    postArray.push(createNewObj);
    generateTable(postArray);
}


const onRemoveHandler = (e) => {
    let getId = +(e.closest('.card').dataset.id);
    cl(getId);
    e.classList.add('d-none');
    e.previousElementSibling.classList.remove('d-none');

    postArray = postArray.filter((element) => {
        return element.id != getId
    });
    generateTable(postArray);
}