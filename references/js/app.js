const fromDropDown = document.querySelector('#from');
const toDropDown = document.querySelector('#to');

const textBox1 = document.querySelector('#ta1');
const textBox2 = document.querySelector('#ta2');

const toggleButton = document.querySelector('.toggle');

const clearText = document.querySelector('.delete');

const baseURL = "https://api.mymemory.translated.net/get?";

// Event Listeners
toggleButton.addEventListener('click',toggleLanguages);
textBox1.addEventListener('keyup',translate);
clearText.addEventListener('click',clear);


function toggleLanguages(){
    
    let from = fromDropDown.value;
    let to = toDropDown.value;

    fromDropDown.value = to;
    toDropDown.value = from;

}

async function translate(){

    if(textBox1.value == ""){
        clearText.classList.remove('active');
        clearText.classList.add('inactive');
        textBox2.value = textBox1.value;
    }
    else{
        let translateText = textBox1.value;
        textBox2.value = translateText;
        clearText.classList.remove('inactive');
        clearText.classList.add('active');
        let from = fromDropDown.value;
        let to = toDropDown.value;
        
        const response = await fetch(baseURL+"q="+translateText+"&langpair="+from+"|"+to);
        const data = await response.json();
        if(data.matches != ""){
            let translatedText = data.matches[0].translation;
            textBox2.value = translatedText;
        }else{
            textBox2.value = "Too many request!";
        }
        

    }

    
}

function clear(){
    textBox1.value = "";
    textBox2.value = "";
    clearText.classList.remove('active');
    clearText.classList.add('inactive');

}