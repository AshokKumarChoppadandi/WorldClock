const wrapper = document.querySelector(".wrapper");
sideMenu = wrapper.querySelector(".sidemenu");
selectButton = wrapper.querySelector(".select-button");

let timezonesList = Intl.supportedValuesOf('timeZone');

selectButton.addEventListener("click", () => {
    sideMenu.classList.toggle("active");
});

options = wrapper.querySelector(".options");

function addTimezone(selectedTimezone) {
    options.innerHTML = "";
    timezonesList.forEach(timezone => {
        let isSelected = timezone == selectedTimezone ? "selected" : "";
        let li = `<li onclick="updateTimezone(this)" class="${isSelected}">${timezone}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}

addTimezone();

function updateTimezone(selectedTimezone) {
    searchInput.value = "";
    addTimezone(selectedTimezone.innerText);
    sideMenu.classList.remove("active");
    selectButton.firstElementChild.innerText = selectedTimezone.innerText;
}

searchInput = wrapper.querySelector("input");

searchInput.addEventListener("keyup", () => {
    let filterTimezones = [];
    let searchedTimezone = searchInput.value;
    filteredTimezones = timezonesList.filter(timezone => {
        return timezone.toLowerCase().includes(searchedTimezone);
    }).map(data => `<li onclick="updateTimezone(this)">${data}</li>`).join("");
    options.innerHTML = filteredTimezones ? filteredTimezones : `<p>Oops! Timezone not found</p>`;
});

document.getElementById("timezonesList").addEventListener('click', function(event) {
    event.stopPropagation();
});

window.onclick = function(event) {
    const dropDowns = document.getElementsByClassName("select-button");
    for(let item of dropDowns) {
        console.log("Items :: " + item.classList.toString);
        if(item.classList.contains("active")) {
            item.classList.remove("active");
        }
    }
}
