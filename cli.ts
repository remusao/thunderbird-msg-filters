import { promises as fs } from 'fs';

import { parse, pprint } from '.';

(async () => {
  const msgRulesPath = process.argv[process.argv.length - 1];
  if (msgRulesPath.endsWith('/msgFilterRules.dat') === false) {
    console.error('usage: <program> <msgFilterRules.dat>');
    process.exit(1);
  }

  const msgRulesRaw = await fs.readFile(msgRulesPath, 'utf-8');
  const msgRules = parse(msgRulesRaw);
  const msgRulesPprint = pprint(msgRules);

  console.log('Rules', msgRules, msgRulesRaw.trim() === msgRulesPprint);
})();
