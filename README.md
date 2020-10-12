# Upstream trello card creator

This action intention is to create one trello card for each new commit on a given upstream, with the goal of having a better roadmap to have your fork in sync!

## Inputs

#### `TRELLO_API_KEY` (**Required**)

Necessary to use [Trello's API](https://developer.atlassian.com/cloud/trello/rest/). Go to this site to [obtain yours](https://trello.com/app-key) and set it up as a secret in order to use: `${{ secrets.TRELLO_API_KEY }}`.


#### `TRELLO_OAUTH_TOKEN` (**Required**)

Necessary to use [Trello's API](https://developer.atlassian.com/cloud/trello/rest/). Go to this site to [obtain yours](https://trello.com/app-key) and set it up as a secret in order to use: `${{ secrets.TRELLO_OAUTH_TOKEN }}`.


#### `TRELLO_LIST_ID` (**Required**)

Id of the trello list where the cards will be created. Go to your trello board and add `.json` at the end and search for the id of the desired list and set it up as a secret in order to use: `${{ secrets.TRELLO_LIST_ID }}`.


#### `UPSTREAM` (**Required**)

Url of the upstream repository.

## Usage example

```
name: Create trello card for new upstream commits

on:
  schedule:
    - cron: '*/5 * * * *' # every 5 minutes

jobs:
  sync:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@master
        with:
          repository: maurocen/mira-de-quien-te-burlaste-barney
          token: ${{ secrets.GH_TOKEN }}

      - uses: tintef/upstream-trello-card-creator@v0.0.1
        with:
          TRELLO_API_KEY: ${{ secrets.TRELLO_API_KEY }}
          TRELLO_OAUTH_TOKEN: ${{ secrets.TRELLO_OAUTH_TOKEN }}
          TRELLO_LIST_ID: ${{ secrets.TRELLO_LIST_ID }}
          UPSTREAM: git@github.com:Tintef/upstream-trello-card-creator.git
```

## Output example

