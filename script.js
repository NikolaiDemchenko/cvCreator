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
    return re.test(email.toLowerCase());
}

function validatePhone(phoneNumber) {
   const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
   return re.test(phoneNumber);
}

function validateDate(date) {
    return +new Date(date).getFullYear() <= 2021 ? +new Date(date).getFullYear() >= 1900 : null;
}

function infoBoxCreator() {
    const newInfoBox = document.querySelector('.info-box').cloneNode(true);
    newInfoBox.classList.remove('hide');
    return newInfoBox;
}

function fieldCreator() {
    return document.querySelector('.field-box').cloneNode(true);
}

function cvCreator() {
    const firstName = document.querySelector('.first-name'),
          lastName = document.querySelector('.last-name'),
          dateBirth = document.querySelector('.date-birth'),
          email = document.querySelector('.email'),
          cellphone = document.querySelector('.cellphone'),
          cvPhoto = document.querySelector('.cv-photo');

    document.querySelector('.cv').classList.remove('hide');

    if (data.firstName) {
        firstName.textContent = data.firstName;
        firstName.classList.add('active-text');
    }
    if (data.lastName) {
        lastName.textContent = data.lastName;
        lastName.classList.add('active-text');
    }
    if (data.dateOfBirth) {
        const date = new Date(data.dateOfBirth);
        dateBirth.textContent = date.getDate() + '.';
        dateBirth.textContent += (+date.getMonth() + 1) + '.';
        dateBirth.textContent += date.getFullYear();
        dateBirth.classList.add('active-text');
    }
    if (data.email) {
        email.textContent = data.email;
        email.classList.add('active-text');
    }
    if (data.phone) {
        cellphone.textContent = data.phone;
        cellphone.classList.add('active-text');
    }
    if (data.cvPhotoUrl) {
        cvPhoto.src = data.cvPhotoUrl;
        cvPhoto.classList.add('active-text');
    }

    addAdditionalInfoToCv();
}

function addAdditionalInfoToData() {
    const infoBox = document.querySelectorAll('.info-box'),
          blockHeader = document.querySelectorAll('#block-header'),
          fieldHeader = document.querySelectorAll('#field-header'),
          fieldContent = document.querySelectorAll('#field-content');

    infoBox.forEach((el, index) => {
        if (!el.classList.contains('hide')) {
            data.addInfo.push({
                blockHeader: null,
                fieldHeader: [],
                fieldContent: []
            });
            blockHeader.forEach(bh => {
                el.contains(bh) ? data.addInfo[index - 1].blockHeader = bh.value : null;
            });
            fieldHeader.forEach(fh => {
                el.contains(fh) ? data.addInfo[index - 1].fieldHeader.push({fieldHeaderText: fh.value}) : null;
            });
            fieldContent.forEach(fc => {
                el.contains(fc) ? data.addInfo[index - 1].fieldContent.push({fieldContentText: fc.value}) : null;
            });
        }
    });
}

function additionalInfoCreator() {
    data.addInfo.forEach(el => {
        const div = document.createElement('div'),
              p = document.createElement('p'),
              ul = document.createElement('ul');

        if (el.blockHeader) {
            p.textContent = el.blockHeader;
            div.append(p);

            el.fieldHeader.forEach((fh, index) => {
                const li = document.createElement('li');
                if (fh.fieldHeaderText && el.fieldContent[index].fieldContentText) {
                    li.textContent = `${fh.fieldHeaderText} : ${el.fieldContent[index].fieldContentText}`;
                    ul.append(li);
                }
            });

            div.appendChild(ul);
            document.querySelector('.additional-info').append(div);
        }
    });
}

function addAdditionalInfoToCv() {
    const additionalInfo = document.querySelector('.additional-info');
    if (additionalInfo.hasChildNodes()) {
        while (additionalInfo.firstChild) {
            additionalInfo.removeChild(additionalInfo.firstChild);
        }
    }
    additionalInfoCreator();
}

window.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector('main'),
          cvBtn = document.querySelector('.cv-create-btn'),
          addInfoBtn = document.querySelector('.add-info'),
          photoBox = document.querySelector('.photo-box'),
          addPhoto = document.querySelector('.add-photo');

    main.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-section-text'))  {
            event.target.before(infoBoxCreator());
            addInfoBtn.classList.remove('hide');
        }
        event.target.classList.contains('add-field-text') ? event.target.before(fieldCreator()) : null;
    });

    main.addEventListener('input', (event) => {
        event.target.id === 'first-name' ? data.firstName = event.target.value : null;
        event.target.id === 'last-name' ? data.lastName = event.target.value : null;
        if (event.target.id === 'date-birth') {
            if (validateDate(event.target.value)) {
                event.target.style.color = 'green';
                data.dateOfBirth = event.target.value;
            }
            else {
                event.target.style.color = 'red';
            }
        }
        if (event.target.id === 'email') {
            if (validateEmail(event.target.value)) {
                event.target.style.color = 'green';
                data.email = event.target.value;
            }
            else {
                event.target.style.color = 'red';
            }
        }
        if (event.target.id === 'cellphone') {
            if (validatePhone(event.target.value)) {
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
        data.addInfo[0] ? data.addInfo = [] : null;
        addAdditionalInfoToData();
    });

    photoBox.addEventListener('click', () => {
        document.querySelector('.add-photo-box').classList.remove('hide');
    });

    addPhoto.addEventListener('change', () => {
        document.querySelector('.add-photo-box').classList.add('hide');
        data.cvPhotoUrl = URL.createObjectURL(addPhoto.files[0]);
        document.querySelector('.photo').src = data.cvPhotoUrl;
    });
});

