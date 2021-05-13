const container = document.getElementById('container');
const loading = document.querySelector('.loading');
let stories = [];

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  console.log({ scrollTop, scrollHeight, clientHeight });

  if (clientHeight + scrollTop >= scrollHeight - 5) {
    // show the loading animation
    showLoading();
  }
});

function showLoading() {
  loading.classList.add('show');

  // load more data
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
  getStory(stories[0]);
  stories.splice(0, 1);

  getStory(stories[0]);
  stories.splice(0, 1);

  getStory(stories[0]);
  stories.splice(0, 1);

  getStory(stories[0]);
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
  postElement.classList.add('blog-post');
  postElement.innerHTML = `
  		<h2 class="title">${data.title}</h2>
  		<p class="text">${data.url}</p>
  		<div class="user-info">
  			<span>${data.by}</span>
  		</div>
  	`;
  container.appendChild(postElement);

  loading.classList.remove('show');
}

getIds();
