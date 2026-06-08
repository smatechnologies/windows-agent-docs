## Summary

<!-- Briefly describe what this PR changes and why. -->

## Type of change

- [ ] New documentation page
- [ ] Update to existing page (accuracy fix, content addition)
- [ ] Structural change (sidebars, navigation, front matter)
- [ ] Release notes update
- [ ] Other: <!-- describe -->

## Pre-flight checklist

### Terminology

- [ ] No banned terms used: LSAM (as a customer-facing noun), execute/executed/executing, right-select, click, drop-down, checkbox, navigate to, launch, client, task/process (as job synonyms)
- [ ] Customer-facing product names are spelled correctly: OpCon, Windows Agent, SMA Technologies

### Voice and structure

- [ ] Procedural pages use second person ("you") and imperative steps
- [ ] No first person ("we," "our") in content
- [ ] Numbered steps used for procedures; one action per step
- [ ] Lead-in sentence present before step lists: "To [goal], complete the following steps:"

### Front matter (every `.md` file in `docs/`)

- [ ] `title:` present
- [ ] `description:` present
- [ ] `tags:` present with at least one Type tag (Conceptual, Procedural, Reference) and one Role tag

### Cross-references

- [ ] All internal links resolve to existing pages
- [ ] New pages added to `sidebars.js`
- [ ] New pages added to the `docs/index.md` card grid (if user-facing)

### Content accuracy

- [ ] All parameter names, defaults, and behaviors verified against the codebase or release notes
- [ ] No fabricated content — every claim is traceable to source code, a release note, or existing verified documentation

## Source references

<!-- List the codebase files, release notes, or other sources that support the content changes in this PR. -->

| Claim or content | Source |
|---|---|
|  |  |

## Testing

- [ ] `yarn start` runs without errors
- [ ] Pages render correctly in the local preview
- [ ] No broken links introduced (verify with browser dev tools or `yarn build`)
