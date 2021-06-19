---
sidebar_label: "genericp"
---

# GenericP program

The LSAM installation provides a "dummy" job called genericp.exe. By default, this program sleeps for five seconds and ends with an exit code of zero. The sleep time and exit code are adjustable with the appropriate parameters.

SMA provides three executables for testing. Use the appropriate program for the hardware platform:

- **genericp.exe**: Use on Windows 32-bit operating systems.
- **genericpX64.exe**: Use on Windows 64-bit operating systems and extensions of the x86 architecture. (This is a 64-bit susperset of the x86 instruction set architecture and refers to both AMD and Intel.)

## Syntax

```bat
genericp [-t] [-e] 
```

- **[-t]**: Time in seconds (maximum 2,147,483 seconds - about 24 days).
- **[-e]**: Decimal integer exit code.

:::info Example
The following sleeps for 30 seconds and then ends with an exit code of 1:
:::

```bat
genericp -t30 -e1 
```
