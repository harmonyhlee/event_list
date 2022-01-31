const baseurl = "http://localhost:3000/events";

let eventsLists = [];

let newRowShown = false;

const getData = (() => {
    fetch("http://localhost:3000/events")
    .then((response) => response.json())
    .then((json) => {
        eventsLists = json;
        createTmp(eventsLists);
    });
})();

const createTmp = (arr) => {
    let tmp = `
    <table id="table">
            <tr class="eventContainer__header-cell">
              <th>Event name</th>
              <th>Start date</th>
              <th>End date</th>
              <th class="Actions-header-cell">Actions</th>
            </tr>`;
    arr.forEach((ele) => {
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
            <td>
            <button onclick="editBtn()">EDIT</button>
            <button>DELETE</button>
            </td>
        </tr>
        `;
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
            <td>
            <button onclick="saveBtn()">SAVE</button>
            <button onclick="cancelBtn()">CANCEL</button>
            </td>
        </tr>
        `;
    }
    tmp += `</table>`;
    document.getElementById("newtr-div").innerHTML = tmp;
}

function addNewTr() {
    newRowShown = true;
    createTmp(eventsLists);
}

function saveBtn() {
    let eventName = document.getElementById("event-name-input").value;
    let startDate = document.getElementById("start-date-input").value;
    let endDate = document.getElementById("end-date-input").value;
    fetch("http://localhost:3000/events", {
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
        .then((json) => {
            console.log(json);
            getData();
        });
}

function cancelBtn() {
    newRowShown = false;
    createTmp(eventsLists); 
}