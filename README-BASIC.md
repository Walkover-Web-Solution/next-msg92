# MSG91 Website - Intern Guide

Welcome! This is a simple guide to help you get started with the MSG91 website project.

## What is this project?

This is MSG91's main website built with Next.js (a React framework). It has:

- Multiple pages for different countries
- A blog section
- Contact forms and widgets
- Modern styling with Tailwind CSS

## Before you start

Make sure you have:

- Node.js installed (version 18 or newer)
- A code editor like VS Code
- Basic knowledge of HTML, CSS, and JavaScript

## Getting the project running

### Step 1: Get the code

```bash
# If you haven't cloned the project yet
git clone [repository-url]
cd MSG91
```

### Step 2: Install everything

```bash
npm install
```

This downloads all the tools and libraries the project needs.

### Step 3: Set up environment file

1. Find the file called `.env.example`
2. Copy it and rename the copy to `.env`
3. Ask your supervisor to fill in the values (these are secret keys)

### Step 4: Start the website

```bash
npm run dev
```

The website will open at: http://localhost:3030

## Important folders to know

- `src/pages/` - Each file here becomes a webpage
- `src/components/` - Reusable pieces of the website (like headers, buttons)
- `src/data/` - Content for different countries (text, images info)
- `_posts/blog/` - Blog articles
- `public/` - Images and files that don't change
- `src/styles/` - How the website looks (colors, fonts, layout)

## Common tasks you might do

### Adding a new blog post

1. Go to `_posts/blog/`
2. Create a new `.mdx` file
3. Copy the format from an existing blog post
4. Write your content

### Changing website content

1. Look in `src/data/` folders
2. Find the right country folder (like `in/` for India)
3. Edit the `.json` files
4. The website updates automatically

### Adding images

1. Put images in `public/img/` or `public/assets/`
2. Use them in code like: `/img/your-image.png`

## Basic commands you'll use

- `npm run dev` - Start the development server (port 3030)
- `npm run build` - Build the project for production
- `npm start` - Start the production server (port 3030)
- `npm run lint` - Check for code errors
- `npm install` - Install all project dependencies

## Ports and URLs

- **Development**: http://localhost:3030 (when running `npm run dev`)
- **Production**: http://localhost:3030 (when running `npm start`)
- The project uses port 3030 by default (not the usual 3000)

## Git commands (basic)

- `git status` - See what files you've changed
- `git add .` - Stage all your changes
- `git commit -m "your message"` - Save your changes with a message
- `git push` - Upload your changes to the server
- `git pull` - Download latest changes from the server

## Troubleshooting

### Website won't start

1. Delete the `node_modules` folder
2. Run `npm install` again
3. Try `npm run dev`

### Port already in use

- Stop other development servers
- Or change the port in `package.json` scripts

### Changes not showing

- Make sure you saved the file
- Check the terminal for error messages
- Try refreshing the browser (Ctrl+R or Cmd+R)

### Common error fixes

- **Module not found**: Run `npm install`
- **Syntax error**: Check for typos in your code
- **Build failed**: Run `npm run lint` to find issues

### Working with components

1. Components are in `src/components/`
2. Each folder has a component (like `BannerComp/`, `AboutUsComp/`)
3. These are reusable pieces - change once, updates everywhere
4. Always test after making changes

## Important functions and utilities

### Built-in utilities the project uses

- **axios** - For making API calls (getting data from servers)
- **date-fns** - For working with dates and times
- **react-icons** - For adding icons to the website
- **react-toastify** - For showing popup messages to users
- **gray-matter** - For reading blog post information
- **next-mdx-remote** - For converting blog posts to web pages

### Common functions you'll see

- **API calls** - Functions that get data from MSG91's servers
- **Form handlers** - Functions that process contact forms
- **Data formatters** - Functions that make data look nice on the website
- **Navigation helpers** - Functions that help users move around the site

### Styling utilities

- **Tailwind CSS classes** - Pre-made styles like `bg-blue-500`, `text-center`
- **DaisyUI components** - Ready-made buttons, cards, and layouts
- **SCSS mixins** - Custom styles specific to MSG91's design
- **Responsive utilities** - Make the site work on phones and computers

## Other important things to know

### File types you'll work with

- **`.js` files** - JavaScript code (the logic)
- **`.json` files** - Data files (text, settings, content)
- **`.mdx` files** - Blog posts (mix of text and code)
- **`.scss` files** - Styling files (how things look)

### Special features

- **Multi-country support** - Same website, different content for each country
- **SEO optimization** - Helps Google find and rank the website
- **Widget integration** - Chat boxes, OTP forms, and other interactive elements
- **Analytics tracking** - Sees how users interact with the website

### Development tools

- **Hot reload** - Website updates automatically when you save
- **Error messages** - Browser console shows what's wrong
- **Prettier** - Automatically formats your code nicely
- **Husky** - Checks your code before saving to Git

### Performance features

- **Image optimization** - Pictures load faster
- **Code splitting** - Only loads what's needed for each page
- **Static generation** - Some pages are pre-built for speed
- **Caching** - Stores frequently used data for faster loading

## Useful commands

- `npm run dev` - Start working on the website
- `npm run build` - Check if everything works for production
- `npm run lint` - Check for code problems

## Getting help

- If the website won't start, try deleting `node_modules` folder and run `npm install` again
- If you see errors, check the terminal for red text - it usually tells you what's wrong
- Ask your supervisor if you're stuck!

## Tips for interns

1. **Start small** - Make tiny changes first to understand how things work
2. **Save often** - The website updates automatically when you save files
3. **Use the browser developer tools** - Right-click → Inspect to see what's happening
4. **Don't be afraid to break things** - You can always undo changes with Git
5. **Ask questions** - It's better to ask than to guess!

## What NOT to touch (at first)

- `package.json` - This controls what tools the project uses
- `next.config.mjs` - Advanced settings
- `.env` file - Secret keys and settings
- Anything in `node_modules/` - These are downloaded tools

## Ready to contribute?

1. Make your changes
2. Test them by running `npm run dev`
3. Show your supervisor
4. They'll help you submit your changes properly

Good luck and happy coding! 🚀
