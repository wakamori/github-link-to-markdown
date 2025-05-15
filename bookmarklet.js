javascript: (() => {
  /**
   * Convers a GitHub pull request or issue URL and title to a Markdown link format.
   * @param {string} url - The URL of the GitHub pull request or issue.
   * @param {string} title - The title of the GitHub pull request or issue.
   * @returns {string} - A markdown link formatted string.
   */
  const convertToMarkdownLink = (url, title) => {
    const pullRequestMatch = url.match(/\/pull\/(\d+)/);
    const issueMatch = url.match(/\/issues\/(\d+)/);

    if (pullRequestMatch) {
      const prNumber = pullRequestMatch[1];
      const titlePart = title.split(" · ")[0].replace(/ by .*$/, "");
      return `[PR #${prNumber} (${titlePart})](${url})`;
    } else if (issueMatch) {
      const issueNumber = issueMatch[1];
      const titlePart = title.split(" · ")[0];
      return `[issue #${issueNumber} (${titlePart})](${url})`;
    } else {
      return "";
    }
  };

  /**
   * Get the current page's URL and title, convert it to a Markdown link, and
   * copy it to the clipboard.
   * If the page is not a recognized pull request or issue, it displays an alert.
   */
  const main = () => {
    const currentURL = location.href;
    const currentTitle = document.title;

    const markdownLink = convertToMarkdownLink(currentURL, currentTitle);
    if (markdownLink) {
      navigator.clipboard
        .writeText(markdownLink)
        .then(() => {
          alert("Markdown link copied to clipboard:\n\n" + markdownLink);
        })
        .catch((err) => {
          alert("Failed to copy text: " + err);
        });
    } else {
      alert("This page is neither a pull request nor an issue.");
    }
  };

  main();
})();
