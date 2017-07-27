# html-boilerplate
Our html boilerplate based on HTMLBoilerplate, Webpack and React Storybook

**What is it good for?**
<br>This boilerplate will not magically build your websites on its own. But it comes with some pre configurations for webpack and gives you an easy life when you want to view your code and snippets whily coding them.

<img align="center" alt="" src="https://media.giphy.com/media/hY3a4jYfZBQVq/giphy.gif" />
<p style="" >source: <a href="https://media.giphy.com/media/hY3a4jYfZBQVq/giphy.gif">giphy</a></p>

# Dependencies
Make sure you have node installed otherwise it won't work ;-). As a packagemanager we use yarn. To add a new package use yarn add < packagename >.For more information see <a href="https://yarnpkg.com/lang/en/">yarn.com</a>.
<br><br> **OS-limitation:** This Boilerplate only works for unix-based systems. That means only Mac OS, Linux Systems, etc. can use it. This is related to Microsoft and its usage of the backslash in their filesystem. Maybe there will be a future update to solve this issue.

# How To Start?
You can simply start, by cloning this repository and rename the folder to your projectname. 

## Important npm scripts
This are the most important npm script to start the dev environments, storybook, automate boring tasks and build the project:
* `gulp-styles`: Inject all scss files which are within a `styles` folder automatically in `src/assets/scss/main.scss`
* `gulp-stories`: Automatically create story files for all html files (components)
* `dev`: Starts the webpack dev server to test all pages configured in `webpack.config.pages.js`
* `build`: Build the project code based on the `webpack.config.renderer.prod.js`
* `storybook`: Run storybook to view the html components which have stories in the browser.


## Atomic Design principle
All the html components are build with the [atomic design](http://bradfrost.com/blog/post/atomic-web-design/) principle in mind. Which basically means, we start to build the smallest pieces first and style them in isolation and build later the greater parts by copy and pasting small pieces together and form bigger parts.

#### Naming convention for atomic components
For this, we use a naming convention for our components: They always start with a letter which points to their `atomic category`:
A - Atoms
M - Molecules
O - Organism
(T - Templates)
(P - Pages)

First: It is just a principle and it hasn't been seen to strictly – it should help, not hinder. It should help to think in components, build them and later refactor them.

#### Building atomic components in isolation
As html isn't like react where we can import components in other components we mainly build the most common components (atoms, molecules and organisms) of a view in their isolated html file and later simply copy and past the code to the bigger components.

#### Why not using a templating language when building the components of a website?
There would be solutions to use a templating language like `Handlebars` instead of copy and pasting and we even use it for the bigger `atomic components` like `pages` and `templates`. But with some experience we saw for building websites it do not make sense for the smaller components like `atoms`, `molecules` and `organism`, as you otherwise often has to parameterize all the components, and, especially on websites, it just takes a lot of time without much advantages. For web applications, where you work with templating languages directly, it is a total different case. ;) 



### Atomic categories
* `Atoms` are the smallest pieces like buttons, text formats, link styles, list items, ...
* `Molecules` mainly are systems which could contain `atoms` or other `molecules?, like a whole list or an avatar with a name and badge.
* `Organisms` are build upon `molecules` and `atoms` and often are whole pieces of a page, like a sidebar or a view of a blogpost, etc.
* `Templates` are meant to be a whole page with build out of all the smaller `atomic components`, but without data, just placeholder, but we do not use it this way, as it wasn't practical for us without a templating language.
* `Pages` are meant to the whole page, filled with all the needed data and build with a lot of smaller `atomic components`.

#### How strict we apply the atomic principle?
We try to make a `atomic component` out of a piece of code or a ui element, when it seems applicable, that it is used in different contexts. But it is also valid to have a special ui element within a component which could be a `atomic component` on its own, but it may be used only in this specific context and so it may make sense to style it directly within its context. It depends, but normally you get more clear code when you isolate it. Sometimes it gets just more complicated, for example if you start to isolate each text style and each tiny peace ... this seldom makes a lot of sense practically.



## SCSS for components
We give each component its own `scss file` and `unique class name`. *We (almost) never style html tags like (div, p, h1, input, ...) directly. We always use a unique class to apply styles to components and their elements.*

Our naming convention for class names borrows from the [BEM](http://getbem.com/naming/) methology which should prevent naming conflicts and deep nesting of css classes.

#### Naming convention for css classes
A typical component class name looks like this:
`a-category-name`
* The first part (a-…) is the atomic category, is it an `atom`, a `molecule`, or an `organism`? This is just to get a better picture if the element is more a small peace or a whole structure of elements.
* The second part (…-category-…) is the type the element is of, for example: button, overlay, link, speechbubble, ...
* The third part (…-name) is a individual name of the component within its category. For example `menu` for `a-button-menu`.

#### Naming scss files
We name our `scss files` like the name of the component. For example for `a-button-menu` we create a single scss file named `a-button-menu.scss` which holds all styles for this component. This way you always know where you find your css when you inspect your source code of a page or refactor the css. As css uses dashes between words as their standard, we use dashes to separate sections in our scss file names too. 

#### The parent always positions its children
*We (almost) never give a component class positioning values like margin, top, left, right, bottom, float, etc. directly.* Which means, if I have a `menu` with some `menu-links`, where the `menu-links` have a margin of 20px to the next `menu-link` and `50px` to the left side, we would apply the positioning of the `menu-links` through their parent `menu` and not through `menu-link` directly, because *the parent always positions its children, not the other way around.*

#### Category classes
As each component gets its unique class name it is sometimes hard to position children of a similar type like `buttons` when a wrapper holds different kind of buttons as children. For example:
The wrapper `m-tooblar-buttons` could wrap `a-button-main`, `a-button-highlight`, and `a-button-negative`.

When I want to position the buttons through its parent `m-toolbar-buttons`, I would have to mention each button class in my css like so:
```css
.m-toolbar-buttons {
	.a-button-main,
	.a-button-highlight,
	.a-button-negative {
		margin-top: 10px;
	}
}
```
This is a mess. That is the reason why we gave to our `components` a `category-class` along with their `component class`:
```html
<!-- AButtonMain -->
<button class="a-button a-button-main">AButtonMain</button>

<!-- AButtonHighlight -->
<button class="a-button a-button-highlight">AButtonHighlight</button>

<!-- AButtonNegative -->
<button class="a-button a-button-negative">AButtonNegative</button>
```
So you see, each of the components of the category `button` has a `category class` of type `a-button` and a `component class` like `a-button-main` or `a-button-highlight`, ...;

This way we can position all buttons within their parents with their `category class`. In our example it would be `a-button`:
```css
.m-toolbar-buttons {
	.a-button {
		margin-top: 10px;
	}
}
```
Now it is much easier ...

But don't be deceived: *We never apply styles to `category-classes`* We only apply styles to the `component classs`. It first seems eligible that each button should have the rule color green and you apply it to the `category class` instead of the `component class`. But it leads to bad dependencies between classes and you always have to find the category class to know more about how the styling works ... we don't do it. It would be more DRY technically, but you lose the simple connection between one class for one component:
```css
.a-button { color: green! } // BAD!!

// better
.a-button-main { color: green! } // GOOD
.a-button-highlight { color: green! } // GOOD
.a-button-negative { color: red! } // GOOD
```
So, it is pretty simple: Apply styles only to its  `component classes`.

#### Sub classing
We apply the `category class` and `component class` always to the most hight `html tag` of the component. When the component is more complex it may consist of some child elements which aren't other `atomic components` but context specific html. To decide, when it is useful to extract a peace of code into a own `atomic components` is decided based on if the element will be used by more than one component. 
If the child elements are specific to the component, we just use `sub-classes` by using the `component class` and subclass it by adding a name at the end with two underscores separated:
```css
.a-button-cta__icon {}

// could also be with longer names like:
.a-button-cta__icon-right {}
```

In this example, we use `sub classes` for the sag icon and a label:
```html
<button
    class='a-button a-button-cta'
>
    <svg class="a-button-cta__icon" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4c-..."/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
    <span class="a-button-cta__label">
        Jetzt chatten
    </span>
</button>
```
```scss
@import '../scss/vars';

.a-button-cta {
    height: 38px;
    border-radius: 38px;
    // ...

    // some state rules
    &:hover {
        background-color: color-to-hover-state($c-active);
        box-shadow: none;
    }
		// ...
    &:disabled, &.disabled {
        color: #bababa;
				
				 // reset default icon color …
        .a-button-cta__icon {
            color: #bababa;
        }
    }
}

// sub-classes – this icon could be a atom too,
// but it do not make sense, as we need the
// icon only for this component, so we use a
// sub-class here
.a-button-cta__icon {
    fill: #fff;
    width: 20px;
    height: 20px;
    line-height: 1;
    vertical-align: -5px;
}

// sub-classes – this label could be a atom too,
// as a isolated component, but it would be to 
// fragmented, so we use a sub-class
.a-button-cta__label {
    padding-left: 8px;
}

```

With `sub classes` we prevent style nesting as style nesting would otherwise makes it complicated to overwrite rules:
```scss
// BAD!!
.a-button-cta {
    height: 38px;
    border-radius: 38px;
    // ...
	
		// !! BAD !!
		// it has unneccessary style nesting!
    .a-button-cta__icon {
		    fill: #fff;
			  // ...
		}
}

```
```scss
// GOOD!!
.a-button-cta {
    height: 38px;
    border-radius: 38px;
    // ...
}

.a-button-cta__icon {
    fill: #fff;
	  // ...
}
```





## HTML Components
Our `components` are just peaces of html we build in isolation. We use [react-storybook](https://storybook.js.org/) build and list them within a convenient ui.

Storybook is made for react and based on webpack. So we could use Reacts `dangerouslySetInnerHTML` to render html files within storybook. Just look at `.storybook/HtmlToStory.js`. It is basically a react wrapper component we use in our stories to import the html files and view them in storybook.

So a basic `component` has three elements:
1. The `html component` in an `**.html` file
2. Its styles in its own `styles/**.scss` file
3. And maybe a story to view the html in storybook in a story `stories/**.js` file.

```
// html in AButtonCTA.html
<button
    class='a-button a-button-cta'
>
    Jetzt chatten
</button>

// css in styles/a-button-cta.scss
@import '../scss/vars';

.a-button-close {
    width: 24px;
    height: 24px;
    border-radius: 0;
    border: 0;
    …
}


// story in stories/AButtonCTA.js
// [...]
storiesOf(/* inject:filename */'AButtonCTA'/* endinject */, module)
    .add('default', () => (
        <HtmlToStory
            htmlTemplate={htmlTemplate}
        />
    ));
```

#### main.scss brings all scss together
All the scss styles of the components get together in a single global scss file which you find in: `assets/scss/main.scss`.

#### inject all scss from styles folders in main.scss with gulp
We build a simple gulp routine to automatically inject all the scss files to `assets/scss/main.scss` which are within a `/**/styles/**.scss` folder. That is the reason, why the `scss` files of `assets/scss/**` aren't injected automatically: They are not within a `styles`
folder.

#### Build stories for html files with gulp automatically
By running `npm run gulp-stories` in your terminal, gulp will automatically create a story in a `**/stories/` folder for all html files in your project, which do not have a story yet. The gulp script basically uses the `StoryTemplate.js` in `/.storybook` as its foundation.

#### Run storybook, view components
To view your `components` within `storybook` you just run `npm run storybook` and open it in your browser. The url will be displayed in the terminal.

With storybook you can build and style your `components`. But when it comes to functionality with JavaScript or to build whole systems or pages (like a whole assembled widget) it isn't sufficient any more. `Storybook` was build to organise and build isolated stateless react components. For whole pages, we use `webpack` directly.

#### Dev mode with webpack
To view a whole page or widget for development, we use `webpack` directly and its `dev-server` by running `npm run dev`. It starts the `dev-server` and then we could view pages listed in `webpack.config.pages` directly with our browser.

In `webpack.config.pages` you have to add all pages you wanna access with the `dev-server`. It uses the [HTMLWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) behind the scenes, so all options are based on the plugin. Just add entries for further `pages` in the array when you would like to access them with the `dev-server`:
```js
// webpack.config.pages
// …
const pages = [
    // index.hbs -> index.html
    {
        // path of the html template in src
        template: './src/index/index.hbs',
        // page title
        title: 'liverate Widget',
        // description text for search engines – max 160 chars!
        description: 'Liverate widget to chat with hotels.',
        // filename after build
        filename: 'index.html'
    },
    // example.html
    {
        // path of the html template in src
        template: './src/example/example.html',
        // page title
        title: 'Another example page',
        // description text for search engines – max 160 chars!
        description: '…',
        // filename after build
        filename: 'example.html'
		}
];
// …
```

You could access the pages in your browser by using the `filename` you have set within the options. For example, to call the `example.html` I pass `http://localhost:8080/example.html` in the address bar of the browser. Don't forget to start the `dev-server` with `npm run dev`.







## Project structure
All our dev code is in `/src` folder. The build code will be build to the `/dist` folder.


### We organise our components in domains/contexts
In our `/src` folder you see folders with underscore like `_buttons`, `_lists`, `_texts` and some without like `home`, `event`, `widget`, ... 
We use the underscore just to place this folders visually on top of the order of the folders, because they are our common components. Normally we would like to place them in an parent folder like `/src/common/*`, but it would break relative links when we use a component from common within the specific domains like `src/home`, `src/event`, `src/widget`.

We build our components always in folders, which are named by the domain/context the component belongs to. For example:
```
# firs we see the common domains/contexts
./_buttons/
./_texts/
./_lists/

# then we have the more specific domains
# which often hold all the element of a whole
# ecosystem like a page or a widget.
# Mostly they are build out of common components
# (the underscore ones) and some components
# specific to the widget or page. 
./events/
./event/
./home/
```

#### Common and specific domains
If you place a component in a common domain folder (with underscore) or a specific domain (without underscore) depends on the question, if the component is used by other domains too or just in this specific context. But remember: It do not have any technical reason, so it is just a matter of organisation.

So we used the _ underscore for the folders of the common domains to indicate: Hey, this components are highly likely to be used within other domains/contexts too.

Where the missing underscore means: This components within this domain folder are likely only be used within this specific domain.

#### Folder structure within domains
Within a `domain folder` we place our `components` which belong to this specific domain. The `scss styles` and `stories` will be put in subfolders `stories` and `styles`:
```
./domain/
					AButtonMain.html
					AButtonNegative.html
					/stories/
							AButtonMain.js
							AButtonNegative.js
					/styles/
							a-button-main.scss
							a-button-negative.scss
```

As you see, beside the `scss files` which are in lowercase and the naming is separated by dashes, our `component files` and their `stories` are named by the `component name` in `camel case` starting with a uppercase letter of the `atomic category` the component belongs to.

### The asset folder
The `src/assets` folder is an exception. This folder contains all the static assets like fonts, images or vendor libraries. It contains also the global javascript files and the global scss files.

#### Put images in 'src/assets/img'
When you wanna use a image for a component, then place it within the `/assets/img/` folder and reference them from your component like:
```html
<img
    class='m-avatar-main'
    src="./../assets/img/avatars/example_avatar.jpg"
    alt="avatar"
/>
```

The webpack [html-loader](https://github.com/webpack-contrib/html-loader) detects the src path and transforms them later to the valid path of the build.
IMPORTANT: The `html-lander` does not support `srcset` yet.


#### Import JavaScript in 'body.js' or 'head.js'
Each file imported in `/assets/js/head.js` will be bundled and injected in the `<head>` of the page.

Each file imported in `/assets/js/body.js` will be bundled and injected before the closing `<body>` tag of the page.

All the JavaScript is build and bundled by [webpack](https://webpack.js.org/) and transformed with [babel.js](https://babeljs.io/)

You could write a JavaScript file for a specific component within the component folder like `widget/widget.js` and by simply importing it in `assets/js/body.js` it will be bundled in the final output file.


#### Import scss in 'main.scss'
Each scss file imported in `/assets/scss/main.scss` will be injected in the `<head>` of the page and rendered by `node-sass` and extended by `postCss's` [autoprefixer](https://github.com/postcss/autoprefixer).

### The global scss files
The files within `/assets/scss/` are common scss settings to import vendor libraries like animate.scss, normalizer, scss variables, etc.
Some to mention are:
- `base-styles.scss` contains global styles for the app 
- `breakpoints.scss` is the config file to set the breakpoints of the app which are used by the [media-queries.scss](https://github.com/sass-mq/sass-mq) mixins. It is basically a scss helper library to write media queries more conveniently.
- `helper-classes.scss` is for global valid classes like clear fix, which are often used. 
- `normalise.scss` are rules to normalise browser css rules to have a convenient cross browser experience and is from the well known [normalize project.](https://github.com/necolas/normalize.css)


## Browser support

#### Improve browser support with autoprefixer for scss
We use [postCSSs](https://github.com/postcss/postcss) [autoprefixer](https://github.com/postcss/autoprefixer), to add vendor prefixes automatically.

To configure, for which browsers `autoprefixer` should add vendor prefixes like `-webkit-…, -ms-…, -moz-…`, have a look at the browser list config `.browserslistrc`. Here you define all the browsers which should be used by [autoprefixer]().
A helpful tool to test your browserslist is [this](http://browserl.ist/?q=%3E+0.5%25%2C+Last+2+versions%2C+IE+%3E%3D+9%2C+Firefox+%3E%3D+40%2C+iOS+%3E%3D+9%2C+Safari+%3E%3D+8%2C+).

#### Improve browser support with babel for JavaScript
We use [babel.js](https://babeljs.io/) to transform our ES6 JavaScript code to browser compatible ES5 code.

For older browsers you have to also import the [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) in  one of the main js files `src/assets/js/body.js` or `src/assets/js/head.js` when you use special ES6 APIs which aren't supported by older browsers.

Within the `.babelrc` config file you find a section which is for setting up the browser support for the JavaScript:
```json
"presets": [
        [
            "env",
            {
                "targets": {
                    "node": 6,
                    "browsers": [
                        "last 3 versions",
                        "> 1% in DE",
                        "Chrome >= 20",
                        "Firefox >= 20",
                        "Safari >= 7",
                        "iOS >= 7",
                        "Explorer >= 9",
                        "ExplorerMobile >= 10",
                        "Edge >= 12"
                    ]
                }
            }
        ],
        "stage-0",
        "react"
    ],
```
