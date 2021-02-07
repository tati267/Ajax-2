const apiURL = "https://jsonplaceholder.typicode.com";
    // DOM Elements
    const usersListEl = document.querySelector(".users-list");
    const userInfoEl = document.querySelector(".user-info");

    // Events
    usersListEl.addEventListener("click", onUserClickHandler);

    // Event handlers
    function onUserClickHandler(e) {
      e.preventDefault();

      if (e.target.dataset.userId) {
        getUserHTTP(e.target.dataset.userId, onGetUserInfoCallback);
      }
    }

    // HTTP Functions
    function getUsersHTTP(cb) {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", `${apiURL}/users`);

      xhr.addEventListener("load", () => {
        console.log(xhr);
        if (xhr.status !== 200) {
          console.log("Error", xhr.status);
          return;
        }

        const res = JSON.parse(xhr.responseText);
        cb(res);
      });

      xhr.send();
    }

    function onGetUsersCallback(users) {
      if (!users.length) {
        return;
      }

      renderUsersList(users);
      console.log(users);
    }

    function getUserHTTP(id, cb) {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", `${apiURL}/users/${id}`);

      xhr.addEventListener("load", () => {
        console.log(xhr);
        if (xhr.status !== 200) {
          console.log("Error", xhr.status);
          return;
        }

        const res = JSON.parse(xhr.responseText);
        cb(res);
      });

      xhr.send();
    }

    function onGetUserInfoCallback(user) {
      if (!user.id) {
        console.log("User not found");
        return;
      }

      renderUserInfo(user);
    }

    // Render functions
    function renderUsersList(users) {
      let fragment = users.reduce((acc, user) => {
        return acc + userListItemTemplate(user);
      }, "");

      usersListEl.insertAdjacentHTML("afterbegin", fragment);
    }

    function renderUserInfo(user) {
      userInfoEl.innerHTML = "";

      const template = userDetailedInfoTemplate(user);

      userInfoEl.insertAdjacentHTML("afterbegin", template);
    }

    // Template functions
    function userListItemTemplate(user) {
      // На каждый элемент списка мы устанавливаем атрибут data-user-id что бы потом по нему получить информацию о пользователе
      return `
      <button type="button" class="list-group-item list-group-item-action" data-user-id="${user.id}">
        ${user.name}
      </button>
      `;
    }

    function userDetailedInfoTemplate(user) {
      return `
      <div class="card border-dark mb-3">
        <div class="card-header">${user.name}</div>
        <div class="card-body text-dark">
          <h5 class="card-title">${user.email}</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Nickname:</b> ${user.username}</li>
            <li class="list-group-item"><b>Website:</b> ${user.website}</li>
            <li class="list-group-item"><b>Company:</b> ${user.company.name}</li>
            <li class="list-group-item"><b>City:</b> ${user.address.city}</li>
          </ul>
        </div>
        <div class="card-footer bg-transparent border-dark">Phone: ${user.phone}</div>
      </div>
      `;
    }

    // Init App
    getUsersHTTP(onGetUsersCallback);