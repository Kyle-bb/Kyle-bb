# Clear Rows - synthetic CSV web demonstration

CLEAR ROWS — NEW AI-CREATED SYNTHETIC WEB DEMONSTRATION
Created by Codex for Kyle Bowman. Not prior client work. No client data.

Serve this directory with a local HTTP server, then open index.html. ES modules
usually require HTTP; opening the file directly may fail in browser security.
No external libraries, fonts, analytics or network services are used. Processing
and CSV exports run locally in the page. No files are uploaded.

Rules: exact three headers id,name,units (header case/spaces tolerated); trim and
uppercase IDs; trim names; allow blank names. Hold every occurrence of a
duplicate normalized ID, missing IDs, blank units, extra/missing columns and
invalid units. Units use ordinary decimal notation, must resolve to a safe
nonnegative whole number; zero and2.0 valid, hexadecimal/scientific notation
rejected. Empty CSV records are ignored. Exception exports include the original
record as JSON. Record numbers count nonblank data records, not physical lines.

Tests: node --test logic.test.mjs
Fictional initial example:9records,3valid,6held. Normalization and exceptions
are visible; changing the input invalidates previous results and downloads.

CSV exports apply spreadsheet-oriented text protection: text beginning with
=,+,-,@ (including leading whitespace), or a leading tab/carriage return, gets
an apostrophe prefix. This affects exported cells only; source records and
on-screen values stay unchanged. Numeric values including zero are unchanged.
The original record JSON in exception exports preserves its exact field text.
CSV re-import retains the protective apostrophe; it is an intentional export
representation change. This does not certify safety in every spreadsheet app.

Limits: small in-memory CSV fixture, no streaming/large-file performance claim
or native Excel/Power BI verification. Review business rules before real use.
Client work requires agreed business rules, permission for AI execution/data
processing and payment terms before starting. No guaranteed business outcomes.

ACTUAL AUTOMATED RUN EVIDENCE —26OCTOBER2026
Runtime:Node.jsv24.19.0; recorded2026-10-25T14:42:31Z (26OctoberBrisbane).
Command: bundled Node.js --test logic.test.mjs
Result:17tests,17passed,0failed,0skipped,exit0 after export-text hardening.
Coverage: quoted commas/CRLF/escaped quotes, quoted newline roundtrip, valid zero,
blank units, all duplicate occurrences held, missingID, invalid/unsafe/negative/
fractional units, integer decimal input, wrong headers/quotes/column count,
clean+exception exports roundtrip, original evidence, blank lines/BOM and count
reconciliation, export-only formula/whitespace protection and unchanged source
records.

BROWSER CHECKS —26OCTOBER2026
Verified in the browser against a loopback HTTP server: initial example shows
9records/3clean/6held, including a valid zero; editing the CSV clears results
and disables exports; a3record duplicate example produces1clean/2held; the
clean CSV download contains the expected header and sole valid record.
Desktop and375x812mobile views were reviewed. A grid minimum-width overflow
was corrected; the mobile document now has equal360px scroll/client widths
(table content scrolls inside its panel). Temporary viewport was reset.
This is browser and code-test evidence, not native spreadsheet certification.
