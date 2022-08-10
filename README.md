<h1>
Teresa
</h1>

<h5>Version: 0.1-beta</h5>  

**About:**
Teresa is the modular AI assistant from the future of the past, powered by Google's Dialogflow and a NodeJS backend. This repository contains the backend code.

**Features:**

- Teresa comes preloaded with these base set of functionalities: Weather reports, web search(Duckduckgo) and small-talk
- Extremely modular: Teresa is designed to be extended - you can write your own webhooks that add additional functionality without cluttering the codebase.
- Audio feedback: Just like most AI assistants Teresa will respond both with text and synthesized speech.
- All you need is a browser: The frontend adapts to the screen of the device, virtually allowing Teresa to be accessed from any device with a browser.
- No shady tactics: Teresa's backend is open-source, so you know exactly what is happening every time you interact with her.

**Instances:**
You can self-host Teresa. Currently, there's an official instance hosted on glitch:

- [Teresa on Glitch](https://teresa.glitch.me)

**Read Before Self-Hosting:**
- A template `env` file has been provided which will store your backend secrets(API keys, App Credentials,etc)
- Rename it to `.env` and fill in all the secrets before deploying
- Change the axios requests in `/public/js/main.js` to call your self-hosted backend


**For Contributors:**
- The `public` directory consists of the front-end
- The `middlewares` directory is where you should drop your custom backend middlewares
- The `templates` directory consists of cards/layouts for display on the front-end, which Teresa will optionally return while fulfilling a webhook
- The `routes` directory consists of all the expressJS routers
- The `webhooks` directory contains js files that will each fulfill a particular webhook
- If you've added additional functionality to Teresa and would like to submit your additions, I'd greatly appreciate it.
- Simply open a PR describing your changes


Made with ❤️ by Xploreinfinity ✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧

![](https://www.gnu.org/graphics/gplv3-with-text-136x68.png)