# The Thing library

This project allows neighbours to share things.

This is a [Codebridge](https://codebridge.org.za/) community website. It is an adaptation of the https://codeschooldirectory.co.za project.

## Live Website

The website is running live here: TBC

The data is stored in this Google Sheets: TBC

Interested in starting your own directory? [Read more here](create-your-own-directory.md).

## How to run

1. Clone the repository:
```
git clone https://github.com/georgezee/ThingLibrary.git
```
2. Change into the cloned folder
```
cd ThingLibrary
```
3. Download all the project dependencies (will take a while):
```
npm update
```
4. Run the app:
```
npm start
```
The site should automatically open in your browser at: https://localhost:3000

## Deploying to live site

### Automatic (preferred)
[Travis CI](https://travis-ci.org/) is setup to automatically deploy on every commit or merge to Master. All warnings are treated as errors so the build will fail if you do not resolve all warnings before pushing.

### Manual

To build:

```
npm run build
```
Then deploy to Firebase:
```
firebase deploy
```
### Environment Variables
There are three environment files included:
1. `.env` :  This is the one used when you build and run your app locally.
2. `.env.local` :  A reference copy of the .env file, indicating preferred local variables.
3. `.env.production` : If you are authorised to and are going to be deploying a production, this contains a few extra values you should include.

Notes:
- Changes to an .env file will need an app restart to take effect.
- You can use: `git update-index --skip-worktree .env` to ignore changes to your local env file.
- We use these files only for publicly shareable keys and variables, don't put sensitive data here.
