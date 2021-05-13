async function getStories() {
  const response = await fetch(
    'https://hacker-news.firebaseio.com/v0/newstories.json'
  );

  const ids = await response.json();

  ids.map(async (story) => {
    const data = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`
    );
    const newStory = await data.json();
    console.log('newStory ', newStory);
    const storiesContainer = document.getElementById('stories');
    const div = document.createElement('div');
    div.classList.add('stories__item');
    div.innerHTML = `<p>${newStory.title}</p>
    <p>${getPoints(newStory.score)} by ${newStory.by} ${
      newStory.time
    } minutes ago</p>`;
    storiesContainer.appendChild(div);
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
