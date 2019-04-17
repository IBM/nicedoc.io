![](/static/banner.jpg)

**nicedoc.io** is a presentation layer for beautify any doc file hosted on github.com.

## Development

### Environment Variables

#### GITHUB_TOKEN

*Required*

Since we are interacting with GitHub API, you need to setup a token for authenticating the requests.

![](https://i.imgur.com/6cmrVud.png)

See more at [Creating a personal access token for the command line](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) on GitHub Help.

#### PORT

default: `3000`</br>

The port to be used for running the HTTP server.

#### SITE_URL

default: `http://localhost:3000`</br>

It sets the base URL to be used for resolving relative URLs detected on GitHub.

### Getting Started

After `npm install`, just do a `npm run dev`.

## License

**nicedoc.io** © released under the [Apache](/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://github.com/Kikobeats) with help from [contributors](https://github.com/IBMResearch/nicedoc.io/graphs/contributors).
