// select the main board div
const board = document.querySelector('#board');
// select the form input text field
const boxValue = document.querySelector('#box-value');
// select the user input form
const userInput = document.querySelector('#user-input');
// select the submit button
const submitButton = document.querySelector('#submit-button');
// add click listener to submit button
submitButton.onclick = submitForm;


// get and display the current user's skills array
async function getSkillsArray() {

    const response = await fetch('/user-skills', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const user = await response.json();
    populateBoard(user.boardContent);

    const image = document.createElement('img');
    image.src = user.imageUrl;
    image.classList.add('user-image');
    document.querySelector('#top-menu').append(image);
}
// invoke
getSkillsArray();


// select the box that is clicked and display its content
function boxSelect() {
    const newTopic = document.querySelector('#text-input');
    content = this.innerText;
    index = this.key;
    boxValue.innerText = 'Box#'.concat(' ', index, '\n', content);
    newTopic.value = content;
}


// toggle box color
function toggleColor() {
    this.classList.toggle('outstanding');
    this.classList.toggle('acquired');
}


// populate the board with values from the user's boardContent array
function populateBoard(arrayOfSkills) {

    return arrayOfSkills.forEach((skill, index) => {
        const box = document.createElement('div');

        box.key = index;
        box.onclick = boxSelect;
        box.classList.add('boxes');
        box.innerText = skill.value;

        if (skill.status === 'outstanding') {
            box.classList.add('outstanding');
        }
        else if (skill.status === 'acquired') {
            box.classList.add('acquired');
        }

        board.append(box);
    });
}


function submitForm(e) {
    e.preventDefault();

    // select array of all boxes, form input text, interface screen text, and radio buttons
    const boxes = board.querySelectorAll('.boxes');
    const newValue = document.querySelector('#text-input').value;
    const boxValue = document.querySelector('#box-value').innerText;
    const radioButtons = document.querySelectorAll('.radio');

    // alert if no Box selected
    if (boxValue === '') {
      alert('Please select a box on the grid!');
        // Swal.fire(
        //     'Please select a box on the grid!',
        //     '',
        //     'question'
        // );
        // return;
    }

    // prepare update for box and interface
    const newStatus = radioButtons[0].checked ? radioButtons[0].id : radioButtons[1].id;
    const oldStatus = radioButtons[0].checked ? radioButtons[1].id : radioButtons[0].id;
    const boxIndex = boxValue.match(/\b(0?[0-9]|[1-9][0-9]|100)\b/g)[0];
    const selectedBox = boxes[boxIndex];

    // update box
    selectedBox.innerText = newValue;
    selectedBox.classList.add(newStatus);
    selectedBox.classList.remove(oldStatus);

    // update the interface
    document.querySelector('#box-value').innerText = 'Box#'.concat(' ', boxIndex, '\n', newValue);

    // prepare database update
    const updateObject = {
        status: newStatus,
        value: newValue,
        index: boxIndex,
    }

    // update database
    const request = fetch('/user-skills', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateObject)
    });

}
