(function(){
	var type = localStorage["type"] || '0u',
		legend = localStorage["legend"] || 0,
		lang = localStorage["lang"] || 'en',
		row0u = localStorage["row0u"] || localStorage["row"] || 400,
		col0u = localStorage["col0u"] || localStorage["col"] || 180,
		row2n = localStorage["row2n"] || localStorage["row"] || 132,
		col2n = localStorage["col2n"] || localStorage["col"] || 75,
		popup = document.getElementById('popup'),
		chosenBy = localStorage["chosenBy"];

	//TODO: Open options if no city choosen

	function showForecast(typ){
		popup.className = 'typ' + typ;

		var row,
			col;

		if(chosenBy == 'city'){
			if(typ == '0u'){
				row = row0u;
				col = col0u;
			}else{
				row = row2n;
				col = col2n;
			}
		}else{
			row = row0u;
			col = col0u;
		}

		var typeLink = (typ == '0u') ? 'um/metco/mgram_pict.php?ntype=0u' : 'metco/mgram_pict.php?ntype=2n',
			link = 'http://new.meteo.pl/'+typeLink+'&row='+row+'&col='+col+'&lang='+lang,
			content = '';

		if(legend){
			popup.className += ' legend';
			content += "<img src=leg_"+typ+"_"+lang+".png>";
		}

		content += "<img src="+link+">";

		popup.innerHTML = content;
	}

	showForecast(type);

	if(chosenBy == 'city') {
		popup.addEventListener('click', function() {
			if(popup.className.indexOf('0u') > -1){
				showForecast('2n');
			}else{
				showForecast('0u');
			}
		})
	}
})();
