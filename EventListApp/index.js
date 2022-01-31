const baseurl = "http://localhost:3000/events";

let eventsLists = [];

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
    tmp += `</table>`;
    document.getElementById("newtr-div").innerHTML = tmp;
}
