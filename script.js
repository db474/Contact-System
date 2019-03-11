const tableKey = "mpd-table";
let clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
    localStorage.removeItem(tableKey);
});
let mpdTable;
let mpdTableDemo = {
    'Debarghya':{
        'phone':'8910247992' ,
    },
    'Debtanu':{
        'phone':'8583025311' ,
    }
};
//this is used so that when the user wants to edit the details the Name of the user remains unchangeable
let enableDisableNameInput = (option) => {
    let newPerson = document.getElementById('newPerson');
    if(option === 'enable')
        newPerson.disabled = false;
    else if (option === 'disable')
        newPerson.disabled = true;
}
let refreshDOMTable = () => {
    mpdTable = mpdTableDemo;
    let mpdTableKeys = Object.keys(mpdTable); //array of names
    let tableContainer = document.getElementById('mpdTableContainer');
    let oldTableBody = document.getElementById('table-body');
    tableContainer.removeChild(oldTableBody);//delete or clear the previous table
    let newTable = document.createElement('span');
    newTable.id = 'table-body'; // here we have deleted whole of the table body and its elements and now created a new table body and we have to add rows to it
    tableContainer.appendChild(newTable);
    for(i = 0; i< mpdTableKeys.length; i++){
        let currRow = document.createElement('div');
        let currName = document.createElement('div');
        let currContact = document.createElement('div');
        let currEditBtn = document.createElement('div');
        let currDeleteBtn = document.createElement('div');
        //assigning classnames to the newly created rows and colummns
        currRow.className = 'mpd-table-row';
        currName.className = 'mpd-table-column mpd-name';
        currContact.className = "mpd-table-column mpd-phone";
        currEditBtn.className = "mpd-table-column mpd-edit";
        currDeleteBtn.className = "mpd-table-column mpd-delete";
        //inner HTML
        currName.innerHTML = mpdTableKeys[i];
        currContact.innerHTML = mpdTable[mpdTableKeys[i]].phone;
        //designing the buttons
        currEditBtn.innerHTML = '<i class="fas fa-pen-square"></i>';
        currDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        //integrating in the Documment Object  Model
        currRow.appendChild(currName);
        currRow.appendChild(currContact);
        currRow.appendChild(currEditBtn);
        currRow.appendChild(currDeleteBtn);
        //pushing the actual row into the table body
        newTable.appendChild(currRow);
    }

    // a single function for modal for appear and disappear
    let enableDisableModal = (option) => {
        let newPerson = document.getElementById('newPerson');
        let newContact = document.getElementById('newContact');
        newPerson.value = '';
        newContact.value = '';
        let newModel = document.getElementById('newModel');
        let back = document.getElementById('back');
        newModel.classname = '$(option)-modal'; // to declare javascript we use $() 
        back.classname = '$(option)-modal';
    }
    let addBtn = document.getElementById('addEntry');
    let editBtns = document.getElementsByClassName('mpd-edit');
    let delBtns = document.getElementsByClassName('mpd-delete');

    let newSubmitBtn = document.getElementById('newSubmitBtn');
    let newCancelBtn = document.getElementById('newCancelBtn');
    //add click functions
    newSubmitBtn.addEventListener('click',() => {
        let newPerson = document.getElementById('newPerson').value.trim();
        let newContact = document.getElementById('newContact').value.trim();
        if(newPerson==='') //checking if the fields are empty
        document.getElementById('newPerson').className = 'input-err';
        else 
        document.getElementById('newPerson').className = '';
        if(newContact==='') //checking if the fields are empty
        document.getElementById('newContact').className = 'input-err';
        else 
        document.getElementById('newContact').className = '';
        if(newPerson !== '' && newContact !== ''){
            let newPerson = {};
            mpdTable[newPerson] = {
                'phone': newContact,
            }
            localStorage.setItem(tableKey, JSON.stringify(mpdTable));
            enableDisableModal('disable');
            refreshDOMTable();
        } 
    });
    newCancelBtn.addEventListener('click',() => {
        enableDisableModal('disable');
    })
    addBtn.addEventListener('click',() => {
        enableDisableModal('enable');
    });
    //for all the edit buttons and what will be their operation when clicked by user
    for(i = 0; i<editBtns.length; i++){
        editBtns[i].addEventListener('click',($event) => {
            let nameToEdit = $event.target.parentElement.children[0].innerText;
            let personToEdit = mpdTable[nameToEdit];
            let newPerson = document.getElementById('newPerson');
            let newContact = document.getElementById('newContact');
            newPerson.value = nameToEdit;
            newContact.value = personToEdit.phone;
            enableDisableNameInput('disable');
        })
    }
    for(i = 0; i<delBtns.length; i++){
        delBtns[i].addEventListener('click',($event) => {
            let nameToDelete = $event.target.parentElement.children [0].innerText;
            let isSure = window.confirm("Are you sure you want to delete"+ nameToDelete + "?");
            if(isSure)
                delUser(nameToDelete);
        })
    }
}
let delUser = (userName) => {
        let tempTable = {};//populate this table who is not equal to username
        let mpdTableKeys = Object.keys(mpdTable);
        for (let i = 0; i< mpdTableKeys.length; i++){
            if(userName !== mpdTableKeys[i]){
                tempTable[mpdTableKeys[i]] =  mpdTable[mpdTableKeys[i]];
            }
        }
        mpdTable = tempTable;
        localStorage.setItem(tableKey, JSON.stringify(mpdTable));
        refreshTable();
    }
let init = () => {
    if(localStorage.getItem(tableKey)){
        mpdTable = JSON.parse(localStorage.getItem(tableKey));
    }
    else {
        mpdTable = mpdTableDemo;
        localStorage.setItem(tableKey, JSON.stringify(mpdTable));
    }
    refreshDOMTable();
}
init();
