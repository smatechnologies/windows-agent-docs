---
sidebar_label: "SMAEvaluateExpression"
title: SMAEvaluateExpression utility
description: "Use SMAEvaluateExpression to evaluate a logical or mathematical expression as an OpCon job and branch on the result using failure criteria."
tags:
  - Reference
  - Automation Engineer
  - Agents
  - Jobs
---

# SMAEvaluateExpression utility

**Theme:** Build  
**Who Is It For?** Automation Engineer

## What is it?

SMAEvaluateExpression (`SMAEvalExp.exe`) is a command-line utility that evaluates a single expression and returns an exit code indicating whether the result is a true or false value. Use it as an OpCon job to implement conditional branching in a schedule — downstream jobs can use failure criteria or event-based triggers based on whether the expression evaluated to true or false.

* Evaluate a logical or mathematical expression and return a meaningful exit code
* Drive conditional branching in an OpCon schedule based on an expression result

## Syntax

```
SMAEvalExp.exe "<Expression>"
```

SMAEvaluateExpression accepts exactly one argument: the expression to evaluate, enclosed in double quotes.

:::note
The `@` character in the expression is replaced with square brackets (`[` and `]`) before evaluation. This allows OpCon tokens (which use `[[` and `]]` notation) to be passed through the job command line without the double brackets being interpreted by the shell.
:::

## Exit codes

| Code | Meaning |
|---|---|
| `0` | The expression evaluated to a non-false result (true). |
| `-1` | The expression evaluated to `false`. |
| `-2` | Wrong number of arguments. SMAEvaluateExpression requires exactly one argument. |
| `-3` | An exception occurred during expression evaluation. |

## FAQs

**How do I use SMAEvaluateExpression to branch in a schedule?**  
Configure the job's failure criteria in OpCon to treat exit code `-1` as a failure. Use job dependencies or events to trigger different downstream jobs based on whether this job succeeds (exit code `0`) or fails (exit code `-1`).

**Can I pass an OpCon token as part of the expression?**  
Yes. Use `@` in place of `[` and `]` around the property name so the shell does not interpret the brackets. For example, `@@MYTOKEN@@` is interpreted as `[[MYTOKEN]]` by SMAEvaluateExpression. OpCon resolves the token before the job is submitted to the agent.

**What expression syntax is supported?**  
Refer to SMA Technologies documentation for the supported expression syntax and operators.

## Glossary

**Expression** — A logical or mathematical statement that SMAEvaluateExpression evaluates and reduces to a true or false result.

**Failure criteria** — The condition configured on an OpCon job that determines whether the job is considered to have failed based on its exit code.
