# jquery.navigation-1.0.0
This plugin allows you to display a beautiful sliding menu with content on the custom sites effortlessly.Adaptive menu for screens larger than 991 pixels on small screens the menu is not displayed.
# Demo: The Basics Topics
## Setup
1. Create a basic **navigation** markup.Let's start with the description of the div element with the class container-fluid, I chose it specifically to stretch the menu the full width of the screen, you can use any other.
```html
<body>
	<div class="container-fluid">
		<div class="wrap-navigation">
			<div class="top-shadow"></div>
			<div class="wrap">
				<div class="nav-header">
					<ul class="navigation list-unstyled">
						<li>
							<a href="#part1" class="text-uppercase default">
								Part1
							</a>
						</li>
						<li>
							<a href="#part2" class="text-uppercase default">
								Part2
							</a>
						</li>
						<li>
							<a href="#part3" class="text-uppercase default">
								Part3
							</a>
						</li>
					</ul>
				</div>
				<div class="nav-body">
					<div class="hide" id="part1">
						<h3 class="text-center">Part1</h3>
					</div>
					<div class="hide" id="part2">
						<h3 class="text-center">Part2</h3>
					</div>
					<div class="hide" id="part3">
						<h3 class="text-center">Part3</h3>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
```
2. To connect a file of styles.
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Your title</title>
	<link rel="stylesheet" href="css/jquery.navigation-1.0.0.css">
</head>
</html>
```
3. This plugin can work with **bootstrap.css** but it has to be connected at the beginning.
```html
<head>
	<meta charset="UTF-8">
	<title>Your title</title>
	<link rel="stylesheet" href="css/bootstrap.css">
	<link rel="stylesheet" href="css/jquery.navigation-1.0.0.css">
</head>
```
4. Now we need to connect before the closing body tag ***jquery*** file, I do it with ***google*** [go](https://developers.google.com/speed/libraries/#jquery).
```html
<body>
	
		......
	//your markup
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</body>
```
5. It remains to connect the plugin file.
```html
<body>
	......
	......
	//your markup
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="js/jquery.navigation-1.0.0.js"></script>
</body>
```
6. Now by calling one method we run the plugin.
```html
<body>
	......
	......
	//your markup
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="js/jquery.navigation-1.0.0.js"></script>
	<script>
		$('ul.navigation').navigate();
	</script>
</body>
```
> That it will look like the menu in the beginning:

[Demo](https://andrey1787.github.io/jquery.navigation-1.0.0/)

> If you want to change the width or height of the navigation, then create your css file, e.g. style.css and connect it below the file jquery.navigation-1.0.0.css.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Your title</title>
	<link rel="stylesheet" href="css/jquery.navigation-1.0.0.css">
	<link rel="stylesheet" href="css/style.css">
</head>
</html>
```

> In the file need to accommodate small changes.Here's an example:

```css
.wrap-navigation{
	width : 300px;
	height : 300px;
}

.wrap-navigation .wrap > .nav-header{
	width : 300px;
	height : 300px;
}

ul.navigation{
	width : 300px;
	height : 300px;
}
```
> In next version these settings can be transmitted directly to the object.