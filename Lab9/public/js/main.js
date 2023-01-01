let myForm = document.getElementById('myForm');
let textInput = document.getElementById('text_input');
let error = document.getElementById('error');
let results = document.getElementById('results');
let frmLabel = document.getElementById('formLabel');

// take '[3,2,1]' and transfer to array
function strToArray(str) {
    let strLen = str.length;
    str = str.slice(1,strLen-1);
    str = str.replaceAll(',', ' ');
    arr = str.split(' ');
    if (arr.length == 0) throw 'error: empty array'
    let out = [];
    for (x of arr) {
        if(isNaN(Number(x))) throw `error: ${x} is not a number`;
        if(!Number.isInteger(Number(x))) throw `error: ${x} is not an integer`
        out.push(Number(x));
    }
    return out;
};

function sortArray(str) {
    const pattern = /\[[0-9a-zA-Z\p{S}\p{P}]*\]/gu;
    str = str.trim();
    if(str.length == 0) throw `error: input is empty`;
    let input = str.match(pattern);
    if (!input) throw `error: ${str} not valid`
    let arrays = [];
    input.forEach(x => {arrays.push(strToArray(x))});
    let out = [];
    for (arr of arrays) {
        out = out.concat(arr);
        out.sort(function(a, b) {return a-b});
    }
    return out;
}

if (myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        try{
            textInput.classList.remove('inputClass');
            error.hidden = true;
            //frmLabel.classList.remove('error');

            let li = document.createElement('li');
            li.innerHTML = sortArray(textInput.value);
            listLen = document.getElementById('results').getElementsByTagName('li').length;
            console.log(listLen);
            if (listLen%2==0) {
                li.classList.add("is-green");
            } else if (!listLen%2==0) {
                li.classList.add("is-red");
            }
            
            results.appendChild(li);
            myForm.reset();
            textInput.focus();
        } catch(e) {
            textInput.value = '';
            error.hidden = false;
            error.innerHTML = e;
            //frmLabel.className = 'error';
            textInput.focus();
            textInput.className = 'inputClass';
        }
    })
}