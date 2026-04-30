document.addEventListener("DOMContentLoaded", () => {
  /*
  Wait until the page HTML is ready before trying to load feeds.
  This avoids querying elements before they exist.
  */

  const feeds = [
    {
      containerId: "feed-hackernews",
      rssUrl: "https://feeds.feedburner.com/TheHackersNews"
    },
    {
      containerId: "feed-bleepingcomputer",
      rssUrl: "https://www.bleepingcomputer.com/feed/"
    },
    {
      containerId: "feed-krebs",
      rssUrl: "https://krebsonsecurity.com/feed/"
    },
    {
      containerId: "feed-darkreading",
      rssUrl: "https://www.darkreading.com/rss.xml"
    }
  ];

  /*
  feeds is just a config list.
  Each object says:
  - where the articles should be rendered
  - which RSS feed to pull from
  */

  feeds.forEach((feed) => loadFeed(feed.containerId, feed.rssUrl));

  /*
  Loop through every feed config and call loadFeed() for each one.

  Example:
  loadFeed("feed-hackernews", "https://feeds.feedburner.com/TheHackersNews")
  */
});

async function loadFeed(containerId, rssUrl) {
  /*
  loadFeed() handles one source at a time.

  containerId = the section on the page to fill
  rssUrl      = the RSS source for that section
  */

  const container = document.querySelector(`#${containerId} .news-feed-list`);

  /*
  This looks for a .news-feed-list inside a specific feed block.

  Example:
  if containerId is "feed-hackernews", this becomes: feed-hackernews .news-feed-list
  */

  if (!container) return;

  /*
  Safety check:
  if that feed section does not exist on the page, stop here.
  Prevents JS errors on pages that do not include the news layout.
  */

  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  /*
  Browsers do not reliably read raw RSS directly with fetch the way you want here,
  so this converts the RSS feed into JSON through rss2json.

  encodeURIComponent() makes the RSS URL safe to place inside the API request.
  */

  try {
    /*
    Try to fetch and render the feed.
    If anything fails, control jumps to catch.
    */

    const response = await fetch(apiUrl);
    const data = await response.json();

    /*
    await fetch(apiUrl)
    -> sends the network request

    await response.json()
    -> converts returned JSON text into a real JS object
    */

    if (!data.items || !data.items.length) {
      container.innerHTML = "<li>No articles available right now.</li>";
      return;
    }

    /*
    If the API returns no articles, show a fallback message
    instead of leaving the list empty.
    */

    const articles = data.items.slice(0, 5);

    /*
    Only keep the first 5 articles.
    Good for keeping the page clean and not too long.
    */

    container.innerHTML = articles
      .map(
        (article) => `
          <li>
            <a href="${article.link}" target="_blank" rel="noopener noreferrer">
              ${article.title}
            </a>
          </li>
        `
      )
      .join("");

    /*
    .map(...) turns each article object into an HTML string

    Example output:
    <li>
      <a href="...">Article Title</a>
    </li>

    .join("")
    combines all those strings into one block of HTML
    and inserts it into the list.
    */

  } catch (error) {
    container.innerHTML = "<li>Feed unavailable right now.</li>";
    console.error(`Error loading feed for ${containerId}:`, error);

    /*
    If fetch fails, JSON parsing fails, or the API is down:
    - user sees a simple fallback message
    - developer gets the real error in console
    */
  }
}
