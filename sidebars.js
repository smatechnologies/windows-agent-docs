module.exports = {
  mySidebar: [
    'index',
    'release-notes',
    {
      type: 'category', 
      label: 'Installation',
      collapsed: true,
      items: [
        'installation/media',
        'installation/install',
        'installation/upgrade',
        'installation/silent-mode',
        'installation/multiple-instances',
      ], 
    },
    {
      type: 'category', 
      label: 'Administration',
      collapsed: true,
      items: [
        'administration/tls',
        'administration/service-configuration',
        'administration/configuration',
        'administration/manage-lsam',
        'administration/window-state',
        'administration/scripts',
        'administration/wrapper',
        'administration/capture-stats',
      ], 
    },
    {
      type: 'category', 
      label: 'Advanced features',
      collapsed: true,
      items: [
        'advanced-features/embedded-scripts',
        'advanced-features/ecof',
        'advanced-features/file-arrival',
        'advanced-features/file-transfer',
        'advanced-features/genericp',
        'advanced-features/jors',
        'advanced-features/kill',
        'advanced-features/logging',
        'advanced-features/msgin',
        'advanced-features/seterror',
        'advanced-features/showrunning',
        'advanced-features/smastatus',
      ], 
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        'reference/machine-messages',
        'reference/environment-variables',
      ],
    },
    {
      type: 'category',
      label: 'Utilities',
      collapsed: true,
      items: [
        'utilities/smacheckfilesecurity',
        {
          type: 'link',
          label: 'Chronoman',
          href: 'https://help.smatechnologies.com/opcon/core/utilities/Command-line-Utilities/Chronoman',
        },
        {
          type: 'link',
          label: 'SMADirectory',
          href: 'https://help.smatechnologies.com/opcon/core/utilities/Command-line-Utilities/SMADirectory',
        },
        {
          type: 'link',
          label: 'SMA Evaluate Expression',
          href: 'https://help.smatechnologies.com/opcon/core/utilities/Command-line-Utilities/SMA-Evaluate-Expression',
        },
        {
          type: 'link',
          label: 'SMAHoliday',
          href: 'https://help.smatechnologies.com/opcon/core/utilities/Command-line-Utilities/SMAHoliday',
        },
      ],
    },
  ],
};
