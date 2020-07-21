# The Rain Network

This project visualizes rainfall data for the Hout Bay Rainfall community website.

Trello Board: https://trello.com/b/nQzzjvpb/rainfall-hout-bay

It is an adaptation of the https://codeschooldirectory.co.za project, and is a [Codebridge](https://codebridge.org.za/) community project.

## Live Website

We're still thinking of a great new domain name for our rainfall community site, but the temporary home is at: https://rainfall-data-536ee.firebaseapp.com/

Test data is stored in this Google Sheets: https://docs.google.com/spreadsheets/d/1XBpic3g_pt1CnjbJ-hCue5I84LR7oJnNNdCZvn968w8/edit?usp=sharing

Interested in starting your own directory? [Read more here](create-your-own-directory.md).

## How to run

1. Clone the repository:
```
git clone https://github.com/georgezee/RainfallDisplay.git
```
2. Change into the cloned folder
```
cd RainfallDisplay
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
