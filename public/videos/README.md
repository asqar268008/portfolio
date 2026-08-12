# Demo videos

Videos are served from `/videos/<name>.mp4` and wired up in `src/data/projects.js`
(`demoVideo` for the in-page player, `demoLink` for the "Watch Demo" button).

## Current state

| File | Resolution | Length | Size | Status |
|---|---|---|---|---|
| `Medforecast.mp4` | 1918x1018 | 32s | 0.7 MB | Good |
| `Brain_tumor.mp4` | 1918x1018 | 32s | 0.9 MB | Good |
| `Floatchatai.mp4` | 960x512 | 4m 08s | 5.6 MB | **Re-record** — soft, far too long |
| `Health_agent.mp4` | 1542x720 | 1m 42s | 1.5 MB | **Re-record** — soft |

The two flagged files were captured at 0.12–0.18 Mbps. That is roughly 40x below
what screen capture at this resolution needs, so fine detail — UI text above all
— was discarded at record time. Re-encoding cannot bring it back; the only fix is
to record again.

## Recording settings

Use OBS Studio (free) or your screen recorder's highest-quality preset:

- **Resolution:** 1920x1080, capture the browser window only, not the whole desktop
- **Bitrate:** 8000–12000 Kbps CBR (or CRF 18–20 if the tool offers quality mode)
- **Frame rate:** 30 fps — 60 adds size without helping a UI walkthrough
- **Audio:** record none unless you are narrating. A dead 2 Kbps track just adds bytes.
- **Zoom the browser to 110–125%** before recording. Text that is readable
  full-screen becomes unreadable in a small embedded player.

## What to show

Keep it to **45–60 seconds**. Recruiters rarely watch past the first 30.

1. **0–5s:** the working result on screen immediately — a prediction, an answer,
   a populated dashboard. Do not open with a login screen or an empty form.
2. **5–35s:** one complete task, start to finish, at a steady pace.
3. **35–60s:** the most impressive output, held still long enough to read.

Cut dead air, loading spinners, and typing. Every second must earn its place.

## Compressing a new recording

ffmpeg is installed (`winget install Gyan.FFmpeg`). Record at high quality, then
compress for the web:

```bash
ffmpeg -i input.mp4 \
  -c:v libx264 -preset slow -crf 23 -profile:v high -pix_fmt yuv420p \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  output.mp4
```

- `-crf 23` is the quality dial: lower is better and larger. 20 for text-heavy
  captures, 26 if size matters more. Do not go above 28.
- `-movflags +faststart` is **not optional**. It moves the file index to the
  front so playback starts while the file is still downloading. Without it the
  browser must fetch the whole file before showing a single frame — this alone
  was costing 32 MB of wait on two of these clips.
- Drop the two `-c:a`/`-b:a` flags and use `-an` if there is no narration.

To trim while compressing, add `-ss 00:00:04 -to 00:01:04` before `-i`.

Check the result before shipping it:

```bash
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,bit_rate,duration -of default=nw=1 output.mp4
```

Originals for the two compressed files are kept in `media-src/` at the repo root,
which is gitignored and not deployed.
