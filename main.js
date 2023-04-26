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
    let searchedTimezone = searchInput.value;
    filteredTimezones = timezonesList.filter(timezone => {
        return timezone.toLowerCase().includes(searchedTimezone);
    }).map(data => `<li onclick="updateTimezone(this)">${data}</li>`).join("");
    options.innerHTML = filteredTimezones ? filteredTimezones : `<p>Oops! Timezone not found</p>`;
});

window.onload = function(e) {
    const arr = ["span", "uil uil-angle-down", "uil uil-search", "input", "select-button"];
    document.onclick = function(event) {
        const targetValue = event.target.classList.value;
        if(!arr.includes(targetValue))
            sideMenu.classList.remove("active");
    }
}