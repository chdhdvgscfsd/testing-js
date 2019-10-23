
class UI{
    constructor(){
        this.init();        //create an initialization method
    }
    init(){
        //display the categories
        this.printCategories();

        //select the results
        this.result = document.getElementById('result');
    }

    //display events
    displayEvents(events){
        //build a template
        let HTMLTemplate = '';

        //loop events and print
        events.forEach(eventInfo =>{
            HTMLTemplate +=`
            <div class="col-md-4 mt-4">
                <div class="card">
                    <div class="card-body">
                        <img class="img-fluid mb-2" src="${eventInfo.logo !== null ? eventInfo.logo.url : ''}"> 
                    </div>
                    <div class="card-body">
                        <div class="card-text">
                            <h2 class="text-center card-title">${eventInfo.name.text}</h2>
                            <p class="lead text-info">Event Information:</p>
                            <p>${eventInfo.description.text.substring(0,200)}...</p>
                            <span class="badge badge-primary">Capacity: ${eventInfo.capacity}</span>
                            <span class="badge badge-secondary">Date & Time: ${eventInfo.start.local}</span>

                            <a href="${eventInfo.url}" target="_blank" class="btn btn-primary btn-block mt-4">Get Tickets</a>
                        </div>
                    </div>
                </div>
            </div>
            
            `;
        });
        this.result.innerHTML = HTMLTemplate;

    }

    printCategories(){
        const categoryList = eventBrite.getCategoriesAPI() //a json 
        .then(data => {
            //create another var to hold cat obj
            const categoryList = data.categories.categories;

            //build the select from REST API
            const select = document.getElementById('category');

            //loop through to insert categories into select
            categoryList.forEach(cat => {
                //create an opton tag
                const opton = document.createElement('option');
                opton.value = cat.id;
                opton.appendChild(document.createTextNode(cat.name));
                select.appendChild(opton);
                
            });
          
        })
        .catch(error => console.log(error));
    }

    printMessage(message,className){
        //create a div
        const div = document.createElement('div');
        div.className = className;
        //add text
        div.appendChild(document.createTextNode(message));
        
        //insert into HTML
        const searchDiv = document.getElementById('search-events');
        searchDiv.appendChild(div);

        //set timeout
        setTimeout((e)=>{
            //document.getElementById('.alert').remove();... same as removeMessage Method
            this.removeMessage();
        },3000)
    }
    //remove message
    removeMessage(){
        const alert = document.querySelector('.alert');
        if(alert){
            alert.remove();
        }
    }
    
}