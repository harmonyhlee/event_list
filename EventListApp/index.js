const baseurl = "http://localhost:3000/events";

let eventsLists = [];
let newRowShown = false;

const getData = (url => {
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
        eventsLists = json;
        eventsLists.forEach(x => {
            x.editable = false;
        });
        // console.log(eventsLists);
        createTmp(eventsLists);
    });
})(baseurl);

const createTmp = (arr) => {
    let tmp = "";

    arr.forEach((ele, idx) => {
        if (ele.editable) {
            tmp += `
            <tr>
                <td>
                    <input id="event-name-input-${idx}" value="${ele.eventName}"/>
                </td>
                <td>
                    <input id="start-date-input-${idx}" type="date" value="${ele.startDate}"/>
                </td>
                <td>
                    <input id="end-date-input-${idx}" type="date" value="${ele.endDate}" />
                </td>
                <td class="lastTD">
                    <button onclick="saveEdit(${idx})">SAVE</button>
                    <button onclick="cancelEditBtn(${idx})">CANCEL</button>
                </td>
            </tr>
            `;  
        } else {
            tmp += `
            <tr>
                <td>
                    <input disabled value="${ele.eventName}" />
                </td>
                <td>
                    <input disabled type="date" value="${ele.startDate}" />
                </td>
                <td>
                    <input disabled type="date" value="${ele.endDate}" />
                </td>
                <td class="lastTD">
                    <button onclick="editBtn(${idx})">EDIT</button>
                    <button onclick="deleteBtn(${ele.id})">DELETE</button>
                </td>
            </tr>
            `;
        }
    });

    if (newRowShown) {
        tmp += `
        <tr>
            <td>
                <input id="event-name-input"/>
            </td>
            <td>
                <input id="start-date-input" type="date"/>
            </td>
            <td>
                <input id="end-date-input" type="date"/>
            </td>
            <td class="lastTD">
                <button onclick="saveBtn()">SAVE</button>
                <button onclick="cancelBtn()">CANCEL</button>
            </td>
        </tr>
        `;
    }



    document.getElementById("eventlists-container").innerHTML = tmp;
}


function addNewTr() {
    newRowShown = true;
    createTmp(eventsLists);
}

function saveBtn() {
    let eventName = document.getElementById("event-name-input").value;
    let startDate = document.getElementById("start-date-input").value;
    let endDate = document.getElementById("end-date-input").value;
    fetch(baseurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          eventName: eventName,
          startDate: startDate,
          endDate: endDate,
        }),
      })
        .then((response) => response.json())
        .then(json => {
            // console.log(json);
            getData();
        });
}

function cancelBtn() {
    newRowShown = false;
    createTmp(eventsLists); 
}

function cancelEditBtn(idx) {
    eventsLists[idx].editable = false;
    createTmp(eventsLists); 
}

function deleteBtn(id) {
    fetch(baseurl + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
            getData();
        });
}

function editBtn(idx) {
    eventsLists[idx].editable = true;
    createTmp(eventsLists);
}

function saveEdit(idx) {
    let eventName = document.getElementById("event-name-input-"+idx).value;
    let startDate = document.getElementById("start-date-input-"+idx).value;
    let endDate = document.getElementById("end-date-input-"+idx).value;

    fetch(baseurl + "/" + eventsLists[idx].id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          eventName: eventName,
          startDate: startDate,
          endDate: endDate,
        }),
      })
        .then((response) => response.json())
        // .then((json) => console.log(json));
}

// function toPrevious() {
//     window.location.href = "www.google.com"
//     console.log("previous")
// }


// function toNext() {
//     window.location.href = "www.google.com"
//     console.log("Next")
// }
