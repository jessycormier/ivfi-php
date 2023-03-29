<h1 align="center">Themes</h1>

<p align="center">Overview and theme usage.</p>


## Overview
IVFi-PHP supports custom themes.

You can find a list of official themes here: [IVFi-themes](https://github.com/sixem/ivfi-themes), or you can create your own!

## Usage
* 1) Download or create the themes that you wish to use.
* 2) Place them in a publicly available directory.
	* Example: `/indexer/css/themes/`
* 3) Edit the configuration:
	* Set the `path` to the relative directory of the themes.
	* If you want a theme to be the default, then set `default` to the theme's name.
```php
<?php
return [
		'style' => [
			'themes' => [
				'path' => 'indexer/css/themes',
				'default' => false
			]
		]
];
?>
```
* 4) You should now be able to enable different themes in the settings menu (⚙️ in the top right corner).