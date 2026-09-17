# School Financial Entry System — Windows Installer Build

This turns the app into a real, installable Windows program (Start Menu
shortcut, desktop icon, proper uninstaller) using Electron.

**I've already tested this build pipeline end-to-end** in my own
environment (installed the dependencies, ran the packager, launched the
packaged app, confirmed the window and Welcome screen render correctly).
The only thing I cannot do here is the final Windows-specific packaging
step, which needs to run on Windows — so the steps below hand that one
step to a free Windows machine that GitHub provides. You don't need a
Windows PC yourself.

## Get your .exe (no coding, ~5 minutes)

1. Go to **github.com** and make a free account if you don't have one.
2. Click **New repository**, give it any name, click **Create repository**.
3. Click **"uploading an existing file"**, drag in *everything* from
   this zip (keep the folder structure, including the hidden `.github`
   folder), click **Commit changes**.
   - Note: some file browsers hide folders starting with a dot. If your
     drag-and-drop seems to skip `.github`, use "Add file → Upload
     files" and manually browse into `.github/workflows/build.yml` to
     add it, or use GitHub Desktop / git if you're comfortable with
     that instead.
4. Click the **Actions** tab. A build starts automatically. It takes
   longer than a simple script (Electron bundles a full Chromium
   runtime) — expect **5–10 minutes**.
5. When you see the green ✅, open that run, scroll to **Artifacts**,
   and download **SchoolFinancialEntry_Setup**. Unzip it — inside is
   `School Financial Entry System Setup 1.0.0.exe`.

That file is a real Windows installer: double-click it, choose an
install folder (or accept the default), and it installs the program
with a Start Menu entry and desktop shortcut, just like any commercial
Windows app. All your data still saves locally on each computer it's
installed on (nothing goes to the internet).

## What's inside this project

- `app.html` — the full app (same one you already tested)
- `main.js` — the thin Electron wrapper that gives it a native window,
  a File → Print menu, and taskbar/desktop integration
- `package.json` — build recipe (electron-builder, targeting a
  Windows NSIS installer)
- `.github/workflows/build.yml` — the robot that builds it on GitHub's
  Windows machine

## Building it yourself instead (if you have a Windows PC)

```
npm install
npm run dist
```
The installer appears in `dist\`. Requires Node.js
(https://nodejs.org) installed first.
