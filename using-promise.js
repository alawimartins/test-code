// An object to list the possible errors messages 
const ERROR_CODES = {
    'NO_STOCK': 'No stock has been found',
    'INCORRECT_DETAILS': 'Incorrect details have been entered',
}


/**
 * The process function is called when the state equals to processing
 * it serves to use setTimeout function as a promise
 */ 
function process(){ 
    
    return new Promise(resolve => {

        setTimeout(() => {
            resolve();
        },2000);
    })
}

/*
 * @param {array} states
 */ 
function getProcessingPage(states){

    const nextState = states.shift(); //  This will return the first element of the array and reduce the states array by 1.

    if(nextState){
        if(nextState.state === 'processing') { 
            return process().then(() => getProcessingPage(states)) //once the process function is complete it call the getProcessingPage function with the new states array
        } 
        else if (nextState.state === 'success') {
            return Promise.resolve({ title: 'Order complete', message: null })
        } 
        else if(nextState.state === 'error') {
            const response= { title: 'Error page', message: (ERROR_CODES[nextState.errorCode] || null) }
            return Promise.resolve(response);
        }
    }
    else {
        // do something here
        return Promise.reject()
    }
}


/**
 * TEST
 */

let testData = [{ state: 'processing' }, { state: 'error' , errorCode: 'NO_STOCK'}]
// testData = [{ state: 'processing' }, { state: 'error' , errorCode: 'INCORRECT_DETAILS'}];
// testData = [{ state: 'error' , errorCode: 'NO_STOCK'}];
// testData = [];
// testData = [{ state: 'processing' }];
// testData = [{ state: 'success' }];
// testData = [{ state: 'processing' }, { state: 'success' }];
// testData = [{ state: 'processing' }, { state: 'error' , errorCode: null }];
// testData = [{ state: 'processing' }, { state: 'error' , errorCode: undefined }];

getProcessingPage(testData) // call function to test with the current data set
    .then((message) => console.log(`- result = ${JSON.stringify(message)}`))
    .catch((err) => {
        console.log(`err = ${err}`)
    });
