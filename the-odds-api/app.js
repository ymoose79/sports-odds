'use strict';


// ************--------------> PUNCH LIST
// [x]   -add date/time component
// [x]   GET RID of nba.  might have to hide the code and insert div element/html
// [x]  ??? attach match ID ???
// [x]  adjust the name(1 line city, 1 line mascot)
// [x]  span date/time for color variations
// [x]  add home/away
// [x]  add color for chalk v dogs 
// [x]    - also make it pop more 

// fix CSS
// [?]    - background image/icon for sport?
// []   

// fix JS
// []  slow load page so API can fetch
// []  erase matches if user picks different fields
// []
// []
// []

// ************--------------> PUNCH LIST



// populate html
const dropDSport = document.getElementById('sport');
const betWindow = document.getElementById('betWindow');
const drawHide = document.getElementById('draw')
const gameRow = document.getElementById('gameRow')


// pull value from field
const listSport = document.getElementById('sport-fields');
const dropDDay = document.getElementById('day');

const apiKey = '**************************c0bb72';



let homeOdds;
let homeOddsChalk;
let homeOddsDog;
let awayOdds;
let awayOddsChalk;
let awayOddsDog;
let draw;
let date;
let time;
let homeA;
let homeB;
let awayA;   
let awayB;


// HELPER F{}  :  add/remove classes

const removeHidden = function(x){
    document.querySelector(x).classList.remove('hidden');
}
const addHidden = function(add){
    document.querySelector(add).classList.add('hidden');
}



// HELPER F{}  :  split up team/player Names
const firstAndLastHome = function (name) {
    homeA = name.split(' ')
    
    if (homeA.length !== 1) {
        homeB = homeA.pop()
        homeA = homeA.join(' ')
    } else {
        
        homeA = homeA.join('')
        homeB = ''
    }
        return
}
const firstAndLastAway = function (name) {
     awayA = name.split(' ')
     awayB = awayA.pop()
    awayA = awayA.join(' ')
    return
}
 


// HELPER F{}  :  add/remove chalk/dog hidden class from 
const oddsHiddenClass = function (h, a) {
    if (h > a) {
        awayOddsChalk = 'chalk'
        awayOddsDog = '--hidden'
        homeOddsChalk = '--hidden'
        homeOddsDog = 'dog'
    } else {
        awayOddsChalk = '--hidden'
        awayOddsDog = 'dog'
        homeOddsChalk = 'chalk'
        homeOddsDog = '--hidden'
    }
    return
 }



// HELPER F{}  :  pull and label odds from data
const findOddValues = function (arr) {
    homeOdds = arr[0];
    if (arr.length === 2) {
        awayOdds = arr[1];
        draw = 'n/a'
    } else {
        draw = arr[1]
        awayOdds = arr[2];
    }

    oddsHiddenClass(homeOdds, awayOdds)
    return;
}




// HELPER F{}  :  format date/time locally
const zuluTime = function (zDate) {
    var startTime = new Date(zDate)
    var options = {
       hour: 'numeric',
       minute: 'numeric',
       hour12: true
    };
// FORMAT: the date
    let x = startTime
       .toString()
       .split(' ')
       date = x.splice(0, 3).join(' ')
 // FORMAT: the time
    let timeString = startTime.toLocaleString('en-US', options);
    time = timeString.replace(',', ' ')
    return 
}
 



const pickSport = function () {
    
    let sportInd;
    fetch(`https://api.the-odds-api.com/v3/sports/?apiKey=${apiKey}`)
        .then(res => {
            return res.json()
        })
        .then(data => {

            const keyMap = data.data.map(obj => obj.key);
            const titleMap = data.data.map(obj => obj.title);
        
            console.log(keyMap);
            console.log(titleMap);

            const x = data.data
            console.log(x[11]);

            // MENU:  -- populate dropDown  PICK-a-SPORT 
            const [...inputSport] = x.map(obj => obj.title)
            for (const [i, el] of inputSport.entries()) {
                        
                if (el !== `Test Matches`) {
                    let html = `
                      <option id="sport" value="${i}">${el}</option>`;
                    dropDSport.insertAdjacentHTML('afterend', html)
                }
            }

            // AFTER: user picks sport
            listSport.addEventListener('change', function () {

                 // set var w/ name of choosen sport 
                sportInd = listSport.value
                console.log(keyMap[sportInd]);
                

                return fetch(`https://api.the-odds-api.com/v3/odds/?apiKey=${apiKey}&sport=${keyMap[sportInd]}&region=us&dateFormat=iso&oddsFormat=american`)
                .then(res => res.json())
                .then(data => {

                    const x = data.data
                    console.log(x[0]);

                const htmlBet = `<div class="container sport-box-title text-center py-5">
                <div class="row justify-content-center">
                  <div class="col-6 ">
                    <h1 class='display-2'>${titleMap[sportInd]}</h1>
                  </div>
                </div>
              </div>
                    
              <div id="betWindow" class="container  text-center py-5 px-5" >
              <div id='gameRow' class="row row-cols-1  row-cols-md-2 row-cols-lg-3"> `
                    
                betWindow.insertAdjacentHTML('beforebegin', htmlBet)
                                    
               // loop through and grab values to populate upcoming matches
                    for (const obj of x) {
                        let sport = obj.sport_nice;
                        let home = obj.home_team;
                        let away;
                        home === obj.teams[0] ? away = obj.teams[1] : away = obj.teams[0];
                        let id = obj.id

                        
                        // call Helpfer f{} to break down the odds
                        let [...arr] = obj.sites[1].odds.h2h;
                        findOddValues(arr)

                        // call Helper f{} to split up names
                        firstAndLastHome(home)
                        firstAndLastAway(away)


                        // call Hf{} for date/time
                        zuluTime(obj.commence_time)
                        
                        const html = `
                            <div class="games  text-center py-5">
                         
                            <div class="col justify-content-center">
                            <div class="row --break justify-content-center ">
                               <div class="date">
                                  <h3>${date}</h3>
                               </div>
                             </div>

                             <div class="col home">
                                <h4 class="${homeOddsChalk}">Home </h4>
                                <h4 class="${homeOddsDog}">Home </h4>
                                <h1>${homeA}<br>${homeB}</h1>
                                    <div class="odds wrapper py-4" id='dogs'>
                                      <h4 class='odds ${homeOddsChalk}'> <span class='odd-box'>${homeOdds}</span>    chalk</h4>
                                      <h4 class='odds ${homeOddsDog}'> <span class='odd-box'>${homeOdds}</span>  dogs</h4>
                                    </div>
                             </div>

                            <div class="col pt-4 " id="draw">
                                <h4 class='odds draw py-2 '>Draw:  <span id='draw'>${draw}</span></h4>
                           </div>


                           <div class="col away pt-3">
                             <h4 class="${awayOddsChalk} pt-3">Away </h4>
                             <h4 class="${awayOddsDog} pt-3">Away </h4>
                             <h1>${awayA}<br>${awayB}</h1>
                                <div class="odds wrapper py-4" id='chalk'>
                                <h4 class='odds ${awayOddsChalk}'> <span class='odd-box'>${awayOdds}</span>chalk   </h4>
                                <h4 class='odds ${awayOddsDog}'> <span class='odd-box'>${awayOdds}</span>dogs    </h4>
                             </div>
                            </div>

                    <div class="row --break justify-content-center">
                         <div class="time pt-3">
                           <h3>${time}</h3>
                         </div>
                         </div>
                         </div>
                         </div>
                       
                    `;
                        
                        gameRow.insertAdjacentHTML("beforeend", html)
                        betWindow.classList.remove('--hidden')
                        
                    }
                })
            })
        })
}


pickSport();

// ***************-----------------------------------******************
// // OLD-SKOOL: AJAX call


// https://api.the-odds-api.com/v3/odds/?apiKey=${apiKey}&sport={sport}&region={region}&mkt={mkt}

// odds/?sport=upcoming&region=uk&mkt=h2h&apiKey=YOUR_API_KEY

// const request = new XMLHttpRequest();
// let data = {};

// request.open('GET', `https://api.the-odds-api.com/v3/odds/?sport=upcoming&region=uk&mkt=h2h&apiKey=${apiKey}`);
// request.send();


// // add E.listnr for when data has been Loaded
// request.addEventListener('load', function () {
//     // console.log(this.responseText);


    // // convert data from string to [arr]
    // const { data } = JSON.parse(this.responseText)
    // //  create a set with current sports
    // const [...inputSport] = new Set(data.map(sport => sport.sport_nice));
 
    // loop through array and change html
    // for (const [i, el] of inputSport.entries()) {
     
    //     let html = `
    //            <option id="sport" value="${el}">${el}</option>`;

    //     dropDSport.insertAdjacentHTML('afterend', html)
    // }

    // // when user picks sport
    // listSport.addEventListener('change', function () {
               
    //     // set var w/ name of choosen sport
    //     let sport = listSport.value

//         // `https://api.the-odds-api.com/v3/odds/?apiKey=${apiKey}&sport={sport}&region={region}&mkt={mkt}`

//         data.forEach(function (g) {
//             if (g.sport_nice == sport) {
                

//                 console.log(`https://api.the-odds-api.com/v3/odds/?apiKey=${apiKey}&sport=${g.sport_key}&region=us`);

//             };
//         })
//     })
// })
    

    // request.open('GET', `https://api.the-odds-api.com/v3/odds/?sport=upcoming&region=uk&mkt=h2h&apiKey=${apiKey}`);
    // request.send();

    // request.addEventListener('load', function () {
    //     // console.log(this.responseText);
        
    
    //     const { data } = JSON.parse(this.responseText)

    
        // request.open('GET', `https://api.the-odds-api.com/v3/odds/?apiKey=${apiKey}&sport=${sport}&region={region}&mkt={mkt}`)
    
        // console.log(listSport.value);
        
// })
    
        // function myFunction() {
        //     console.log(listSport.value);
        // }

// class App {
    
//     constructor() {
//         this._pickSport();
//         this._pickGame();
//         // this._populateDropD();
//     }
    
//     _pickSport() {
//         // because we downloaded JQuery in our <script> ...
//         //      ... we post the URL below, pass in a parameter and we now have access to all the data in the API.

//         $.getJSON(`https://api.the-odds-api.com/v3/odds/?sport=upcoming&region=us&mkt=h2h&dateFormat=iso&apiKey=${apiKey}`, function (getData) {
        
          
            // // seperates [data] from API
            // x = getData.data
            // let sport;
            
            // //  create an [] w/o duplicate values
            // const [...inputSport] = new Set(x.map(sport => sport.sport_nice));

            // // create a list of games based off an input
            // // const inputGames = x.map(game => game)
            
            
            // // loop through array and change html
            // for (const [i, el] of inputSport.entries()) {
                
            //     let html = `
            //     <option id="sport" value="${el}">${el}</option>
            //     `;
                
            //     dropDSport.insertAdjacentHTML('afterend', html)

            //     console.log(el);
            // }
            
        // })
        
        // listSport.addEventListener('change', this._pickGame(`${listSport.value}`))
        
//     }
   
    
//     // grabs the index of 
//     _pickGame(sport) {
//         // function myFunction() {
//         //     console.log(listSport.value);
//         // }
//         console.log(sport);

//     }
// }
// const app = new App();


