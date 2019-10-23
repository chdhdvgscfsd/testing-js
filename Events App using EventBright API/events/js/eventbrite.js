/*create an account online(eventbrite.com/developer/v3) then create a new API key

*/

class EventBrite{
    constructor(){
        //create an authourization token taken frm the your online account
        this.auth_token = 'RZBES67YOFGO3GSFGDEW';
        this.orderBy = 'date';
    }

    //get the events from the API
    async queryAPI(eventName,category){
        const eventsResponse = await fetch
        (`https://www.eventbriteapi.com/v3/events/search/?q=${eventName}&sort_by=${this.orderBy}&categories=${category}&token=${this.auth_token}`);
        
        //wait for response and return json
        const events = await eventsResponse.json();

        return{
            events
        }
    }

    // get the categories from the API
    async getCategoriesAPI(){
        //query the API
        const categoriesResponse = await fetch
        (`https://www.eventbriteapi.com/v3/categories/?token=${this.auth_token}`);
        
        const categories = await categoriesResponse.json();   //send it to the UI class
        return{
            categories
        }
    }

    

}