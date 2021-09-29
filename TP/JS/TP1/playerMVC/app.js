// ============== Model =========================
function AddressBookModel() {
    this.contactsData = [
        {
            fname: "Anbu",
            lname: "Arasan",
            phone: "190-309-6101",
            email: "anbu.arasan@email.com",
        },
        {
            fname: "Arivu",
            lname: "Mugilan",
            phone: "490-701-7102",
            email: "arivu.mugilan@email.com",
        },
        {
            fname: "Bob",
            lname: "Johnson",
            phone: "574-909-3948",
            email: "bob.johnson@email.com",
        },
        {
            fname: "Raja",
            lname: "Tamil",
            phone: "090-909-0101",
            email: "raja.tamil@email.com",
        },
        {
            fname: "Sundar",
            lname: "Kannan",
            phone: "090-909-0101",
            email: "sundar.kannan@email.com",
        },
        ];
    this.getAllContacts = function(){
        return this.contactsData;
    }
}


// ============== View =========================
function AddressBookView() {
    this.init = function() {
        this.renderContactListModule();
    }
    this.renderContactListModule = function() {
        //get all contacts and assign to contacts 
        var contacts = addressBookApp.getContacts();// cache #contact-list DOM 
        var $contactDivUI = document.getElementById('contact-list');// clear HTML from the DOM 
        var $contactListUI = document.createElement('ul');
        $contactDivUI.replaceChildren($contactListUI);
        $contactListUI.innerHTML = '';
        for (var i = 0, len = contacts.length; i < len; i++) {
            var $li = document.createElement('li');
            $li.setAttribute('class', 'contact-list-item');
            $li.setAttribute('data-index', i);
            $li.innerHTML = contacts[i]['fname']+', '+contacts[i]['lname'];
            $contactListUI.append($li);
        }
    }
}


//================ Controller ==================
function AddressBookCtrl (addressBookView, addressBookModel) {
    this.addressBookView = addressBookView;
    this.addressBookModel = addressBookModel;

    this.init = function() {
        this.addressBookView.init();
    }
    this.getContacts = function() {
        return this.addressBookModel.getAllContacts();
    }
}


const addressBookView = new AddressBookView();
const addressBookModel = new AddressBookModel();
const addressBookApp = new AddressBookCtrl(addressBookView,addressBookModel);


window.addEventListener("DOMContentLoaded",function(){addressBookApp.init()});