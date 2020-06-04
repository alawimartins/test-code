// An object to list the possible errors messages 
const ERROR_CODES = {
    'NO_STOCK': 'No stock has been found',
    'INCORRECT_DETAILS': 'Incorrect details have been entered',
}


/**
 * @param {array} states
 * @param {function} onDone, a function to call when everything is done with the final result!
 */ 
function getProcessingPage(states, onDone){
    
    const nextState = states.shift(); //  This will return the first element of the array and reduce the states array by 1.

    if(nextState){
        if(nextState.state === 'processing') {
            setTimeout(() => { // recursive call
                getProcessingPage(states, onDone) //call the same function with the new states array, pass same callback function
            }, 2000)

        } 
        else if (nextState.state === 'success') {
            const response = { title: 'Order complete', message: null }
            onDone(response);
        } 
        else if(nextState.state === 'error') {
            const response= { title: 'Error page', message: (ERROR_CODES[nextState.errorCode] || null) }
            onDone(response); 
        }
    }  
}

let testData = [{ state: 'processing' }, { state: 'error', errorCode: 'NO_STOCK' }];


getProcessingPage(testData, function (response){
    console.log(response)
});


