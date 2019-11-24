# Thunderbird Message Filters Parser and Printer

This is a small library which can parse `msgFilterRules.dat` files from
[Thunderbird](https://www.thunderbird.net/), the free email application.
`msgFilterRules.dat` contain so-called "Message Filters", which can be used to
automatically apply actions to inbound emails based on some pre-conditions.
Things like automatic tagging, labelling or moving email to specific folders.

I personally make extensive use of message filters, but as the number of rules
grow, I found the built-in interface to not be so convenient. Finding or
editing rules can become a pain. So I decided to write a library which allows
to manipulate these rules through a minimal and type-safe API.

For example:

```typescript
import { parse, pprint } from 'thunderbird-msg-filters';

// A typical `msgFilterRules.dat` could contain this raw value.
const rules = parse(`
version="9"
logging="no"
name="rule 1"
enabled="yes"
type="17"
action="Mark flagged"
condition="OR (subject,contains,foo) OR (subject,contains,bar)"
name="rule 2"
enabled="yes"
type="17"
action="Mark read"
action="JunkScore"
actionValue="100"
condition="ALL"
`);

// This will produce the exact same output as previous example.
const rulesAsString = pprint({
  version: '9',
  logging: 'no',
  rules: [
    {
      name: 'rule 1',
      enabled: 'yes',
      type: '17',
      actions: [{ name: 'Mark flagged'}],
      condition: 'OR (subject,contains,foo) OR (subject,contains,bar)'
    },
    {
      name: 'rule 2',
      enabled: 'yes',
      type: '17',
      actions: [
        { name: 'Mark read' }
        { name: 'JunkScore', value: '100' }
      ],
      condition: 'ALL'
    },
  ]
})
```

The goal of this library is to allow developping more high-level tooling to
read, transform, extend, update the rules while not having to worry about the
low-level parsing details. It would also be possible to keep the rules in a
nicer format then use the library to produce the final file which can be
consumed by Thunderbird.
