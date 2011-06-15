var whenever = function(element){
  var binding = {
    selector: whenever.definitions[element]
  };

  var chain =  function(){
    return {
      is: function(event){
        binding.event = event;
        return chain();
      },
      then: function(action){
        whenever[binding.event](binding.selector, action)
        return chain();
      }
    }
  }
  return chain();
}

whenever.translations = {
  'clicked':'click',
  'blurred': 'focusout',
  'focussed':'focusin',
  'submitted':'submit'
}

for(state in whenever.translations)
{
  (function(state){
    whenever[state] = function(selector, action){
      jQuery(function(){
        var function_to_apply, arguments;
        if(typeof whenever.actions[action] === 'function')
        {
          function_to_apply = whenever.actions[action];
        }
        else
        {
          for(var matcher in whenever.actions)
          {
            var match;
            if(match = action.match(new RegExp(matcher)))
            {
              match.shift()
              function_to_apply = function(action_name, args){
                return function(){
                  whenever.actions[action_name].apply(this, args)
                }
              }(matcher, match)
              break;
            }
            
          }
        }
        jQuery(document).delegate(
            selector,
            whenever.translations[state],
            function_to_apply
          )
      })
    }
  })(state)
}