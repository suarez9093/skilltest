// we will add this content, replace for anything you want to add
let wrapper = document.getElementById('wrapper');
let content = document.getElementById('content');
let test = document.getElementById('test');
let stories = [];

var more = '<div style="height:1000px; background:#EEE;"></div>';
console.dir(wrapper);
// this is the scroll event handler
function scroller() {
  // print relevant scroll info
  test.innerHTML =
    wrapper.scrollTop +
    ' + ' +
    wrapper.offsetHeight +
    ' + 100 > ' +
    content.offsetHeight;

  // add more contents if user scrolled down enough
  if (wrapper.scrollTop + wrapper.offsetHeight + 100 > content.offsetHeight) {
    content.innerHTML += more; // NK: Here you can make an Ajax call and fetch content to append to content.innerHTML
  }
}

content.innerHTML = more;

// hook the scroll handler to scroll event
if (wrapper.addEventListener)
  // NK: Works on all new browsers
  wrapper.addEventListener('scroll', scroller, false);
else if (wrapper.attachEvent)
  // NK: Works on old IE
  wrapper.attachEvent('onscroll', scroller);

async function getStories() {
  let loading = false;
  const response = await fetch(
    'https://hacker-news.firebaseio.com/v0/newstories.json'
  );

  const ids = await response.json();
  ids.map(async (story) => {
    const data = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`
    );
    let newStory = await data.json();
    stories.push(newStory);

    // const storiesContainer = document.getElementById('stories');
    // const div = document.createElement('div');
    // div.classList.add('stories__item');
    // div.innerHTML = `${count}.<span class="upvote">▲</span> <a class="stories__itemLink" href="${
    //   newStory.url
    // }">${newStory.title}</a>
    // <p class="stories__itemText">${getPoints(newStory.score)} by ${
    //   newStory.by
    // } ${new Date(newStory.time)} minutes ago</p>`;
    // storiesContainer.prepend(div);
    // count--;
  });
}
getStories();
