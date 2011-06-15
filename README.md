# Whenever.js #

Whenever is a javascript library that provides a simple domain specific language to specify your application's behavior using a syntax that reads like English.

Whenever helps you to organise your javascripts in a clean and tidy way, and keeps your implementation logic separate from your behavioral logic.

## Example ##

For example, take the following:

    whenever('Click Me!').is('clicked').then('Change the text to "Clicked!"')

By itself, this does nothing, but it very clearly describes what will happen.

It's easy to hook up. First, `'click Me!'` should map to an element:

    whenever.definitions.add({
      'Click Me!': 'a.click-me'
    })

`clicked` is automatically mapped to the `click` event.

Finally, `'Change the text to "Clicked!"'` should be hooked up to a function:

    whenever.actions.add({
      'Change the text to "Clicked!"': function(){
        $(this).text("Clicked!")
      }
    })

Or you can do this with a RegExp for re-use:

    whenever.actions.add({
      'Change the text to "([^"]*)"'': function(value){
        $(this).text(value)
      }
    })

That's it!

## Installation ##

Whenever.js currently depends on `jQuery`. After including jQuery, just add the `whenever.js` script to your project:

    <script type="text/javascript" src="whenever.js"></script>

You might prefer to place your behavior, definitions and actions in separate files, or all in the one file.