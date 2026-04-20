---
sidebar_label: 'Installation media'
title: Determine installation media
description: "Identify the correct installation media type to use when installing the Windows Agent."
tags:
  - Reference
  - System Administrator
  - Agents
  - Installation
---

# Determine installation media

**Theme:** Overview  
**Who Is It For?** System Administrator

## What is it?

The Windows Agent installation files can be delivered by USB drive, FTP download, DVD-ROM, or ISO image. Regardless of format, SMA Technologies recommends copying files to a local folder on the target machine before running the setup program.

* USB, FTP, DVD-ROM, and ISO delivery formats are all supported
* Copy installation files to local disk before running setup when using USB or FTP delivery

## Benefits

- Copying installation files to local disk before running setup avoids failures caused by network interruptions or slow media read speeds.
- All four delivery formats result in the same installation package, so the installation procedure is the same regardless of how the files were received.

In the documentation for running the setup program, replace **\<media\>** with the desired method of delivery:

- **USB**: If using a USB drive, plug the USB drive into a machine and copy the installation files to a folder on the hard drive of the machine where the software will be installed. Run the installation from the hard drive.
- **FTP**: If downloading the files over FTP, the best practice is to download the installation files directly to a folder on the hard drive of the machine where the software will be installed. Run the installation from the hard drive.
- **DVD-ROM**: Insert the DVD into the drive and run the installation from the DVD. The files may also be copied to the hard drive.
- **ISO**: Mount the ISO image as a virtual DVD and run the installation from that location.

## FAQs

**Can I run the installer directly from a USB drive or a network share?**  
SMA Technologies recommends copying installation files to a local hard drive folder before running setup when using USB or FTP delivery. Running from removable media or a network share can cause failures due to media read interruptions. DVD-ROM and ISO can be run directly from the media or mount point.
