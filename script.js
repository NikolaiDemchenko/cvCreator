const data = {
    cvPhotoUrl: null,
    firstName: null,
    lastName: null,
    dateOfBirth: null,
    email: null,
    phone: null,
    addInfo : []
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phoneNumber) {
   const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
   return re.test(phoneNumber);
}
function validateDate(date) {
    let validateDate = new Date(date);
    return +validateDate.getFullYear() <= 2021 ? +validateDate.getFullYear() >= 1900 : null;
}
function infoBoxCreator() {
    const infoBox = document.querySelector('.info-box');
    const newInfoBox = infoBox.cloneNode(true);
    newInfoBox.classList.remove('hide');
    return newInfoBox;
}

function fieldCreator() {
    const field = document.querySelector('.field-box');
    const newField = field.cloneNode(true);
    newField.classList.remove('1');
    return newField;
}

function cvCreator() {
    const cv = document.querySelector('.cv'),
         firstName = document.querySelector('.first-name'),
         lastName = document.querySelector('.last-name'),
         dateBirth = document.querySelector('.date-birth'),
         email = document.querySelector('.email'),
         cellphone = document.querySelector('.cellphone'),
         cvPhoto = document.querySelector('.cv-photo');

    cv.classList.remove('hide');
    Boolean(data.firstName) === true ? firstName.textContent = data.firstName : null;
    Boolean(data.lastName) === true ? lastName.textContent = data.lastName : null;
    if (Boolean(data.dateOfBirth) === true) {
        let date = new Date(data.dateOfBirth);
        dateBirth.textContent = date.getDate() + '.';
        dateBirth.textContent += (+date.getMonth() + 1) + '.';
        dateBirth.textContent += date.getFullYear();
    }
    Boolean(data.email) === true ? email.textContent = data.email : null;
    Boolean(data.phone)=== true ? cellphone.textContent = data.phone : null;
    Boolean(data.cvPhotoUrl) === true ? cvPhoto.src = data.cvPhotoUrl : null;
    addAdditionalInfoToCv();

}

function addAdditionalInfoToData() {
    const infoBox = document.querySelectorAll('.info-box'),
          blockHeader = document.querySelectorAll('#block-header'),
          fieldHeader = document.querySelectorAll('#field-header'),
          fieldContent = document.querySelectorAll('#field-content');

    infoBox.forEach((el, index) => {
        if (el.classList.contains('hide') === false) {
            data.addInfo.push({
                blockHeader: null,
                fieldHeader: [],
                fieldContent: []
            });
            fieldHeader.forEach(fh => {
                if (el.contains(fh)) {
                    data.addInfo[index - 1].fieldHeader.push({fieldHeaderText: fh.value});
                }
            });
            fieldContent.forEach(fc => {
                if (el.contains(fc)) {
                    data.addInfo[index - 1].fieldContent.push({fieldContentText: fc.value});
                }
            });
            blockHeader.forEach(bh => {
                if (el.contains(bh)) {
                    data.addInfo[index - 1].blockHeader = bh.value;
                }
            });
        }
    });
}

function additionalInfoCreator() {
    const additionalInfo = document.querySelector('.additional-info');
    data.addInfo.forEach(el => {
        const div = document.createElement('div'),
            p = document.createElement('p'),
            ul = document.createElement('ul');
        if (el.blockHeader !== '') {
            p.textContent = el.blockHeader;
            div.append(p);
            el.fieldHeader.forEach((fh, index) => {
                const li = document.createElement('li');
                try {
                    if (fh.fieldHeaderText === '' || el.fieldContent[index].fieldContentText === '') {
                        throw new Error('empty Field');
                    }
                    li.textContent = `${fh.fieldHeaderText} : ${el.fieldContent[index].fieldContentText}`;
                    ul.append(li);
                } catch (e) {
                    console.log(e);
                }

            });
            div.appendChild(ul);
            additionalInfo.append(div);
        }
    });
}

function addAdditionalInfoToCv() {
    const additionalInfo = document.querySelector('.additional-info');
    new Promise(((resolve, reject) => {
        additionalInfo.hasChildNodes() === false ? resolve() : reject();
    })).then(() => {
        additionalInfoCreator();
    }).catch(() => {
        while (additionalInfo.firstChild) {
            additionalInfo.removeChild(additionalInfo.firstChild);
        }
        additionalInfoCreator();
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector('main'),
          cvBtn = document.querySelector('.cv-create-btn'),
          addInfoBtn = document.querySelector('.add-info'),
          photoBox = document.querySelector('.photo-box');

    main.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-section-text'))  {
            event.target.before(infoBoxCreator());
            addInfoBtn.classList.remove('hide');
        }
        if (event.target.classList.contains('add-field-text'))  {
            event.target.before(fieldCreator());
        }
    });

    main.addEventListener('input', (event) => {
        if (event.target.id === 'first-name') {
            data.firstName = event.target.value;
        }
        if (event.target.id === 'last-name') {
            data.lastName = event.target.value;
        }
        if (event.target.id === 'date-birth') {
            if (validateDate(event.target.value)) {
                event.target.style.color = 'green';
                data.dateOfBirth = event.target.value;
            }
            else {
                data.dateOfBirth = null;
                event.target.style.color = 'red';
            }
        }
        if (event.target.id === 'email') {
            if (validateEmail(event.target.value) !== false) {
                event.target.style.color = 'green';
                data.email = event.target.value;
            }
            else {
                event.target.style.color = 'red';
            }
        }
        if (event.target.id === 'cellphone') {
            if (validatePhone(event.target.value) !== false) {
                event.target.style.color = 'green';
                data.phone = event.target.value;
            }
            else {
                event.target.style.color = 'red';
            }
        }
    });

    cvBtn.addEventListener('click', cvCreator);

    addInfoBtn.addEventListener('click', () => {
        if (data.addInfo[0] === undefined) {
            addAdditionalInfoToData();
        }
        else {
            data.addInfo = [];
            addAdditionalInfoToData();
        }
    });
    photoBox.addEventListener('click', () => {
        const addPhotoBox = document.querySelector('.add-photo-box');
        addPhotoBox.classList.remove('hide');
    });
    const addPhoto = document.querySelector('.add-photo');
    addPhoto.addEventListener('change', () => {
        const addPhotoBox = document.querySelector('.add-photo-box'),
              photo = document.querySelector('.photo');
        addPhotoBox.classList.add('hide');
        photo.src = URL.createObjectURL(addPhoto.files[0]);
        data.cvPhotoUrl = URL.createObjectURL(addPhoto.files[0]);
    });
});

validateDate('1212-12-23');

