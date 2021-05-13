async function getStories() {
  const response = await fetch(
    'https://hacker-news.firebaseio.com/v0/newstories.json'
  );

  const ids = await response.json();
  let count = ids.length;
  ids.map(async (story) => {
    const data = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`
    );
    const newStory = await data.json();

    const storiesContainer = document.getElementById('stories');
    const div = document.createElement('div');
    div.classList.add('stories__item');
    div.innerHTML = `${count}.<span class="upvote">▲</span> <a class="stories__itemLink" href="${
      newStory.url
    }">${newStory.title}</a>
    <p class="stories__itemText">${getPoints(newStory.score)} by ${
      newStory.by
    } ${new Date(newStory.time)} minutes ago</p>`;
    storiesContainer.prepend(div);
    count--;
  });
}
getStories();

function getPoints(num) {
  switch (num) {
    case num === 0:
      return `${num} points`;
    case num === 1:
      return `${num} point`;
    default:
      return `${num} points`;
  }
}

function timestampToDate(time) {
  const date = new Date(time * 1000);
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  const seconds = '0' + date.getSeconds();
  const formattedTime =
    hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime;
}
