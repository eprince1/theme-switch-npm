# Theme Switch
### Easily manage your themes!

## Installation
`yarn add theme-switch`

## Setup
- Go to [Theme Switch](https://theme-switch.web.app/ "Theme Switch") website and create your themes
- Setup your themes, class names, colors, and types
- You are all set to go!

## Example


    import * as themeSwitch from 'theme-switch';
    
    class MyApp extends React.Component {
    	componentDidMount() {
    		themeSwitch.initialize();
    	}
    
    	themeId = 'XXXXXXXXXX' // you can get your themeId from 'https://theme-switch.web.app/'
    
    	render() {
    		return (
    			<button onClick={() => themeSwitch.loadPalette(themeId)</button>
    		);
    	}
    }
    
    export default MyApp;

## How it works

Theme Switch will change your css classes and values on the fly through our api.

`initialize()` - This must be called when your site loads for the other functions to work

`loadPalette(themeId)` - This will load the theme based on the given themeId. Note this will change your css based on the class names given for the theme.

`uninitialize()` - This will remove all css changes from Theme Switch.

## Example with classes

![Theme Example](./images/theme-example.png?raw=true)

This is an example of a simple dark theme. Notice how there are 2 colors, each with a class name and a type (Background Color/Text Color)

When `loadPalette('kzkqn2jx8f72nstra9u35')` is called:
- Anything with the class name `background` will get the background color given and anything with the class name `primaryText` will get the given text color
- You can make more or less colors and classes in your dashboard as you need
- Theme Switch remembers what theme a user was looking at on your site and will remember the theme for their next use! No management is needed on your part!