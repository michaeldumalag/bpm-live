// // CODE TO ATTEMPT RIPPLE - this gets the offset for the top left corner
// function getOffset( el ) {
//     var _x = 0;
//     var _y = 0;
//     while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
//         _x += el.offsetLeft - el.scrollLeft;
//         _y += el.offsetTop - el.scrollTop;
//         el = el.offsetParent;
//     }
//     return { top: _y, left: _x };
// }
// var x = getOffset( document.getElementById('yourElId') ).left;
// var y = getOffset( document.getElementById('yourElId') ).top;

function showColor(id, color) {
  var square = $('#key-'+ id.toString());
  var square_limit = square;

  // var x_coord = square_offset.left;
  var x_coord = square.width()/3;
  // var y_coord = square_offset.top;
  var y_coord = square.height()/3;

  // this will create the ripple wrap
  // Draw the ripple effect wrap
  var ripple_effect_wrap = $('<span class="ripple-effect-wrap"></span>');
  ripple_effect_wrap.css({
    'width' 		: square.width(),
    'height'		: square.height(),
    'position' 		: 'relative',
    'top'			: y_coord/2,
    'left'	 		: x_coord/2,
    'z-index' 		: 0,
    'overflow' 		: 'hidden',
    'background-clip': 'padding-box'
  });

  ripple_effect_wrap.appendTo(square);

  var circular_width = 500;

  // Draw the ripple effect
  var ripple = $('<span class="ripple"></span>');
  ripple.css({
  	'width' 			: circular_width,
  	'height'			: circular_width,
  	'background'			: color, //'rgba(0,0,0,0.3)',
  	'position'			: 'absolute',
  	'top'				: y_coord - ( circular_width / 2 ),
  	'left'				: x_coord - ( circular_width / 2 ),
  	'content'			: '',
  	'background-clip' 		: 'padding-box',
  	'-webkit-border-radius'     	: '50%',
  	'border-radius'             	: '50%',
  	'-webkit-animation-name'	: 'ripple-animation',
  	'animation-name'              	: 'ripple-animation',
  	'-webkit-animation-duration'  	: '2s',
  	'animation-duration'          	: '2s',
  	'-webkit-animation-fill-mode' 	: 'both',
  	'animation-fill-mode'         	: 'both'
  });
  $('.ripple-effect-wrap:last').append( ripple );


  // $('#key-' + id.toString()).css('background-color', color);
  // Remove rippling component after half second
  setTimeout( function(){
  	ripple_effect_wrap.fadeOut(function(){
  		$(this).remove();
  	});
  }, 100 );


  $('#key-' + id.toString()).effect('shake', { direction: "left", distance: 5, times: 5 } ).css('background-color', color);
}

// var colors = [
//   "#1abc9c", "#f39c12", "#16a085", "#f1c40f",
//   "#2ecc71", "#27ae60", "#e67e22", "#d35400",
//   "#3498db", "#2980b9", "#e74c3c", "#c0392b",
//   "#9b59b6", "#8e44ad", "#ecf0f1", "#bdc3c7"
// ];

// Random color generator
function randomColor() {
  return ('#' + Math.floor(Math.random()*16777215).toString(16));
  // return colors[Math.floor(Math.random() * colors.length)];
}

// Color change functions
function boxChange(id) {
  $('#key-' + id).css('background-color', randomColor());
}

function boxChangeBack(id) {
  $('#key-' + id).css('background-color', 'black');
}

// Time out for each box?
function createTimeout(f,dynamicParameter,interval) {
  timer = setTimeout(function() { f(dynamicParameter); }, interval);
}

function createTimeout(f, firstParam, secondParam, interval) {
  timer = setTimeout(function() { f(firstParam, secondParam); }, interval);
}

// Snake through boxes with colors on page load (WIP)
function colorLoop() {
  var start_time = 0;
  for(var i = 18; i > 0; i--) {
    var id = (i % 9) || 9;
    createTimeout(boxChange, id, start_time += 150);
    createTimeout(boxChangeBack, id, start_time += 150);
  };
}
