# Three-page Part 1 recap implementation plan

> Execute inline for this user-specified content change; preserve original study records and user scripts. No tool or publishing migration.

Goal: Part2 begins with three quick Part1 recap pages, titled identically, before its Part2 divider. First page shows original Figure2 and explains modules/flow matching intuitively; second covers only three data sources/roles; third covers only three training purposes.

Files: sections/05-inference-strategy.md owns P101/P102/P103/P099; existing S116/S117 remain P101 notes. sections/04-training-procedure.md changes only the Q&A start link. parts_output.py partitions at P101 in the new mode; older modes remain supported. Speaker scripts, source/version metadata, local navigation tests and guides follow generated order.

Task 1:
1. Add exporter checks for P101→P102→P103→P099→P020, all inside Part2; verify the old guard rejects valid new order.
2. Implement three recap pages and concise speech; retain all121 original study units and existing Part1 scientific narration. Move Part2 marker after recaps.
3. Update exporter and navigation expectations; build v39 (48 pages, Part1 18, Part2 30).
4. Verify source/speech, exporter7tests, actual render, all topic links and local numbering; inspect3recap PNGs. Review module/data/training wording and transitions.
5. Record feedback/results, commit and push under existing authorization.

Review focus: VLM outputs action-relevant features; memory uses past features; training velocity differs from inference action chunk. No synthetic generation or training hyperparameter lecture in recap; same large title on all3 pages.

Status: content, export ordering, tests and independent review complete; final commit/push follows.

Latest user correction: Part2 divider BEFORE three recap pages. Figure2 must be presented by module, matching the provided script. P101 now has6 internal zoom/focus states; title remains fixed. Added overview_markup.py, runtime next/previous integration, keyboard-focus regression test, and screen/speech checks.

Final steering implemented and verified: Part2 starts at divider; Figure2 has6 module-aligned states. Independent review and visual-review findings fixed with regressions. Commit/push follows.
