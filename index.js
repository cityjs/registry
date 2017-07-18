const rootEl = document.querySelector('#list');
const inputEl = document.querySelector('#input');

function insertOnPage(elem, list) {
  elem.innerHTML = list.map(community => `
    <li id="${community.name.replace(/[\W]/g, '-').toLowerCase()}">
      <div class="logo">
        <img src="${community.logo}"/>
      </div>
      <div class="about">
        <h2>${community.name}</h2>
        <address>${community.location}</address>
        <ul>
          ${Object.keys(community.social).map(name => `
            <li><a href="${community.social[name]}">${name}</a></li>
          `).join('')}
        </ul>
      </div>
    </li>
  `).join('');
}

function filterer(list, input) {
  const communities = Array.from(list.children);
  return e => {
    communities.forEach(community => {
      if (community.id.includes(input.value.toLowerCase())) {
        community.style.display = '';
      } else {
        community.style.display = 'none';
      }
    });
  };
}

fetch('/registry.json')
  .then(res => res.json())
  .then(json => insertOnPage(rootEl, json))
  .then(() => {
    inputEl.onkeyup = filterer(rootEl, inputEl);
  })