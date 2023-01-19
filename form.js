/* bug : 
1. scroll (done)
2. text overlap element di form output (done)

*/

function addInputAnswer() {
    let newInputAnswer = document.createElement("input");
    newInputAnswer.setAttribute('type', 'text');
    newInputAnswer.classList.add("inputAnswer");
    newInputAnswer.setAttribute('spellcheck', 'false');
    document.querySelector("#answerCreate").appendChild(newInputAnswer);
    $(".inputAnswer").each(function (i) {
        $(this).attr('id', 'inputAnswer_' + i);
    })
}
function removeInputAnswer() {
    let ansCreate = document.querySelector("#answerCreate");
    ansCreate.removeChild(ansCreate.lastChild);
}

let nQuestion = 0;
let questionArr = [];
let answerArr = [[]];

function setAttributesss(elmnt, attrsNvalue) {
    for (let i = 0; i < attrsNvalue.length; i++) {
        elmnt.setAttribute(attrsNvalue[i][0], attrsNvalue[i][1])
    }
}

function createForm(e) {


    let questionValue = document.querySelector("#inputQuestion").value;
    let answerValueArr = document.querySelectorAll(".inputAnswer");
    let newForm = document.createElement("div");
    let newFormQuestion = document.createElement("div");
    let newFormAnswer = document.createElement("div");
    let answerCreate = document.querySelector("#answerCreate");
    // mengappend question ke questionArr
    questionArr.push(questionValue);
    // "mengasih ruang" di answerArr agar tidak undefined saat di push answers nanti
    answerArr.push([]);

    newForm.classList.add("form");
    newFormQuestion.classList.add("questionForm");
    newFormAnswer.classList.add("answerForm");

    // kalau cuma 1 inputAnswer, maka tipe jawaban = isian
    if (answerCreate.children.length == 1) {
        let newDivCAns = document.createElement("div");
        let newInput = document.createElement("textarea");

        newDivCAns.appendChild(newInput);
        newFormAnswer.appendChild(newDivCAns);
        answerArr[answerArr.length - 1].push("___ini isian");

        /*
        newDivCAns.setAttribute('class', 'divChoiceAnswer');
        newInput.setAttribute('id', 'answer_' + nQuestion + '_' + 0); // 0 karena bukan pilgan
        newInput.setAttribute('class', 'inputAnsFormIsian');
        newInput.setAttribute('spellcheck', 'false');
        newInput.setAttribute('row', '2');
        */
        // cara baru
        newDivCAns.setAttribute('class', 'divChoiceAnswer');
        setAttributesss(newInput, [
            ['id', 'answer_' + nQuestion + '_' + 0], // 0 karena bukan pilgan
            ['class', 'inputAnsFormIsian'],
            ['spellcheck', 'false'],
            ['row', '2']
        ])

    } else if (answerCreate.children.length > 1) {
        for (let i = 0; i < answerValueArr.length; i++) {
            // mengappend jawaban ke array answerArr
            answerArr[answerArr.length - 1].push(answerValueArr[i].value);


            // membuat form di tab form
            let newDivCAns = document.createElement("div");
            let newInput = document.createElement("input");
            let newLabel = document.createElement("label");
            newLabel.innerText = answerValueArr[i].value;

            newDivCAns.appendChild(newInput);
            newDivCAns.appendChild(newLabel);
            newFormAnswer.appendChild(newDivCAns);
            // attribut ini diisi sesuai contoh atas yg di HTML (tidak pakai jquery karena masih stuck di param)
            newDivCAns.setAttribute('class', 'divChoiceAnswer');
            /*
            newInput.setAttribute('type', 'radio');
            newInput.setAttribute('name', 'asnwerQ_' + nQuestion);
            newInput.setAttribute('id', 'answer_' + nQuestion + '_' + i);
            newInput.setAttribute('class', 'inputAnsForm');
            newInput.setAttribute('value', 'answerV_' + i);
            newLabel.setAttribute('for', 'answer_' + nQuestion + '_' + i);
            */
            // cara baru
            setAttributesss(newInput, [
                ['type', 'radio'],
                ['name', 'asnwerQ_' + nQuestion],
                ['id', 'answer_' + nQuestion + '_' + i],
                ['class', 'inputAnsForm'],
                ['value', 'answerV_' + i]
            ])
            newLabel.setAttribute('for', 'answer_' + nQuestion + '_' + i);

        }
        // membuat tipe jawaban (radio atau checkbox)
        let newDivChoiceType = document.createElement("div");
        newDivChoiceType.classList.add("radio_checkbox");
        let newChoceTypeB = document.createElement("button");
        newChoceTypeB.innerHTML = "Radio";
        let newChoceTypeC = document.createElement("button");
        newChoceTypeC.innerHTML = "Checkbox";
        newChoceTypeB.setAttribute("onclick", "changeToRadio(event)");
        newChoceTypeC.setAttribute("onclick", "changeToCheckbox(event)");
        newDivChoiceType.appendChild(newChoceTypeB);
        newDivChoiceType.appendChild(newChoceTypeC);
        newForm.appendChild(newDivChoiceType);
    }

    newForm.appendChild(newFormQuestion);
    newForm.appendChild(newFormAnswer);
    document.querySelector("#outputForm").appendChild(newForm);
    newFormQuestion.innerText = questionValue;


    $(".questionForm").each(function (i) {
        $(this).attr("id", "question_" + i);
    });
    $(".form").each(function (i) {
        $(this).attr("id", "formQuestion_" + i);
        $(".ulForm li").each(function (j) {
            $(this).attr("id", "liForm_" + i + "_" + j)
        });
    });

    // di increment nya di akhir karena semua dihitung dari 0
    nQuestion += 1;

    // di kosongkan lagi
    document.querySelector("#inputQuestion").value = '';
    document.querySelectorAll(".inputAnswer").forEach((i) => {
        i.value = '';
    })
}

function changeToRadio(e) {
    let parent = e.target.parentElement.parentElement;
    //console.log(parent);
    let inputType = parent.querySelectorAll(".inputAnsForm");
    for (let i = 0; i < inputType.length; i++) {
        inputType[i].type = "radio";
        inputType[i].checked = false;
    }

}
function changeToCheckbox(e) {
    let parent = e.target.parentElement.parentElement;
    //console.log(parent);
    let inputType = parent.querySelectorAll(".inputAnsForm");
    for (let i = 0; i < inputType.length; i++) {
        inputType[i].type = "checkbox";
        inputType[i].checked = false;
    }
}
let formObj = {};
function submitForm(e) {
    $('.form').each(function () {
        let idFormQnA = $(this).attr('id');
        let tempQnA = {};
        // menyimpan id pertanyaan dan pertanyaanya
        tempQnA.question = [document.getElementById(idFormQnA).querySelector('.questionForm').id, document.getElementById(idFormQnA).querySelector('.questionForm').innerText];

        // menyimpan id jawaban dan jawabannya
        let divChoiceAnswer = document.getElementById(idFormQnA).querySelector('.answerForm').querySelectorAll('.divChoiceAnswer');
        let answer = [];
        $(divChoiceAnswer).each(function (i) {
            try {
                // kalau tipe / attributnya adalah input (pilgan), baik radio maupun checkbox
                answer.push([divChoiceAnswer[i].querySelector('input').id, divChoiceAnswer[i].querySelector('label').innerText]);
            } catch (error) {
                // kalau tipe / attributnya adalah textarea (isian)
                answer.push([divChoiceAnswer[i].querySelector('textarea').id])
            }

        })
        tempQnA.answerArr = answer;

        // memasukkan pertanyaan dan jawaban ke object formObj
        formObj[`${idFormQnA}`] = tempQnA;
    })
    console.log(formObj);
}