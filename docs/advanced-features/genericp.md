---
sidebar_label: "genericp"
title: GenericP program
description: "Test Windows Agent job execution using the genericp.exe utility, which accepts configurable sleep time and exit code parameters."
tags:
  - Reference
  - Automation Engineer
  - Agents
---

# GenericP program

**Theme:** Build  
**Who Is It For?** Automation Engineer

## What is it?

The agent installation provides a test program called `genericp.exe`. By default, this program sleeps for five seconds and ends with an exit code of zero. The sleep time and exit code are adjustable with parameters.

* Simulate a running job with a configurable sleep time and exit code
* Test agent connectivity, failure criteria, and job dependencies without production jobs

SMA provides three executables for testing. Use the appropriate program for the hardware platform:

- **genericp.exe**: Use on Windows 32-bit operating systems.
- **genericpX64.exe**: Use on Windows 64-bit operating systems and extensions of the x86 architecture. (This is a 64-bit superset of the x86 instruction set architecture and refers to both AMD and Intel.)

## When to use

- When verifying that the Windows Agent is correctly configured and can start and report job completion before deploying production jobs.
- When testing failure criteria or job dependency logic in OpCon using a controlled exit code.

## Benefits

- Tests agent configuration without placing real workloads at risk if the agent is misconfigured.
- Provides a reliable, repeatable job for validating OpCon notifications, dependencies, and failure criteria before production jobs are deployed.

## Syntax

```bat
genericp [-t] [-e] 
```

- **[-t]**: Time in seconds (maximum 2,147,483 seconds — about 24 days).
- **[-e]**: Decimal integer exit code.

:::info Example
The following sleeps for 30 seconds and then ends with an exit code of 1:
:::

```bat
genericp -t30 -e1 
```

