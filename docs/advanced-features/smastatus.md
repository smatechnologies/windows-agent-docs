---
sidebar_label: "SMAStatus"
title: SMAStatus command
description: "Send a custom status message to OpCon from within a running script using the SMAStatus command."
tags:
  - Reference
  - Automation Engineer
  - Agents
---

# SMAStatus command

**Theme:** Build  
**Who Is It For?** Automation Engineer

## What is it?

The SMAStatus command sends a user-defined message to OpCon. The message appears as the status message in the Operations view. When inserted into a script, the command is useful for reporting the script's progress (for example, "DB Backup Completed").

* Send a custom status message from inside a running job to the OpCon Operations view
* Display up to 20 characters of text as the job's current status message

## When to use

- When a long-running script has multiple stages and you want operators in the Operations view to see which stage is currently active.
- When you need to communicate progress from inside a job without writing to a separate log file.

## Benefits

- Gives operators real-time visibility into a job's internal progress without requiring them to open logs or connect to the agent machine.
- Reduces unnecessary inquiries about in-progress jobs by surfacing meaningful status messages directly in OpCon.

## Syntax

```bat
SMAStatus "<message>"
```

- **SMAStatus**: The name of the command.
- **\<message\>**: The message to display in OpCon.
  - The message's maximum length is 20 characters.
  - The message must be enclosed in double quotes (`""`).

## FAQs

**Does SMAStatus change the job's exit code?**  
No. SMAStatus only updates the visible status message displayed in the Operations view. It has no effect on the exit code returned to OpCon when the job finishes.

**Can I call SMAStatus multiple times in a single script?**  
Yes. SMAStatus can be called at any point in a script, as many times as needed. Each call replaces the previous status message in the Operations view, making it useful for reporting progress through multiple stages of a long-running job.
