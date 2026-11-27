---
name: timer4coachs-seance
description: Writes a training session (martial arts, combat sports, CrossFit, fitness, HIIT…) in the timer4coachs/1 format, the .md file the Timer4Coachs app imports to time the session, announce the blocks and play music. Use when asked "create a session", "prepare my class for tonight", "make me a 45-minute workout", "turn this lesson plan into a Timer4Coachs file", "load this whiteboard photo into Timer4Coachs", "send this WOD to my app", "fix my file that shows errors".
---

# Creating a Timer4Coachs session

Timer4Coachs is an iPhone and Apple Watch app that runs a timed session: a timer per sequence, 3-2-1 beeps, a gong, a voice announcing the blocks, a coach giving encouragement, music on the chosen blocks. The session is a Markdown file in the **timer4coachs/1** format. This document is enough to write one: everything the app reads is described here; any other text is ignored or displayed as is.

This file also works outside Claude: paste it as is into any AI along with your request.

The coach can also give you a **photo of the whiteboard**, a text or a spreadsheet: transcribe it (see "Transcribing a whiteboard, a text or a spreadsheet"). If the **Timer4Coachs connector** is available (tools `lire_format_seance`, `verifier_seance`, `envoyer_seance`), the session goes straight into the coach's app, with no file to import (see "Sending to the app").

## Language: fixed French tokens, content in the user's language

The format's keywords are **fixed French tokens**. The app parses them literally, so never translate them:

- sequence types `[travail]` (work), `[repos]` (rest), `[consigne]` (instruction);
- block options `phase: Name #RRGGBB`, `musique: oui` / `musique: non` (music yes / no) and `chrono: montant` (rising timer);
- line prefixes `> **Objectif :**` (objective), `**Consigne :**` (coach cue), `**Matériel :**` (equipment), `**Programme :**` (exercise list), `**Scaling :**` (levels), `**Débrief :**` (debrief), spelled exactly like this, including the space before the colon;
- header keys `format`, `titre`, `date`, `heure`, `lieu`, `duree`, `public`, `theme`, `sous_theme`, `coach`;
- separators ` · `, `⇄`, `♪`; durations `m:ss` for sequences, `N min`, `1h`, `1h30` for blocks, sections and the session.

Everything else is content: titles, labels, descriptions, cues, the values of header keys. **Write that content in the language the user speaks** (English if they write in English, French if they write in French, and so on). The voice reads block titles aloud, so keep them in the user's language too.

## Method

1. **Frame** before writing, asking at most three questions if information is missing: total duration, audience (level, age, group size), discipline and theme of the day, available equipment. Without an answer, pick reasonable values and say so. When transcribing a whiteboard, a text or a spreadsheet, the coach has already decided: do not reframe, ask only about what you cannot read.
2. **Break down** the session into sections (main phases), then blocks (exercises), then timed sequences (work, rest, instruction).
3. **Write** the file following the format below.
4. **Check the durations**: each announced block must be exactly the sum of its sequences, each section the sum of its blocks, the session the sum of its sections. This is the most common mistake, and the app shows it in orange. With the connector, call `verifier_seance`; otherwise, if a code execution tool is available, run `scripts/verifier_fiche.py` (see below); otherwise, redo the additions by hand, line by line.
5. **Deliver**. With the connector: show the session to the coach, then send it with `envoyer_seance` (see "Sending to the app"). Without it, always end with the `.md` file to download, named `YYYY-MM-DD-topic.md` (or `topic.md` without a date):
   - if the AI can create files (attachment, artifact, code tool), create the file and offer it for download;
   - otherwise, give the complete file in a single code block, telling the user to copy it into a text file with that name (Files or Notes app, then "Export").

   The last message ends with this file, followed by one line on how to import it: in Timer4Coachs, Sessions screen, "Import a session", then pick the file in the Files app.

## The timer4coachs/1 format

### Overall structure

```markdown
---
format: timer4coachs/1
titre: Krav Maga - Beginners
date: 19/11/2026
heure: 19:00
lieu: Main dojo
duree: 10 min
public: Beginners
theme: Street boxing
---

# Street boxing · jab-cross and 360 defense

> **Objectif :** one sentence saying what students will be able to do at the end.

## Warm-up · 10 min · ♪

### Cardio · 6 min · phase: Warm-up #FF7A1A
Free text describing the block.

**Consigne :** what the coach reminds students during the block.
**Matériel :** jump ropes

- [travail] Jump rope · 2:00
- [repos] Recovery · 0:30
- [travail] High knees · 1:30
- [repos] Recovery · 0:30
- [consigne] Explaining the next exercise · 1:30

### Mobility · 4 min · phase: Warm-up #FF7A1A
- [travail] Shoulders, hips, ankles · 4:00
```

### Header (between the two `---` lines)

One key per line, `key: value`. All are optional except `format`.

| Key | Role |
|---|---|
| `format` | Always `timer4coachs/1`. Older files marked `chrono-tatami/1` still open. |
| `titre` | Short name of the session. |
| `date` | Shown in green on the session card (`DD/MM/YYYY`). |
| `heure` | Start time (`19:00`), shown on the card and the preparation screen. |
| `lieu` | Location, shown on the card after the time. |
| `duree` | Total duration (`45 min`, `1h`, `1h30`). **Checked**: the sum of the sections must match it exactly. |
| `public`, `theme`, `sous_theme`, `coach` | Informational (audience, theme, sub-theme, coach). |

### Title and objective

- `# Title`: the title shown in large type. Only one `#` line.
- `> **Objectif :** …`: shown under the title. Optional.

**Name the session after what the athletes will do, not after the timers.** The title is what the coach and the athletes see first on the card, the TV and the watch: make it catchy and concrete, built from the movements, the body part, the skill or the theme of the day. The timer formats (AMRAP, EMOM, For Time, Tabata, durations) are already in the blocks: keep them out of `titre` and `# Title`, or at most as a short second part after ` · `.

| Avoid | Prefer |
|---|---|
| `AMRAP 7 + 1RM + EMOM 16` | `Clusters, clean and box jumps · team of 3` |
| `EMOM 12 min` | `Bar muscle-up day` |
| `Tabata 4 min + core` | `Burpees and plank burner` |
| `Session 3` | `Jab-cross and 360 defense` |

If the board or the coach gives the session a name (`WOD de Noël`, `Murph`, `Fran`), keep it and add the main movements after ` · ` (`WOD de Noël · clusters, clean, box jumps`). Block titles follow the same idea: lead with the content, the format after a colon (`Clusters and pull-ups: AMRAP 7 min`), since the voice reads them aloud.

### Sections: `## Title · duration · ♪`

- A main phase of the session. The duration (`12 min`, `1h`) is optional but **checked** if present.
- `· ♪` at the end of the line: music on every block of the section.
- The section's **colour** comes from its **family**, recognised from French or English words in its title (accents and case ignored):

| Words in the title | Family | Default colour |
|---|---|---|
| ouverture, accueil, opening, welcome, whiteboard | Salut (greeting) | white `#F2EFE6` |
| échauffement, warm | Échauffement (warm-up) | orange `#FF7A1A` |
| pratique, restitution, combat, sparring, practice, drill, WOD, metcon | Mise en pratique (application) | red `#FF3B30` |
| calme, étirement, cool, stretch | Retour au calme (cool-down) | blue `#3DB8FF` |
| any other title | Techniques | green `#C6FF1A` |

- **Titles in another language** (German, Spanish, Japanese…): add the family as one last English segment, `· opening`, `· warm-up`, `· practice` or `· cool-down`. It is not shown; the title stays in the user's language: `## Aufwärmen · 12 min · ♪ · warm-up`. A Techniques section needs no hint.
- A **block** takes its section's family, except a greeting block: a block whose title starts with "Salut", or that ends with `· opening` (`### Gruß · 2 min · opening`), is a Salut block wherever it is (at the end of the class too).
- To choose another name or colour than the family's, add `phase: Name #RRGGBB` to the blocks (see below).

### Blocks: `### Title · duration · phase: Name #RRGGBB · musique: oui|non · chrono: montant`

- An exercise or a drill. **At least one timed sequence** is required.
- The duration (`5 min`) is optional but **checked** if present.
- `· phase: Name #RRGGBB` (optional): sets the name and colour of the block's phase, as a 6-digit hexadecimal. It overrides the app's settings. The name is free text, in the user's language.
- `· musique: oui` or `· musique: non` (optional): forces music on or off for this block. Without it: music if the section carries `♪`, otherwise according to the phase in the app's settings.
- `· chrono: montant` (optional): the big digits **count up** from 0:00 to the sequence's duration instead of counting down, so athletes read their own time when they finish (For Time, chipper, rounds for time, ladder). The duration stays the time cap: timing, beeps and validation do not change. Without it, the digits count down.
- The parts after the title are separated by ` · ` (middle dot surrounded by spaces), in any order.

Under the block line, in this recommended order:

- **free text**: the block's description, shown in the detail view;
- `**Consigne :** …`: the coach's reminder;
- `**Matériel :** …`: equipment to prepare, announced with the block;
- `**Programme :** …`: the block's exercises, separated by commas, each starting with its count or duration (`15 wall balls, 12 cal row, 6 bar muscle-ups`). The TV screen lists them in a column, numbers aligned, next to the timer, and highlights the exercise named in the current sequence's label. Use it for every block whose content is a list of movements (warm-up rounds, skill work, WOD); the session overview before the start also shows the WOD's list;
- `**Scaling :** …`: one line per level, shown at the bottom of the TV screen like comments (`**Scaling :** RX wall ball 20/14 lb · Scaled 14/10 lb`, then `**Scaling :** Beginner 10/6 lb, ring rows`). Start each level with its name (RX, Scaled, Beginner, Score…): the TV puts it in bold. Two lines at most per block;
- `**Débrief :** …`: a question or point to cover at the end;
- the **timed sequences**.

### Timed sequences: `- [type] label · m:ss`

```markdown
- [travail] Push-ups · 0:45
- [repos] Recovery · 0:15
- [consigne] Technique demonstration · 2:00
- [travail] Round 1 · ⇄ Switch roles · 2:00
```

- **Type**: `travail` (work: effort, coloured timer), `repos` (rest: recovery), `consigne` (instruction: explanation, demonstration, setup; the music is lowered).
- **Label**: what is shown above the timer. Short and concrete ("10 burpees", not "Do some burpees"). It may contain ` · ` to chain two pieces of information ("Round 1 · Squats").
- **Duration**: always **last**, in `m:ss` format (minutes, colon, **two digits** of seconds): `0:30`, `1:00`, `12:00`. Never `30s`, `1'30` or `90`.
- `⇄ text` (optional, partner work): halfway through the sequence, a triple beep and the voice reads the text ("Switch roles").
- A line without a valid duration is an **error**.

## What the app does (to time things well)

- **3-2-1 beeps** before each sequence change, a **gong** at the end of a sequence.
- **Voice**: announces each new block by its title, and "In 10 seconds: *next block*". Clear, pronounceable block titles matter.
- **Coach**: counts "5, 4, 3, 2, 1, stop" at the end of a work sequence of at least 8 s, "5, 4, 3, 2, 1, go" at the end of a rest or instruction of at least 6 s followed by work; "Half way" halfway through a work sequence of at least 1 min; "10 seconds" before the end of a work sequence of at least 30 s; a rest encouragement on a rest of at least 15 s.
- **Music**: only on marked blocks (section `♪`, `musique: oui` or phase setting), lowered during the voice and instructions.

In practice:

- Split a circuit into sequences ("Round 1 · Push-ups · 0:30", "Round 1 · Squats · 0:30"…) rather than a single 4-minute sequence: each change is beeped and displayed.
- Use `consigne` for demonstrations and transitions, `repos` for physical recovery.
- Avoid sequences shorter than 8 s, too short for the announcements.

## Validation rules (the app checks them)

1. Each block has at least one timed sequence.
2. Announced block duration = sum of its sequences, to the second (a block announced as `5 min` must total exactly `5:00`).
3. Announced section duration = sum of its blocks.
4. Header `duree` = sum of all sections.
5. Each sequence ends with a valid `m:ss` duration.
6. No ` · ` in a section or block **title**: everything after the first ` · ` is read as a duration or an option. For a break inside a title, use ":" or "-".

Durations are announced in whole minutes: if a block adds up to 4 min 30, write `### Block` without a duration, or adjust the sequences to land on a round minute.

## Transcribing a whiteboard, a text or a spreadsheet

The coach photographs the whiteboard (or pastes a text, or shares a spreadsheet) and wants that session in the app, not another one.

- **Transcribe, do not rewrite**: keep every movement, load, rep count, time cap and rest as written, in the board's order and wording. Do not add a warm-up, a cool-down or a block that is not on the board.
- **Keep the board's notations** in labels and `**Programme :**` lines: `40/30` (men/women load or calories), `MAX`, `RX`, `Scaled`, `1RM`, `GTO`, `HRPU`… Never turn `40/30 kg` into one load, never drop a `MAX`.
- **Title**: name the session after its movements or the board's name, never after its timers (see "Title and objective").
- **Team formats** (`team of 3`, `in pairs`, `synchro`): put them in the title and `public`, and say in the block text how the team shares the work. In an EMOM where each minute is `MAX`, keep `MAX` in every minute's label.
- **Timing**: one section per WOD (or per part of the board), the rests between WODs as `[repos]` blocks with `musique: non`. EMOM: one sequence per minute, rest minutes included. AMRAP: one sequence for the time cap. For Time and chipper: one sequence for the cap with `chrono: montant`. A rest the board does not give: ask, or write 0 and say so.
- **Scores and levels**: the scoring rule (`Score (rounds × 30) + sit-ups`, `team total`) and the levels go in `**Scaling :**` lines.
- **Unreadable or ambiguous**: never guess a number. Ask about it in one short question, or write your best reading and list it under the session ("to check: …").
- Always show the transcription to the coach before sending or delivering it, so they can correct a misread.

## Sending to the app (Timer4Coachs connector)

The connector comes with the **Timer4Coachs plugin** for Claude. Without the plugin, the coach adds it once to their AI as a custom connector named "Timer4Coachs", at the address `https://uyykwnzvwwaerzpgsqsp.supabase.co/functions/v1/mcp` (also shown in the app: Settings, "Connect my AI"). On first use, the AI opens a Timer4Coachs connection page: the coach accepts in the iPhone app, once. If the tools answer that the connection is missing or expired, tell the coach to reconnect the connector from the AI's settings. The connector has three tools:

| Tool | Role |
|---|---|
| `lire_format_seance` | Returns this guide. Call it once if you do not already have it. |
| `verifier_seance` | Checks the file exactly as the app reads it: run-through, errors, advice. Sends nothing. |
| `envoyer_seance` | Sends the file to the coach's app (`fiche`: the whole `.md`; `source`: your name, e.g. "Claude"). A file with errors is refused. |

Steps: write the file, call `verifier_seance` and fix it until it is valid, show the session to the coach, then call `envoyer_seance`. The session appears at the top of the Sessions screen, marked as received from the AI (the app must be open, or it is collected on the next opening). Answer with the title and duration the tool returns; no file to download is needed. If sending fails (no connector, connection refused, quota), fall back to the `.md` file to download.

## Checking with the script (if the AI can run code)

`scripts/verifier_fiche.py` reads the file the way the app does, prints the run-through and lists the errors. Python 3, no dependencies:

```bash
python3 scripts/verifier_fiche.py my-session.md
```

It returns exit code 0 if the file is valid, 1 otherwise. Fix each error and run it again until it prints "Valid session file."

## Writing tips

- A typical session: opening or greeting (1 to 3 min), warm-up (15 to 25% of the time), techniques or main work, application or finisher, cool-down (5 to 10%).
- Plan hydration `repos` in sessions longer than 45 min.
- Write in plain language, in the present tense, without obscure abbreviations. Labels are read from a distance, mid-effort.
- For partner work, prefer `⇄` over two separate sequences: the timer keeps running and the role change is announced.
- Do not invent header keys or sequence types: the app only knows the ones described here.

## CrossFit sessions

- Use the English CrossFit vocabulary for movements and blocks: warm-up, skill, strength, WOD, AMRAP, EMOM, For Time, time cap, rounds, RX, Scaled, Beginner, wall balls, toes-to-bar, bar muscle-ups…
- A standard class: `## Whiteboard` (brief, standards, scaling, 2 to 5 min), `## Warm-up` (general then specific), `## Skill` or `## Strength` (technique or strength work), `## WOD` (the workout of the day), `## Cool-down` (scores on the board, mobility).
- Give every warm-up, skill and WOD block a `**Programme :**` line and, when levels differ, `**Scaling :**` lines.
- EMOM: one `[travail]` sequence per minute (`Minute 5/12 · 3 jumping bar muscle-ups · 1:00`), so the TV highlights the movement of the minute. AMRAP and For Time: one sequence for the whole time cap (`For Time · 3 rounds · 12:00`); give every For Time, chipper or rounds-for-time block `· chrono: montant` so the clock counts up to the cap. Rounds: one sequence per round (`Round 2/3 · … · 2:00`).
- Death by: one `[travail]` sequence per interval, the rep count in the label (`Round 5/20 · 5 burpees · 1:00`); the coach skips to the next block when the last athlete fails.

## Complete example

```markdown
---
format: timer4coachs/1
titre: Express HIIT
duree: 20 min
public: All levels
---

# Express HIIT · bodyweight

> **Objectif :** sustain 10 minutes of interval effort while keeping good technique.

## Warm-up · 5 min · ♪

### Getting started · 5 min · phase: Warm-up #FF7A1A
Gradual build-up in intensity.

**Consigne :** easy pace, you should be able to talk.

- [travail] High knees · 1:00
- [travail] Jumping jacks · 1:00
- [travail] Slow squats · 1:00
- [repos] Recovery · 0:30
- [consigne] Circuit walkthrough · 1:30

## Circuit · 12 min · ♪

### Tabata · 4 min · phase: Tabata #FF3B30
**Consigne :** maximum intensity for the 20 seconds.

- [travail] Burpees · 0:20
- [repos] Rest · 0:10
- [travail] Jump squats · 0:20
- [repos] Rest · 0:10
- [travail] Burpees · 0:20
- [repos] Rest · 0:10
- [travail] Jump squats · 0:20
- [repos] Rest · 0:10
- [travail] Burpees · 0:20
- [repos] Rest · 0:10
- [travail] Jump squats · 0:20
- [repos] Rest · 0:10
- [travail] Burpees · 0:20
- [repos] Rest · 0:10
- [travail] Jump squats · 0:20
- [repos] Rest · 0:10

### Recovery · 2 min · musique: non
- [repos] Hydration · 2:00

### Partner core · 6 min
**Matériel :** mats

- [travail] Plank · ⇄ Switch roles · 2:00
- [repos] Recovery · 1:00
- [travail] Side plank · ⇄ Switch sides · 2:00
- [repos] Recovery · 1:00

## Cool-down · 3 min

### Stretching · 3 min · phase: Cool-down #3DB8FF · musique: oui
- [travail] Stretching and breathing · 3:00
```
