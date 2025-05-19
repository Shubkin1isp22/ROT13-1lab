const alphabetLower = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
];

const alphabetUpper = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
];

function findIndex(arr, char) {
    for (let i = 0; i < 26; i++) {
        if (arr[i] === char) {
            return i;
        }
    }
    return -1;
}

function rot13Decode(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        let element = text[i];                               // element - элемент массива из введённого текста.

        let idx = findIndex(alphabetLower, element);         // проверка на нижний регистр, если да, то прибаваляем к индексу 13
        if (idx !== -1) {                                    // idx - индекс в алфавите знака element.
            let newIdx = (idx + 13) % 26;
            result = result + alphabetLower[newIdx];

        } else {                                        // проверка верхнего регистра
            idx = findIndex(alphabetUpper, element);         
            if (idx !== -1) {
                let newIdx = (idx + 13) % 26;
                result = result + alphabetUpper[newIdx];
            } else {                                        // не то, не другое, значит не латинница, а другой символ, записываем в итоговый вывод так.
                result = result + element;
            }
        }
        i = i + 1;
    }
    return result;
}

function decodeText() {
    const text = document.getElementById("text").value;
    const decoded = rot13Decode(text);
    document.getElementById("result").value = decoded;
}