const storiesContainer = document.getElementById('stories');
const loading = document.querySelector('.loading');
let stories = [];

function showLoading() {
  loading.classList.add('show');
  setTimeout(getStory, 1000, stories[0]);
}

async function getIds() {
  const response = await fetch(
    'https://hacker-news.firebaseio.com/v0/newstories.json'
  );
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    stories.push(data[i]);
  }

  for (let i = 0; i < 30; i++) {
    getStory(stories[0]);
    stories.splice(0, 1);
  }
}

async function getStory(id) {
  let response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  );
  let data = await response.json();
  stories.splice(0, 1);

  addDataToDOM(data);
}

function addDataToDOM(data) {
  const postElement = document.createElement('div');
  postElement.classList.add('stories__item');
  postElement.innerHTML = `
  <span class="upvote">▲</span>
  <a class="stories__itemLink" href="${data.url}">${data.title}</a>
  <p class="stories__itemText">${getPoints(data.score)} by ${
    data.by
  } on ${new Date(data.time)}</p>`;
  storiesContainer.appendChild(postElement);
  loading.classList.remove('show');
}

function getPoints(num) {
  switch (num) {
    case 0:
      return `${num} points`;
    case 1:
      return `${num} point`;
    default:
      return `${num} points`;
  }
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 5) {
    showLoading();
  }
});

getIds();
