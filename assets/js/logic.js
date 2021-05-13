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
    const storiesContainer = document.getElementById('stories');
    const div = document.createElement('div');
    div.innerHTML = `<p>${newStory.by}</p>`;
    storiesContainer.appendChild(div);
  });
}
getStories();
