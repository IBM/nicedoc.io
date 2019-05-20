# nicedoc.io

> Recover any GitHub README.md and well printed it to had a beautiful documentation site.

## Why

![](https://i.imgur.com/bFS0qpM.png)

Software documentation is a lie: nobody wants to do it but everyone wants to have it.

We can't write your project documentation, but we can help creating a bridge to reduce the quantity of time you need to setup a beautiful documentation portal.

Nowadays is very common use git to control version over text. For example, take a look at [RFC spec for the next web API](https://github.com/drufball/layered-apis), or any of the [TC39 Proposals](https://prop-tc39.now.sh/).

That's a great thing, but you are limited to see the documentation based on how GitHub decides to render the markdown frontend layer.

In addition, you need to browse GitHub each time, adding a lot of noise that is not related with what you want to do: read the spec.

Normally, when a project tends to growth, they decide to create their own documentation portal using tools like [Docsify](https://docsify.js.org/#/) or [Docusaurus](https://docusaurus.io/).

The problem with these tools is that they are in the other point of friction: They add an extra layer of maintenance that could be unaffordable for many projects. 

You just want to read docs, and you want people to spend more time writing than by keeping the documentation portal.

## How

We want to create a **zero configuration** documentation portal for any project. This means there's no friction on publishing your own documentation online. 

For doing that, we are going to use **GitHub as backend**.

That's a limitation, but also an advantage: If your documentation file is on GitHub, we can recover it.

After that, we want to render the markdown file alone in a portal. Just documentation, no more.

The zero configuration means you need to do nothing additional: The site portal will be minimal with good defaults to render any document. That means a lot related to visual text rhythm, space between lines, typographies, etc.

If you wish you can modify the defaults visual settings to adapt your documentation and feeling it a bit different from the rest.

## Roadmap

> Some emoji legends:
>
>- 🚧 WIP  
>- ✅ Done 
>- ⛔️ Blocked
>- ▶️ On Road

### ▶️ Iteration 1

The goal of the first iteration is to set up a public website for reading any documentation file hosted on GitHub.

#### ✅ Get a Branding

> 📖 [Naming Things](https://kikobeats.com/naming-things)

"Readme Project" is a codename. We need to determinate what is the public name of the project and associate an 

Some ideas are:

- read.me
- readme.md
- lee.me
- lea.me
- *help me please*
- re.read

The problem with this kind of name is they are already taken, so need to determinate one enough good that transmit the project message but didn't take yet.

That includes:

- [x] Choose a Name – Should be easy to pronounce in English.
- [x] Choose a Logo – Should be readable as favicon, Name + Logo and Name + Logo + Claim.
- [x] Choose a Claim – Should something minimal that resume the project (eg: Pretty README as service). 
- [x] Choose a typography.

#### 🚧 Recover Any GitHub File

> Main inspiration: [DocumentUp](https://documentup.com/jeromegn/documentup).

We are going to use GitHub as backend for recovering the target `README.md`.

For do that, we are going to determinate the file that we are interested in recover based in the URL route.

For example, if our site is called `read.me`, then the file to recover match with GitHub url using `org/repo` schema.

If we want to see 

`github.com/drufball/layered-apis` 

it matches with 

`read.me/drufball/layered-apis`

For do that, our folks from Algolia have a [public index with all GitHub documentation repositories normalized](https://github.com/Kikobeats/changes.now.sh/search?q=algolia&unscoped_q=algolia).

It's the same index that they use at [yarn website](https://yarnpkg.com/es-ES/package/react) to recover the README.

##### Resources

- [Algolia Public Index](https://github.com/Kikobeats/changes.now.sh/search?q=algolia&unscoped_q=algolia).
- [TextMe](https://github.com/susam/texme) – lightweight JavaScript utility to create self-rendering Markdown + LaTeX documents.
- [micro-react](https://github.com/jxnblk/micro-react) – Create microservice apps with React components.
- [md-page](https://github.com/oscarmorrison/md-page) – create a webpage with just markdown.
- [Marked](https://marked.now.sh/) – Micro service for markdown rendering.

#### 🚧 Sensible Good Defaults

> Main inspiration: [Medium](https://medium.com).

That's one of the most critical goals of the project.

The visual look and feel of the site need to be enough good to read any document with good quality.

Take for example [any Medium post](https://medium.com/storybookjs/migrating-to-storybook-4-c65b19a03d2c) as example. 

Why is it so popular even exists other blogging platform more powerful? Sensible good defaults: Any thing that you write on Medium, looks pretty.

That's include:

- [x] Choice a white color palette as base.
	- [Open Colors Scheme](https://yeun.github.io/open-color/gray-color.html).
	- [Dark Palette](https://command.now.sh/).
	- [Carbon Design System](https://www.carbondesignsystem.com/) (click dark mode on bottom).
- [x]  Choice a paired font to use.
	- [fontpair](https://fontpair.co)
- [x] Ability to switch to Dark mode & remember preferences ([#2](https://github.com/Kikobeats/nicedoc.io/issues/2)).
	- [Building the N26 Dark Mode](https://medium.com/insiden26/building-the-n26-dark-mode-2fc18c2ccdd5)
	- [Redesigning your product and website for dark mode](https://stuffandnonsense.co.uk/blog/redesigning-your-product-and-website-for-dark-mode)
	- [How to detect if OS X is in dark mode in browsers?](https://stackoverflow.com/questions/50840168/how-to-detect-if-os-x-is-in-dark-mode-in-browsers/52986538#52986538)
	- [Using dark mode in CSS with MacOS Mojave](https://paulmillr.com/posts/using-dark-mode-in-css/).
- [x] Copy Clipboard button for any code block ([#2](https://github.com/Kikobeats/nicedoc.io/issues/8)).
	- [codecopy](https://github.com/Kikobeats/react-codecopy) – "Copy to clipboard" button for your code snippets.
- [ ] Show on GitHub button in the corner.
        – [GiHub Corner](https://github.com/skratchdot/react-github-corner) – Add a Github banner to your project page.

### ⛔️ Iteration 2

#### 🚧 Load Specific Settings

In the same README location, make possible load custom settings if `readme.json` is detected.

These settings could be also encoded at [query-state](https://nmotw.in/query-state/)

- [ ] Setup theme color

#### 🚧 Link Preview

> Main Inspiration: [Microlink SDK](https://github.com/microlinkhq/sdk/issues/53)

![](https://user-images.githubusercontent.com/2096101/36397262-46e2c95a-15c2-11e8-8ba5-8c7f384383cc.png)

Add the ability to see a link preview on hover.

#### 🚧 Star Button

> Main Inspiration: [Clap Button](https://github.com/Kikobeats/react-clap-button)

![](https://github.com/Kikobeats/react-clap-button/raw/master/demo.gif)

Now we have a functional site, it's time to start bringing up some sugar things in order to improve the user experience.

We can translate the `Clap` button by Medium, but using the GitHub way, this means, the button reflects the ⭐️'s.

Another things we can add after the star button could be 

- Visit GitHub repository
- Watch/Unwatch
- Share

#### 🚧 Comments Threads

> Main Inspiration: [Twitter Threads](https://business.twitter.com/en/blog/How-Tweet-threads.html)

![](https://i.imgur.com/mhcZDJ8.png)

Add the ability to add comments. The comments works similar to Twitter Threads, where the started point is a previous sentence writtent in the documentation.

The comment can be created using your GitHub credentials.

Inspiration:

- https://github.com/aroc/side-comments
- https://github.com/jimpick/lambda-comments
- https://github.com/skx/e-comments/
- https://github.com/kevinweber/inline-comments
- https://github.com/flpvsk/react-commenter/
- https://www.producthunt.com/posts/ouija
- https://github.com/netlify/gotell
- https://github.com/netlify/netlify-comments-starter

### ⛔️ Iteration 3

#### 🚧 Add Analytics

![](https://i.imgur.com/UnCrWyM.png)

> Main inspiration: [usefathom.com](https://stats.usefathom.com/#!last-7-days).

Now we have a public portal site for reading any documentation, we can provide public insights for know more about web traffic.

The analytics insights are provided by GitHub as well but it's only available for maintainers and it's very limited.

The idea is make this information public by default: Just add `+` in your URL for see stats. 

For example: `read.me/drufball/layered-apis+`

- https://demos.algorithmia.com/github-readme-analyzer/
- Show the number of concurrent readers. [[1]]( https://github.com/rauchg/blog-views) [[2]](https://github.com/rauchg/blog/blob/master/lib/with-views.js).


### 🚧 Self Hosted

Allow to hosted your own microservice for connecting it with your GitHub Enterprise.
