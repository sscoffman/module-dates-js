//today's date
const TODAY = new Date();
//Bootstrap cards will be added to this element later in the script
const CARDHOLDER = document.getElementById('card-holder'); 

/*------------------------------------------------
Adjust the dates for arr15, arr71, arr72, and arrMeme
at the beginning of each new semester.  The script 
should work with any number of modules.
--------------------------------------------------*/

//this array holds the 15 week recommended due dates
const arr15 = [new Date("May 25, 2022 11:59:00"),   //module 1
    new Date("June 7, 2022 11:59:00"),              //module 2
    new Date("June 21, 2022 11:59:00"),             //module 3
    new Date("July 5, 2022 11:59:00"),              //module 4
    new Date("July 19, 2022 11:59:00"),             //module 5
    new Date("August 2, 2022 11:59:00"),            //module 6
    new Date("August 15, 2022 11:59:00")            //module 7
]

//this array holds the first 7.5 week recommended due dates
const arr71 = [new Date("May 17, 2022 11:59:00"),   //module 1
    new Date("May 24, 2022 11:59:00"),              //module 2 
    new Date("May 31, 2022 11:59:00"),              //module 3
    new Date("June 7, 2022 11:59:00"),              //module 4
    new Date("June 14, 2022 11:59:00"),             //module 5
    new Date("June 21, 2022 11:59:00"),             //module 6
    new Date("June 28, 2022 11:59:00")              //module 7
]

//this array holds the second 7.5 recommended due dates
const arr72 = [new Date("July 5, 2022 11:59:00"),   //module 1
    new Date("June 12, 2022 11:59:00"),              //module 2
    new Date("June 19, 2022 11:59:00"),             //moudle 3
    new Date("July 26, 2022 11:59:00"),              //module 4
    new Date("August 2, 2022 11:59:00"),             //module 5
    new Date("August 9, 2022 11:59:00"),            //module 6
    new Date("August 15, 2022 11:59:00")            //module 7
]

//this array holds the MEME recommended due dates
const arrMeme = [new Date("June 22, 2022 11:59:00"), //module 1
    new Date("July 1, 2022 11:59:00"),              //module 2
    new Date("July 10, 2022 11:59:00"),             //module 3
    new Date("July 19, 2022 11:59:00"),              //module 4
    new Date("July 28, 2022 11:59:00"),             //module 5
    new Date("August 8, 2022 11:59:00"),            //module 6
    new Date("August 15, 2022 11:59:00")            //module 7
]

//when the page loads, the 15 week schedule will be loaded by default
document.addEventListener('DOMContentLoaded', function(){
    processDates(arr15);
})

//listens for schedule selection change, calls processDates and passes in the appropriate array
document.getElementById('schedule-select').addEventListener('change', function(){
    let choice = document.getElementById('schedule-select');
    let heading = document.querySelector('.display-5.fw-bold')
    switch (choice.value) {
        case "15":
            processDates(arr15);
            heading.innerHTML = '15 Week Schedule'
            break;
        case "71":
            processDates(arr71);
            heading.innerHTML = '7.5 Week Schedule (First Half)'
            break;
        case "72":
            processDates(arr72);
            heading.innerHTML = '7.5 Week Schedule (Second Half)'
            break;
        case "10":
            processDates(arrMeme);
            heading.innerHTML = 'MEME Schedule (Late Start)'
            break;
        default:
            console.log("Something has gone wrong.");
    }
})

//loops through the array of module dates,
//calls a function that generates Bootstrap HTML strings
//then adds the HTML to the page
function processDates(moduleArray){
    CARDHOLDER.innerHTML = ""; //reset the inner HTML of our flexbox div
    for (let i = 0; i < moduleArray.length; i++){
        let msg = "";
        let divStr = ""
        let style = "";
        
        //the module due date has passed
        if (moduleArray[i] <= TODAY){
            msg = "The suggested due date has passed for Module " + (i+1) + ".";
            style = " bg-danger"
        }else { //the module date has not passed
            //is this the first module in the array? (can't check an index less than zero)
            if (i == 0){
                msg = "You should be working on Module " + (i + 1);
                style = " bg-warning"
            }else if (moduleArray[i-1] <= TODAY && moduleArray[i] > TODAY){
                //the previous date has passed, AND the next date has not
                msg = "You should be working on Module " + (i + 1) + " or on a later module.";
                style = " bg-warning"
            } else {
                //if this module isn't past due, and it isn't the current module, then it isn't due yet
                msg = "Module " + (i+1) + " is not due yet.";
                style = " bg-success"
            }
         
        }

        //moduleDivTemplate will return a string containing the HTML that needs to be added to the page
        divStr = moduleDivTemplate(i + 1, moduleArray[i].toDateString(), msg, style);
        CARDHOLDER.innerHTML += divStr; //add the HTML to the page
    }
}

//This function creates a string containing the HTML for a Bootstrap card
function moduleDivTemplate(modNum, modDate, modMsg, specialStyle){
    let moduleTemplate = '<div class="card w-100 mb-2">';
    moduleTemplate += '<div class="card-header">Module ' + modNum + '</div>';
    moduleTemplate += '<div class="card-body' + specialStyle + ' bg-opacity-25">';
    moduleTemplate += '<h5 class="card-title">Due: ' + modDate + '</h5>';
    moduleTemplate += '<p class="card-text">' + modMsg + '</p>';
    moduleTemplate += '</div></div>';

    return moduleTemplate;
}



