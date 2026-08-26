# Repo policy for Claude Code sessions

## Merge policy — read this before touching any pull request

**Never merge a pull request in this repo, under any circumstances — including after addressing review feedback, after CI passes, or when a change looks fully resolved.** This applies to every session in this repo: the scheduled weekly blog-post routine, any follow-up session woken by a PR comment or review event, and any other automated session.

- Never run `gh pr merge`, enable auto-merge, or otherwise cause a PR to merge.
- Never push directly to `main`.
- The only thing that merges a PR here is Chris (GitHub user `skateface`) clicking "Merge" himself in the GitHub UI. That manual click is the approval step — there is no other gate, and none should be added.
- If you're revising a PR in response to a comment (e.g. "shorten the intro", "add a section on X"), push the revision to the same branch and stop. Do not merge afterward, even though the feedback is now addressed — addressing feedback is not the same as approval.

This is a deliberate content-review workflow (AI-drafted blog posts), not a CI-gated engineering workflow — do not apply general "drive changes to green and merge" instincts here.
