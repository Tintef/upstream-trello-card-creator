import * as core from '@actions/core';
import * as exec from '@actions/exec';
import TrelloNodeAPI from 'trello-node-api';

async function createCard(commit : string) {
  const Trello = new TrelloNodeAPI();
  Trello.setApiKey(core.getInput('TRELLO_API_KEY'));
  Trello.setOauthToken(core.getInput('TRELLO_OAUTH_TOKEN'));

  const [hash, desc] = commit.trim().split(/\s(.*)/).splice(0,2);
  await Trello.card.create({
    name: `${desc} [${hash}]`,
    desc: `Commit url: ${core.getInput('UPSTREAM')}/commits/${hash}`,
    pos: 'top',
    idList: core.getInput('TRELLO_LIST_ID'),
    due: null,
    dueComplete: false,
  });
}

async function run() {
  const upstream : string = core.getInput('UPSTREAM');
  if (!upstream.match(/[^\/]*\.git/gi)) return;

  try {
    process.chdir('./upstream');
    let upstreamLog = '';
    await exec.exec('git', ['log', '--oneline', '--since="1 day ago"'], {
      listeners: {
        stdout: (data: Buffer) => {
          upstreamLog += data.toString();
        },
      },
    });
    const newCommits = upstreamLog.split('\n');
    process.chdir('..');

    await Promise.all(newCommits.map((commit) => createCard(commit)));
  } catch (error) {
    console.error(error);
  }
};

run();
