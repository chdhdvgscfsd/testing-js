const eventBrite = new EventBrite();
const ui = new UI();


document.getElementById('submitBtn').addEventListener('click', (e) =>{
    e.preventDefault();

    // creeate var to get form input
    const cityname = document.getElementById('event-name').value;
    const category = document.getElementById('category').value;

    //check for no empty cityname
    if(cityname === ''){
        ui.printMessage('Field cannot be empty','text-center alert alert-danger mt-4');  //class is from bootstrap
    }else{
         
        //query the eventbrite API
        eventBrite.queryAPI(cityname,category)    //a promise so use a '.then'
        .then((event) => {
            //check for events
            const eventList = event.events.events;
            if(eventList.length > 0){
                //print the events
                ui.displayEvents(eventList);
            }else{
                //there are no events
                ui.printMessage('No results Found','text-center alert alert-danger mt-4')
            }
        })
    }
})