  
jQuery(document).ready(function($){
	//set animation timing
	var animationDelay = 2500,
        //clip effect 
        //revealDuration = how fast it reveals
        revealDuration = 900,
        //Originally 1500
		revealAnimationDelay = 2100;
	
	initHeadline();

	function initHeadline() {
		//initialise headline animation
		animateHeadline($('#sub'));
	}

	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = $(this);
			var spanWrapper = headline.find('#flicker'),
				newWidth = spanWrapper.width()
				spanWrapper.css('width', newWidth);

            //newWidth = spanWrapper.width() + 10

			//trigger animation
			setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
		});
	}

	function hideWord($word) {
		var nextWord = takeNext($word);
		$word.parents('#flicker').animate({ width : '2px' }, revealDuration, function(){
			switchWord($word, nextWord);
			showWord(nextWord);
		});
	}

	function showWord($word) {	
		$word.parents('#flicker').animate({ 'width' : $word.width() }, revealDuration, function(){ 
			setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
        });
        
        //$word.parents('#flicker').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
		
	}

	function takeNext($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}

	function switchWord($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}
});