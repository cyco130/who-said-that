# Who said that?!

Add a prefix that identifies the currently running npm script to every line of its output

## Why?
Sometimes it's hard to identify which line of output comes from which script when running running multiple npm scripts in parallel or in series like in a monorepo build or a continuous integration output. Just prefix your npm script definition with `which-script` and you will have a tag that includes the package name and the script name on every output line.

## How?
Given that you have an npm script like this:

```json
  "lint": "who-said-that eslint"
```

You will have an output like this:

<pre><code>
<span style="color:cyan">[your-package lint]:</span> /path/to/your/file.js
<span style="color:cyan">[your-package lint]:</span>   7:40  warning  'x' is defined but never used  @typescript-eslint/no-unused-vars
</code></pre>

And it will help you identify which package (`your-package`) and which script (`lint`) logged these messages when examining a large log, for instance.

## Installation
```sh
npm install --save-dev who-said-that
```

Or you can install it globally if you like:
```sh
npm install -g who-said-that
```

## Credits
- [Fatih Aygün](https://github.com/cyco130), [MIT License](https://opensource.org/licenses/MIT).